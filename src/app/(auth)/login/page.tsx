"use client";
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Link from "next/link";
import { useLoading } from "@/hooks/useLoading";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/Component/PrimaryButton";
import SocialLogin from "@/Component/SocialLogin";

const Login: React.FC = () => {
const [email, setEmail] = useState<string>("user1@gmail.com");
const [password, setPassword] = useState<string>("123456");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, startLoading, stopLoading } = useLoading();
  const router = useRouter();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  startLoading();

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    stopLoading();
    console.log("Login response:", res);

 if (res?.ok) {
  toast.success("Logged in successfully!");
  router.push("/");
} else {
  const rawError = res?.error || "";

  if (rawError.includes("EC6B0000") || rawError.includes("ssl")) {
    toast.error("Secure connection failed. Please check your internet or try again later.");
  } else if (rawError.includes("No account")) {
    toast.error("No account found with this email.");
  } else if (rawError.includes("Incorrect password")) {
    toast.error("The password you entered is incorrect.");
  } else {
    toast.error("Login failed. Please try again.");
  }
}

  } catch (error) {
    console.error("Login error:", error);
    stopLoading();
    toast.error("Something went wrong during login. Please check your network and try again.");
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <form
        onSubmit={handleLogin}
      className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-6 border-b-2 border-color-secondary pb-2">
          Login
        </h1>

        {/* Login Form */}
        <div className="mb-4 text-white">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-1 rounded-sm focus:outline-none mb-3 border-b border-color-secondary"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-1 rounded-sm focus:outline-none mb-3 border-b border-color-secondary pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-white cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <PrimaryButton isLoading={loading} className="w-full mb-3 rounded-sm" type="submit">
          Login
        </PrimaryButton>

        {/* Social Login */}
        <SocialLogin></SocialLogin>

        {/* Register & Home Links */}
        <div className="text-center text-sm text-white space-y-3 flex flex-col mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-300 hover:underline">
              Register here
            </Link>
          </p>
            <Link href="/forgot-password" className="hover:underline text-blue-400">
          Forgot Password?
        </Link>
   
          <p>
            <Link href="/" className="text-blue-300 hover:underline">
              Go to Home
            </Link>
          </p>
     
      
        </div>
      </form>
    </div>
  );
};

export default Login;
