"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Logo from "./Logo";



export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUser();

  const [mobileOpen, setMobileOpen] = useState(false);


  // Only show these if user exists
  const userNavLinks = [
    { href: "/", label: "Home" },
    { href: "/my-book", label: "My Book" },
    { href: "/settings", label: "Settings" },
  ];

  const guestNavLinks = [{ href: "/", label: "Home" }];

  const navLinks = user ? userNavLinks : guestNavLinks;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo />
              <button
                aria-label="Open menu"
                className="p-2 rounded-md md:hidden hover:bg-gray-100"
                onClick={() => setMobileOpen((s) => !s)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6H20M4 12H20M4 18H20" />
                </svg>
              </button>

              <Link href="/" className="flex items-center gap-2">
               
              </Link>
            </div>

            {/* Desktop links */}
            <nav className="hidden md:flex md:items-center md:gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-md text-sm ${
                    pathname === l.href
                      ? "bg-gray-100 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Online Status */}
           
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Image
                      src={user?.image || `/api/avatar/${user?.email}`}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <button
                        className="text-sm text-gray-500 hover:underline"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="block px-3 py-2 text-sm">
                    Login
                  </Link>
                )}
              </div>

          

              {/* User / Login */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex flex-col text-sm">
                    <button
                      className="text-sm font-medium text-gray-700"
                      onClick={() => router.push("/profile")}
                    >
                      {user?.name}
                    </button>
                    <button
                      className="text-xs text-gray-500 hover:underline"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-sm text-gray-700 hover:underline">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95">
            <div className="px-3 py-2 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    pathname === l.href
                      ? "bg-gray-100 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

              

              
            </div>
          </div>
        )}
      </header>

      <div className="h-14" />
    </>
  );
}
