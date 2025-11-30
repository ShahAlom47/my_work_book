"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PropsType {
  className?: string;
}

const Logo = ({ className }: PropsType) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex gap-2 mx-3 justify-center items-center cursor-pointer max-h-10
                max-w-[25px] sm:max-w-[40px] md:max-w-[50px] lg:max-w-[60px]
                 overflow-hidden"
    >
      <Image
        src={'/logo.png'}
        alt="Logo"
        width={300} // default width
        height={200} // default height
        unoptimized
        className={`w-full h-auto ${className}`} // responsive
      />
    </div>
  );
};

export default Logo;
