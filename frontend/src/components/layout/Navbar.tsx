import { Button } from "@/src/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/src/components/ui/sheet";
import { useAuth } from  "@/src/app/(main)/AuthContext";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuUser2, LuLogOut } from "react-icons/lu";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export const Navbar = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="fixed top-0 w-full h-16 px-4 bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg
            className="h-8 w-8 text-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => router.push("/")}
          >
            <path d="M12 2l3 9h-6l3-9zM5 21h14v-2H5v2z" />
          </svg>
          <p
            className="text-2xl font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            PlanIT
          </p>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex space-x-8">
            <Link href="/create-trip" className="hover:text-gray-300 transition-colors text-lg font-medium">
              Create Trip
            </Link>
            <Link href="/my-trips" className="hover:text-gray-300 transition-colors text-lg font-medium">
              My Trips
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {authState.token ? (
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-white hover:bg-gray-800"
                onClick={() => setShowProfile(!showProfile)}
              >
                <LuUser2 className="h-5 w-5" />
                <span>{authState.user?.name}</span>
                {showProfile ? <FaCaretUp className="h-4 w-4" /> : <FaCaretDown className="h-4 w-4" />}
              </Button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                  <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-800">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" className="text-white border-white hover:bg-gray-800" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-black text-white">
            <nav className="flex flex-col h-full">
              <div className="flex items-center space-x-2 border-b border-gray-700 pb-4 mb-4">
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3 9h-6l3-9zM5 21h14v-2H5v2z" />
                </svg>
                <p className="font-semibold text-xl">PlanIT</p>
              </div>
              <div className="space-y-4">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/create-trip">Create Trip</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/my-trips">My Trips</Link>
                </Button>
              </div>
              <div className="mt-auto">
                {authState.token ? (
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-sm mb-2">{authState.user?.name}</p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-500 hover:text-red-400"
                    >
                      <LuLogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-white border-white hover:bg-gray-800" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="w-full bg-white text-black hover:bg-gray-200" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};