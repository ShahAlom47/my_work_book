"use client";

import Image from "next/image";
import Link from "next/link";
import imgFull from "@/assets/bannerBig.jpg";
import imgMobile from "@/assets/bannerMobile.jpg";
import { useUser } from "@/hooks/useUser";

const Banner = () => {
  const { user } = useUser();

  return (
    <section className="relative max-w-7xl mx-auto h-[490px] sm:h-[590px] md:h-[750px] lg:h-[750px] rounded-sm  overflow-hidden shadow-md flex items-center justify-center">
      {/* Desktop Image - slightly brightened */}
      <Image
        src={imgFull}
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute inset-0 hidden md:block filter brightness-105"
        priority
      />

      {/* Mobile Image - slightly brightened */}
      <Image
        src={imgMobile}
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute   inset-0  top-10 md:hidden filter brightness-105"
        priority
      />

      <div className="h-full flex justify-center items-end z-50 py-4 text-center px-4 max-w-md mx-auto  bottom-1 w-full ">
        {!user ? (
          <div className="space-y-3 mt-20 md:mt-0">
            <p className="text-base sm:text-lg text-white drop-shadow-sm bg-black/40 inline-block px-2 rounded-md">
              চালিয়ে যেতে লগইন করা আবশ্যক
            </p>

            <Link
              href="/login"
              className="inline-block bg-white/95 text-gray-900 font-semibold px-6 py-2 sm:px-7 sm:py-2.5 rounded-xl shadow hover:bg-white transition"
            >
              Login / Continue
            </Link>
          </div>
        ) : (
          <div className="space-y-3 mt-20 md:mt-0 flex flex-col items-center">
            <p className="text-base sm:text-lg text-white drop-shadow-sm bg-black/40 inline-block px-2 rounded-md">
              Welcome back,{" "}
              <span className="font-semibold">{user?.name || "User"}</span> 👋
            </p>

            <Link
              href="/my-book"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-1 sm:px-7 sm:py-2.5 rounded-sm shadow hover:bg-blue-700 transition"
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
