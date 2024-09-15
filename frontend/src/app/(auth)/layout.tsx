import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Head from "next/head"; // Importing Head for better SEO and metadata management

// Load the Poppins font with various weights for better typography control
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* TODO -  Basic metadata for SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Login to your account and explore personalized travel itineraries" />
        <title>Auth | Personalized Travel Itinerary</title>
        {/* TODO -  Link for a favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={`${poppins.className} min-h-screen flex flex-col bg-slate-100`}>
        {/* Toaster for notifications */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={2000}
          pauseWhenPageIsHidden
          visibleToasts={1}
        />

        {/* Main content for authentication */}
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>

        <footer className="text-center p-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Plan-IT App. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
