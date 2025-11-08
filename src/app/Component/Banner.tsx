"use client"

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/Hooks/useUser";

const Banner = () => {
  const { user } = useUser();
  

  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center rounded-2xl overflow-hidden shadow-lg">
      {/* Background image */}
      <Image
        src="/images/banner-bg.jpg" // নিজের ব্যানার ইমেজ path দাও (public/images/...)
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute inset-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          MyWorkBook — Your Smart Work & Income Tracker
        </h1>
        <p className="text-base md:text-lg text-blue-100 mb-6">
          Manage your daily work, income, and client records — even offline!
        </p>

        {/* Conditional Buttons */}
        {!user ? (
          <div className="space-y-3">
            <p className="text-sm md:text-base text-gray-200">
              চালিয়ে যেতে লগইন করা আবশ্যক
            </p>
            <Link
              href="/login"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-100 transition"
            >
              Login / Continue
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm md:text-base text-gray-200">
              Welcome back, <span className="font-semibold">{user?.name || "User"}</span> 👋
            </p>
            <Link
              href="/my-list"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-100 transition"
            >
              📋 My List
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
