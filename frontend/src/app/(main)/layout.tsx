"use client";

import { Navbar } from "@/src/components/layout/Navbar";
import { AuthProvider } from "@/src/context/Auth";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Navbar />
      <main className="min-h-screen pt-16 pb-4 sm:pt-20 sm:pb-6 md:pt-24 md:pb-10 lg:pt-32 lg:pb-20 bg-gray-800 px-4 sm:px-6 md:px-10 lg:px-20">
        {children}
      </main>
    </AuthProvider>
  );
};

export default MainLayout;
