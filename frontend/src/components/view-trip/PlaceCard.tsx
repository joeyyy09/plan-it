"use client";

import { TravelPlace } from "@/models";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/image1.png";
import { Button } from "../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { Skeleton } from "../ui/skeleton";

const PlaceCard = ({ place }: { place: TravelPlace }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place?.name,
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
    if (place) getPlacePhoto();
  }, [place]);

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800 p-4 mt-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
      <div className="relative">
        {loading ? (
          <Skeleton className="h-[200px] w-full rounded-lg" />
        ) : (
          <Image
            src={photo || TravelImage}
            alt={place.name || "Travel"}
            height={200}
            width={300}
            quality={100}
            layout="responsive"
            className="object-cover rounded-lg"
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-4 space-y-3">
        <h2 className="text-lg font-semibold text-white">
          {place.name}
        </h2>
        <p className="text-sm text-gray-400">
          {place.details}
        </p>
        <p className="text-sm text-gray-300">
          ⌛ {place.bestVisitTime}
        </p>
        <Button
          onClick={() =>
            window.open(
              `https://google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`,
              "_blank"
            )
          }
          className="w-full flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600"
        >
          <FaMapMarkedAlt className="h-6 w-6 mr-2" />
          <span className="hidden md:inline">View on Map</span>
        </Button>
      </div>
    </div>
  );
};

export default PlaceCard;
