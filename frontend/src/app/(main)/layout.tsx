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
      <main className="min-h-screen p-4 sm:p-6 md:p-10 lg:p-20 bg-gray-800">
        {children}
      </main>
    </AuthProvider>
  );
};

export default MainLayout;
