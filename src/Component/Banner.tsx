"use client";

import Image from "next/image";
import Link from "next/link";
import imgFull from "@/assets/bannerBig.jpg";
import imgMobile from "@/assets/bannerMobile.jpg";
import { useUser } from "@/hooks/useUser";

const Banner = () => {
  const { user } = useUser();

  return (
    <section className="relative max-w-7xl mx-auto h-[420px] sm:h-[500px] md:h-[650px] lg:h-[750px] rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
      
      {/* Desktop Image */}
      <Image
        src={imgFull}
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute inset-0 hidden md:block"
        priority
      />

      {/* Mobile Image */}
      <Image
        src={imgMobile}
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute inset-0 md:hidden"
        priority
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-md mx-auto">

        {/* Login Required / User Welcome */}
        {!user ? (
          <div className="space-y-3 mt-20 md:mt-0">
            <p className="text-base sm:text-lg text-white drop-shadow">
              চালিয়ে যেতে লগইন করা আবশ্যক
            </p>

            <Link
              href="/login"
              className="inline-block bg-white/90 text-gray-900 font-semibold px-6 py-2 sm:px-7 sm:py-2.5 rounded-xl shadow hover:bg-white transition"
            >
              Login / Continue
            </Link>
          </div>
        ) : (
          <div className="space-y-3 mt-20 md:mt-0">
            <p className="text-base sm:text-lg text-white drop-shadow">
              Welcome back,{" "}
              <span className="font-semibold">{user?.name || "User"}</span> 👋
            </p>

            <Link
              href="/my-book"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 sm:px-7 sm:py-2.5 rounded-xl shadow hover:bg-blue-700 transition"
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
