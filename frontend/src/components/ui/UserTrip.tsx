import { TravelItinerary } from "@/models";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/image1.png";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { useRouter } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import { Skeleton } from "./skeleton";

const UserTrip = ({ trip }: { trip: TravelItinerary }) => {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.destination,
      };
      const response = await PlaceDetails(data);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    } catch (error) {
      console.error("Failed to fetch the photo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip) getPlacePhoto();
  }, [trip]);

  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="relative">
        {loading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <Image
            src={photo ? photo : TravelImage}
            alt="Travel"
            height={192}
            width={384}
            layout="responsive"
            objectFit="cover"
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <h2 className="font-semibold text-xl md:text-2xl text-white mb-2">{trip?.destination}</h2>
        <p className="text-sm md:text-base text-gray-300 mb-4">
          {trip?.duration} Days with {trip?.budget} Budget
        </p>
        <button
          className="w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
          onClick={() => router.push(`/view-trip/${trip.id}`)}
        >
          <IoIosSend className="mr-2" />
          View Trip
        </button>
      </div>
    </div>
  );
};

export default UserTrip;
