"use client";

import { TravelItinerary } from "@/models";
import React from "react";
import HotelCard from "./HotelCard";

const HotelInfo = ({ itinerary }: { itinerary: TravelItinerary }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hotels Recommended for You</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itinerary?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className="transform transition-transform hover:scale-105"
          >
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelInfo;
