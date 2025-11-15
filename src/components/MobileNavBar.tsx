"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/devDiaryLogo.png";
import NavSearchBar from "./NavSearchBar";
import BookmarkContainer from "./BookmarkContainer";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { NavLink } from "./NavLink";
import { usePathname } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CgMenuHotdog } from "react-icons/cg";
import NavAuthMenu from "./NavAuthMenu";
import ThemeChanger from "./ThemeChanger";

const MobileNavBar = () => {
  const pathname = usePathname();

  return (
    <div className=" flex items-center justify-between bg-color-primary text-white w-full ">
      <div className=" flex items-center gap-2 justify-between ">
        <Drawer direction="left">
          <DrawerTrigger className=" cursor-pointer pt-1 my-auto">
            <CgMenuHotdog size={30} />
          </DrawerTrigger>
          <DrawerContent className="left-0 top-0 bottom-0 w-[40%] h-full rounded-r-md border bg-color-primary rounded-sm text-white ">
            <DialogTitle></DialogTitle>
            {NavLink(pathname)}
          </DrawerContent>
        </Drawer>
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={70}
          className="cursor-pointer h-12 w-auto"
        ></Image>
      </div>
      <div className="flex items-center gap-1 ">
        <NavSearchBar></NavSearchBar>
        <BookmarkContainer></BookmarkContainer>
        <ThemeChanger></ThemeChanger>
        <NavAuthMenu></NavAuthMenu>
      </div>
    </div>
  );
};

export default MobileNavBar;
