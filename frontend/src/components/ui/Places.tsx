"use client";

import { TravelItinerary } from "@/models";
import React from "react";
import PlaceCard from "./PlaceCard";

const Places = ({ itinerary }: { itinerary: TravelItinerary }) => {
  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Places to Visit
      </h2>
      <div className="space-y-6">
        {itinerary?.itinerary?.map((item: { day: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; plan: any[]; }, index: React.Key | null | undefined) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-200">
              Day {item.day}
            </h2>
            {item.plan.map((place, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm font-medium text-yellow-400">
                  Time required: {place?.timeToTravel}
                </h3>
                {place && <PlaceCard place={place} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
