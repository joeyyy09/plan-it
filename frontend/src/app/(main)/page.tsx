"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import api, { baseURL } from "@/src/api/api";
import TravelImage from "@/public/image1.png";
import TravelImage2 from "@/public/image2.png";
import TravelImage3 from "@/public/image3.png";

const Page = () => {
  const { authState: { token } } = useAuth();
  const router = useRouter();
  const [keyGenerated, setKeyGenerated] = useState<boolean>(false);

  const fetchKeyData = useCallback(async () => {
    try {
      const { status } = await api.get(`${baseURL}/api/key/v2`);
      if (status) {
        setKeyGenerated(true);
        return;
      }

      const { status: postStatus } = await api.post(`${baseURL}/api/key/v2/`);
      if (postStatus) {
        setKeyGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching key data:", error);
    }
  }, []);

  useEffect(() => {
    fetchKeyData();
  }, [fetchKeyData]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                Unlock Your Next Adventure
              </h1>
              <p className="max-w-[600px] text-xl text-gray-400">
                Dive into an extraordinary journey with our cutting-edge itinerary builder. Curate your path with seamless precision and set out on an adventure that’s as unique as you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/create-trip"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white text-black px-8 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  prefetch={false}
                >
                  Plan Your Trip
                </Link>
                <Link
                  href="#learn-more"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gray-800 text-white px-8 text-lg font-medium transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-black"
                  prefetch={false}
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent h-20 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-20 bottom-0 z-10" />
              <Image
                src={TravelImage3}
                alt="Unforgettable Travel Moments"
                className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
                width={1200}
                height={600}
                quality={100}
              />
            </div>
          </div>
        </section>

        <section id="learn-more" className="w-full py-20 bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Crafted for Every Explorer</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Bespoke Journeys",
                  description: "Shape every detail of your travel with our dynamic customization options, tailored to your tastes and interests.",
                  icon: "🧳",
                },
                {
                  title: "Smart Travel Insights",
                  description: "Receive intelligent recommendations that align perfectly with your travel style and preferences.",
                  icon: "🤓",
                },
                {
                  title: "Effortless Coordination",
                  description: "Share your plans and collaborate with fellow travelers effortlessly, ensuring a smooth and enjoyable journey.",
                  icon: "🌐",
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-6 transition-all duration-300 hover:bg-gray-700">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src={TravelImage2}
                  alt="Innovative Trip Planning"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  width={600}
                  height={400}
                  quality={100}
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Revolutionize Your Travel Experience
                </h2>
                <p className="text-xl text-gray-400">
                  Our platform leverages advanced AI to fine-tune every facet of your journey, ensuring that your trip is perfectly aligned with your vision. Whether it’s hidden gems or popular destinations, we’re here to make your travels exceptional.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Personalized itinerary crafting</li>
                  <li>• Real-time updates and smart adjustments</li>
                  <li>• Exclusive access to special offers</li>
                  <li>• 24/7 support for seamless travel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 PlanIT. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                prefetch={false}
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                prefetch={false}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                prefetch={false}
              >
                Support
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
