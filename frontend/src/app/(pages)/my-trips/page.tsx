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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">My Trips</h2>
        {itinerary.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itinerary.map((trip) => (
              <div key={trip.id} className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                <UserTrip trip={trip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">No trips generated yet!</div>
        )}
      </div>
    </div>
  );
};

export default Page;
