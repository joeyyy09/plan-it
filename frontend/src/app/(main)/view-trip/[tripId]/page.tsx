"use client";

import api, { baseURL } from "@/src/api/api";
import HotelInfo from "@/src/components/view-trip/HotelInfo";
import InfoSection from "@/src/components/view-trip/InfoSection";
import Places from "@/src/components/view-trip/Places";
import { useAuth } from "@/src/context/Auth";
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

  const fetchItineraryData = useCallback(async () => {
    if (!tripId) return;
    try {
      const response = await api.get(`${baseURL}/api/itinerary/v2/${tripId}`);
      setItinerary(response.data.data);
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
    }
  }, [tripId]);

  const fetchPlacePhoto = useCallback(async () => {
    if (!itinerary?.destination) return;
    try {
      const data = { textQuery: itinerary.destination };
      const response = await PlaceDetails(data);
      const photoName = response.data.places[0]?.photos[3]?.name;
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhoto(photoUrl);
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
    <div className="md:p-6 p-1 px-0 md:px-20 lg:px-44">
      {itinerary && (
        <>
          <InfoSection itinerary={itinerary} />
          <HotelInfo itinerary={itinerary} />
          <Places itinerary={itinerary} />
        </>
      )}
    </div>
  );
};

export default ViewTrip;
