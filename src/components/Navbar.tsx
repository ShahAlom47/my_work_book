"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/devDiaryLogo.png";
import { NavLink } from "./NavLink";
import { usePathname } from "next/navigation";
import NavSearchBar from "./NavSearchBar";
import BookmarkContainer from "./BookmarkContainer";
import MobileNavBar from "./MobileNavBar";
import useScreenInfo from "@/hooks/useScreenInfo";
import NavAuthMenu from "./NavAuthMenu";
import ThemeChanger from "./ThemeChanger";
const Navbar = () => {
  const pathname = usePathname();
  const { scrollY, scrollDirection } = useScreenInfo();
  const showNavbar = scrollDirection === "up" || scrollY < 100;



  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-[120%]"
      } bg-color-primary text-white border-b-4 border-color-secondary lg:px-5 md:px-3.5 px-2 `}
    >
      <div className=" lg:flex md:flex hidden items-center justify-between  ">
        <div className=" flex items-center gap-4 ">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={70}
            className="cursor-pointer h-12 w-auto"
          ></Image>
          {NavLink(pathname)}
        </div>
        <div className="flex items-center gap-4 ">
          <NavSearchBar></NavSearchBar>
          <BookmarkContainer></BookmarkContainer>
          <ThemeChanger></ThemeChanger>
        <NavAuthMenu></NavAuthMenu>
        </div>
      </div>
      <div className={`lg:hidden md:hidden flex items-center justify-between `}>
        <MobileNavBar></MobileNavBar>
      </div>
    </nav>
  );
};

export default Navbar;
