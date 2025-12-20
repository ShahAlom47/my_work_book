"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const userNavLinks = [
    { href: "/", label: "Home" },
    { href: "/my-book", label: "My Book" },
    { href: "/user/settings", label: "Settings" },
  ];
  const guestNavLinks = [{ href: "/", label: "Home" }];
  const navLinks = user ? userNavLinks : guestNavLinks;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 text-black">
            
            {/* Logo + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              <Logo />

              <button
                aria-label="Open menu"
                className="p-2 rounded-md md:hidden hover:bg-gray-100"
                onClick={() => setMobileOpen((s) => !s)}
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6H20M4 12H20M4 18H20" />
                </svg>
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1 rounded-sm text-sm transition ${
                    pathname === l.href
                      ? "bg-gray-300 font-medium"
                      : " hover:bg-gray-100"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right Side: Login OR User */}
            <div className="relative">
              {!user ? (
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-md border text-sm hover:bg-gray-50 transition"
                >
                  Login
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => setMenuOpen((s) => !s)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                  >
                    <span className="font-medium text-sm capitalize">{user?.name}</span>

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`${menuOpen ? "rotate-180" : ""} transition`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md text-sm overflow-hidden">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white/95 border border-gray-600 rounded-sm m-2 py-2 space-y-1 px-3 text-black">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-3 py-2 rounded-md text-sm ${
                  pathname === l.href
                    ? "bg-gray-300 font-medium"
                    : " hover:bg-gray-100"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile Login / Logout */}
            {!user ? (
              <Link
                href="/login"
                className="block px-3 py-2 text-sm rounded-md border hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                  setMobileOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </header>

      <div className="h-14" />
    </>
  );
}
