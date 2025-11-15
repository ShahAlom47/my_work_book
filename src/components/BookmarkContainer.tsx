"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { BiSolidRightArrow } from "react-icons/bi";
import { Tabs,TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BookmarkContainer = () => {
  return (
    <div >
      <Drawer>
        <DrawerTrigger className=" cursor-pointer pt-1 my-auto " title="Bookmark">
          <BsFillJournalBookmarkFill />
        </DrawerTrigger>
        <DrawerContent className="  border-l-8  border-color-secondary  ">
          <DrawerHeader className=" h-full">
            <DrawerTitle className="bg-color-primary py-3  border-b-4 border-color-secondary px-2 text-gray-300">
              BookMark
            </DrawerTitle>
            <div className=" p-2 px-6 relative h-full  ">
              <DrawerClose className="absolute top-5/12 left-0 bg-color-secondary  py-6 px-0.5 rounded-r-md cursor-pointer">
                <BiSolidRightArrow size={16} className=" text-gray-300" />
                {/* <Button variant="outline">Cancel</Button> */}
              </DrawerClose>
              <div className="h-full">
                <Tabs defaultValue="account" className="w-full  h-full ">
                  <TabsList className="border-b-2  w-full">
                    <TabsTrigger value="account">Videos</TabsTrigger>
                    <TabsTrigger value="password">Blogs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="h-full  ">
                    Show Your  Video bookmark list here.
                  </TabsContent>
                  <TabsContent value="password" className="h-full ">
                     Show Your  Blogs bookmark list here.
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BookmarkContainer;
