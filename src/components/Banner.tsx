import React from 'react';
import Image from 'next/image';
import img from "@/assets/images/bannerBG.jpg";

const Banner = () => {
  return (
    <div className="relative w-full lg:h-[500px] md:h-[400px] h-[300px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={img}
        alt="devDiary banner"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-100/60 dark:bg-black/60 z-10"></div>

      {/* Text Content */}
      <div className="z-20 text-center px-4 max-w-3xl text-gray-900 dark:text-white">
        <p  className="sm:text-sm text-xs uppercase tracking-widest mb-2 text-white inline px-4  bg-color-secondary rounded-full  ">
          A Developer’s Learning Hub
        </p>
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 " >
          Welcome to <span className="text-color-secondary">devDiary</span>
        </h1>
        <p className="text-md md:text-sm text-xs font-medium">
          My goal is simple: to share what little I know, learn from others, and grow together as developers. Let`s document and build—one line of code at a time.
        </p>
      </div>
    </div>
  );
};

export default Banner;
