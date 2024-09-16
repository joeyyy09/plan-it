"use client";

import api, { baseURL } from "@/src/api/api";
import HotelInfo from "@/src/components/view-trip/HotelInfo";
import InfoSection from "@/src/components/view-trip/InfoSection";
import Places from "@/src/components/view-trip/Places";
import { useAuth } from "../../../../context/AuthContext";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";
import { TravelItinerary } from "@/models";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const { authState } = useAuth();
  const router = useRouter();
  const authToken = authState.token;

  // Fetch itinerary data based on tripId
  const fetchItineraryData = useCallback(async () => {
    if (!tripId) return;
    try {
      const { data } = await api.get(`${baseURL}/api/itinerary/v2/${tripId}`);
      setItinerary(data.data);
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
    }
  }, [tripId]);

  // Fetch place photo based on itinerary destination
  const fetchPlacePhoto = useCallback(async () => {
    if (!itinerary?.destination) return;
    try {
      const { data } = await PlaceDetails({ textQuery: itinerary.destination });
      const photoName = data.places[0]?.photos[3]?.name;
      if (photoName) {
        setPhoto(PHOTO_REF_URL.replace("{NAME}", photoName));
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  }, [itinerary?.destination]);

  useEffect(() => {
    fetchItineraryData();
  }, [fetchItineraryData]);

  useEffect(() => {
    if (itinerary) {
      fetchPlacePhoto();
    }
  }, [itinerary, fetchPlacePhoto]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {itinerary ? (
          <>
            <InfoSection itinerary={itinerary} />
            <HotelInfo itinerary={itinerary} />
            <Places itinerary={itinerary} />
          </>
        ) : (
          <div className="text-center text-gray-400">Loading trip details...</div>
        )}
      </div>
    </div>
  );
};

export default ViewTrip;
