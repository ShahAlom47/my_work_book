"use client";

import Image from "next/image";
import Link from "next/link";
import imgFull from "@/assets/bannerBig.jpg";
import imgMobile from "@/assets/bannerMobile.jpg";
import { useUser } from "@/hooks/useUser";

const Banner = () => {
  const { user } = useUser();

  return (
    <section className="relative max-w-7xl mx-auto md:h-[800px] h-[500px] flex items-end justify-center text-center rounded-2xl overflow-hidden shadow-lg">
      {/* Background image */}
      <Image
        src={imgFull}
        alt="MyWorkBook Banner"
        fill
        className="object-cover absolute inset-0 hidden md:flex mx-auto "
        priority
      />
      <Image
        src={imgMobile}
        alt="MyWorkBook Banner"
        // fill
        width={400}
        height={300}
        className="object-cover absolute inset-0 md:hidden "
        priority
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-10 bb"></div> */}

      {/* Content */}
      <div className="relative z-10 px-4 text-white">
       

        {/* Conditional Buttons */}
        {!user ? (
          <div className="space-y-3 mb-7">
            <p className="text-sm md:text-base text-gray-900 ">
              চালিয়ে যেতে লগইন করা আবশ্যক
            </p>
            <Link
              href="/login"
              className="inline-block bg-yellow-800 border-yellow-500 border text-yellow-100 font-semibold px-6 py-2 rounded-xl hover:bg-yellow-900 transition"
            >
              Login / Continue
            </Link>
          </div>
        ) : (
          <div className="space-y-3 mb-7">
            <p className="text-sm md:text-base text-gray-200">
              Welcome back,{" "}
              <span className="font-semibold">{user?.name || "User"}</span> 👋
            </p>
            <Link
              href="/my-book"
              className="inline-block text-white bg-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-100 transition"
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
