import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/src/context/Auth";
import "./globals.css";

// Initialize Poppins font with specified weights
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Metadata for the page
export const metadata: Metadata = {
  title: "Personalized Travel Itinerary Generator",
  description: "This is a Personalized Travel Itinerary Generator",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={2000}
              pauseWhenPageIsHidden
              visibleToasts={1}
            />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
