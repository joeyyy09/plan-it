"use client";

import api, { baseURL } from "../../../api/api";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../../../context/AuthContext";
import { chatSession } from "../../../service/AIModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaUsers } from "react-icons/fa";

const TravelersList=[
    {
        id:1,
        title:"Solo",
        desc:"You are the only person traveling",
        people:'1'
    },
    {
        id:2,
        title:"Duo",
        desc:"There's two of you traveling",
        people:'2'
    },
    {
        id:3,
        title:"Family",
        desc:"Family trip",
        people:'4 to 6 people'
    },
    {
        id:4,
        title:"Friends",
        desc:"Friends trip",
        people:'6 to 10 people'
    },
]

const BudgetList = [
    {
        id:1,
        title: "Cheap",
        desc: "Stays conscious of costs"
    },
    {
        id:2,
        title: "Moderate",
        desc: "Keep cost on the average side"
    },
    {
        id:1,
        title: "Luxury",
        desc: "No issue of costs"
    }
]

const AI_PROMPT="Generate Travel Plan for Location: {location}, for {noOfDays} days for {traveler} with a {budget} budget. Give me list of Hotel options with Hotel Name, Hotel Address, Price, Hotel Image Url, geo coordinates, rating, descriptions and suggest itinerary with place name, Place Details, Place Image Url, Geo Coordinates, ticket pricing, rating, time to travel each location for {noOfDays} days with each day plan with best time to visit in JSON Format"



const CreateTrip = () => {
  const [place, setPlace] = useState<any>();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { authState: token } = useAuth();
  const router = useRouter();

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onGenerateTrip = async () => {
    const { noOfDays, location, budget, traveler } = formData;

    if (!noOfDays || !location || !budget || !traveler) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", location?.label || "")
      .replace("{noOfDays}", noOfDays)
      .replace("{traveler}", traveler)
      .replace("{budget}", budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await saveItinerary(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveItinerary = async (data: string) => {
    setLoading(true);
    try {
      const jsonData = JSON.parse(data);
      const response = await api.post(`${baseURL}/api/itinerary/v2`, jsonData);

      if (!response.data) {
        throw new Error("No data received from the server");
      }

      const id = response.data.data._id;
      toast.success("Itinerary generated successfully!");
      router.push(`/view-trip/${id}`);
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast.error("Failed to save itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: You can add some logic here if needed
  }, [formData]);

return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-white">Craft Your Journey</h1>
        <p className="text-xl text-gray-300 mb-12">
          Let our AI create a personalized itinerary based on your preferences.
        </p>

        <div className="space-y-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-white mr-3 text-2xl" />
              <h2 className="text-2xl font-semibold text-white">Destination</h2>
            </div>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || ""}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: '#1f1f1f',
                    borderColor: '#333',
                    color: 'white',
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: 'white',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#333' : '#1f1f1f',
                    color: 'white',
                  }),
                },
              }}
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-white mr-3 text-2xl" />
              <h2 className="text-2xl font-semibold text-white">Duration</h2>
            </div>
            <Input
              placeholder="Number of days"
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white focus:border-white focus:ring-white"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaWallet className="text-white mr-3 text-2xl" />
              <h2 className="text-2xl font-semibold text-white">Budget</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BudgetList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`cursor-pointer rounded-lg p-4 transition-all ${
                    formData?.budget === item.title
                      ? "bg-white text-black border-2 border-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <FaUsers className="text-white mr-3 text-2xl" />
              <h2 className="text-2xl font-semibold text-white">Travel Group</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TravelersList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`cursor-pointer rounded-lg p-4 transition-all ${
                    formData?.traveler === item.people
                      ? "bg-white text-black border-2 border-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                  <p className="text-xs text-gray-400 mt-2">For {item.people} people</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            disabled={loading}
            className="bg-white hover:bg-gray-100 text-black px-8 py-3 text-lg rounded-full transition-all shadow-lg"
            onClick={onGenerateTrip}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
            ) : (
              "Generate Your Dream Trip"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
