"use client";

import { TravelItinerary } from "@/models";
import React from "react";
import PlaceCard from "./PlaceCard";

const Places = ({ itinerary }: { itinerary: TravelItinerary }) => {
  return (
    <div>
      <h2 className="font-bold text-lg pt-4">Places to visit</h2>
      <div className="">
        {itinerary?.itinerary.map((item: { day: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; plan: any[]; }, index: React.Key | null | undefined) => (
          <div key={index} className="space-y-4">
            <h2 className="font-bold text-lg pt-4">Day {item.day}</h2>
            {item.plan.map((place: any, index: any) => (
              <div key={index} className="">
                <h2 className="font-medium text-sm text-yellow-400">
                  Time required: {place?.timeToTravel}
                </h2>
                    {place && <PlaceCard place={place}/>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
