"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { ImSpinner3 } from "react-icons/im";

const NavAuthMenu = () => {
  const { data: session, status } = useSession();

  console.log(session)

  if (status === "loading") return <div> <ImSpinner3 className="animate-spin" /></div>;

  return (
    <div className="relative">
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-gray-300 hover:text-white">
              <FaUserCircle size={24} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>

            {/* Only for admin: you can conditionally render this */}
            {session.user.role === "admin" && (
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full">Dashboard</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-red-600 cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
        title="Login"
          href="/login"
          className="text-gray-300 hover:text-white flex items-center gap-1"
        >
          <RiLoginBoxLine size={20} />
        </Link>
      )}
    </div>
  );
};

export default NavAuthMenu;
