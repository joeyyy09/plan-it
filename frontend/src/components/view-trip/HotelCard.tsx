/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HotelDetails } from "@/models";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/image1.png";
import { Button } from "../ui/button";
import { FaMapMarkedAlt } from "react-icons/fa";
import Link from "next/link";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton"; // Assume you have a Skeleton component for loading

const HotelCard = ({ hotel }: { hotel: HotelDetails }) => {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.name,
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
    if (hotel) getPlacePhoto();
  }, [hotel]);

  return (
    <div>
      {loading ? (
        <Skeleton className="h-[150px] md:h-[200px] w-full rounded-xl shadow-md" />
      ) : (
        <Image
          src={photo ? photo : TravelImage}
          alt="Travel"
          height={100}
          width={1200}
          quality={100}
          layout="fixed"
          className="h-[150px] md:h-[200px] object-cover rounded-xl shadow-md"
          loading="lazy"
        />
      )}
      <div className="flex">
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-400">📍{hotel?.address}</h2>
          <h2 className="text-sm">💰{hotel?.pricePerNight}</h2>
          <h2 className="text-sm">⭐{hotel?.rating}</h2>
        </div>
        <div className="pt-28 pr-2 md:pt-24 md:pr-2">
          <Button
            onClick={() =>
              window.open(
                `https://google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel?.name
                )}`,
                "_blank"
              )
            }
          >
            <FaMapMarkedAlt className="h-7 w-7 p-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
