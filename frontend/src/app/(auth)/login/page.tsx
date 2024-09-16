"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import api, { baseURL } from "../../../api/api";
import { SignUpForm } from "../../../../models";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const { setAuthState } = useAuth();
  const [user, setUser] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [shownPassword, setShownPassword] = useState<boolean>(false);

  const toggleShownPassword = () => {
    setShownPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToast = toast.loading("Registering...");
    setLoading(true);

    const { name, email, password } = user;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${baseURL}/api/user/signup`, {
        name,
        email,
        password,
      });

      toast.dismiss(loadingToast);

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      setAuthState(data);
      toast.success(data.message);
      router.push("/");
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Signup error:", error.message);
      toast.error("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] px-4 md:px-6 bg-slate-200">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 flex relative">
              <Input
                type={shownPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
              <span
                className="absolute right-5 pt-7 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShownPassword}
              >
                {shownPassword ? (
                  <FaEye className="text-[#060f17]" />
                ) : (
                  <FaEyeSlash className="text-[#03070b]" />
                )}
              </span>
            </div>
            <div className="flex justify-between text-xs pb-2">
              <p>Already have an account?</p>
              <Link href="/login" className="font-semibold underline">
                Login
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
