"use client";

import { TravelItinerary } from "@/models";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/image1.png";
import { Button } from "./button";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { Skeleton } from "./skeleton"; 

const InfoSection = ({ itinerary }: { itinerary: TravelItinerary }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: itinerary?.destination,
      };

      const response = await PlaceDetails(data);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0]?.photos[3]?.name || ""
      );
      setPhoto(photoUrl);
    } catch (error) {
      console.error("Failed to fetch the photo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itinerary) getPlacePhoto();
  }, [itinerary]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="relative mb-4">
        {loading ? (
          <Skeleton className="h-[150px] md:h-[340px] w-full rounded-xl" />
        ) : (
          <Image
            src={photo || TravelImage}
            alt="Travel"
            height={340}
            width={1200}
            quality={100}
            layout="responsive"
            className="object-cover rounded-xl"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">{itinerary?.destination}</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-800 text-gray-300 p-2 rounded-full text-sm md:text-md">
            📅 {itinerary?.duration} Days
          </div>
          <div className="bg-gray-800 text-gray-300 p-2 rounded-full text-sm md:text-md">
            🪙 Budget: {itinerary?.budget}
          </div>
          <div className="bg-gray-800 text-gray-300 p-2 rounded-full text-sm md:text-md">
            🧑🏼‍🤝‍🧑🏼 No. of Travelers: {itinerary?.user}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
