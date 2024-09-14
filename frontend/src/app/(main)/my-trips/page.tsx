"use client";

import api, { baseURL } from "@/src/api/api";
import UserTrip from "@/src/components/my-trips/UserTrip";
import { useAuth } from "@/src/context/Auth";
import { TravelItinerary } from "@/models";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [itinerary, setItinerary] = useState<TravelItinerary[]>([]);
  const { authState } = useAuth();
  const router = useRouter();
  
  const authToken = authState.token;

  useEffect(() => {
    if (!authToken) {
      router.push("/login");
      return;
    }
    
    const fetchItinerary = async () => {
      try {
        const { data } = await api.get(`${baseURL}/api/itinerary/v2`);
        setItinerary(data.data);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };
    
    fetchItinerary();
  }, [authToken, router]);

  return (
    <div className="md:p-0 md:max-w-[60%] w-full mx-auto mt-10">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">My Trips</h2>
      {itinerary.length > 0 ? (
        <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-5">
          {itinerary.map((trip) => (
            <div key={trip.id}>
              <UserTrip trip={trip} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-20">No trips generated yet!</div>
      )}
    </div>
  );
};

export default Page;
