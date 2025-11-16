"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type Props = {
  onQuickAdd?: () => void; // called when quick-add pressed
};

export default function Navbar({ onQuickAdd }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);

  useEffect(() => {
    function goOnline() {
      setIsOnline(true);
    }
    function goOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/my-book", label: "My Book" },
    { href: "/entries", label: "Entries" },
    { href: "/summary", label: "Summary" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: logo + title */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Open menu"
                className="p-2 rounded-md md:hidden hover:bg-gray-100"
                onClick={() => setMobileOpen((s) => !s)}
              >
                {/* hamburger */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-md font-semibold">MW</div>
                <div className="hidden sm:block">
                  <div className="font-semibold text-sm">MyWorkBook</div>
                  <div className="text-xs text-gray-500">mobile-first PWA</div>
                </div>
              </Link>
            </div>

            {/* Middle: links (desktop) */}
            <nav className="hidden md:flex md:items-center md:gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-md text-sm ${pathname === l.href ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right: sync status, quick-add, user */}
            <div className="flex items-center gap-3">
              {/* Sync status */}
              <div className="flex items-center gap-2 px-2">
                <div
                  title={isOnline ? "Online" : "Offline"}
                  className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-400"}`}
                />
                <span className="text-xs text-gray-600 hidden sm:inline">{isOnline ? "Online" : "Offline"}</span>
              </div>

              {/* Quick add (visible on all sizes) */}
              <button
                onClick={() => {
                  if (onQuickAdd) onQuickAdd();
                  else router.push("/entries/new");
                }}
                className="hidden sm:inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
                aria-label="Quick add entry"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Quick add
              </button>

              {/* user / auth */}
              {session ? (
                <div className="flex items-center gap-2">
                  {/* <img
                    src={session.user?.image || `/api/avatar/${session.user?.email}`}
                    alt={session.user?.name || "user"}
                    className="w-8 h-8 rounded-full object-cover border"
                  /> */}
                  <div className="hidden sm:flex flex-col text-sm">
                    <button className="text-sm font-medium text-gray-700" onClick={() => router.push("/profile")}>{session.user?.name}</button>
                    <button
                      className="text-xs text-gray-500 hover:underline"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile expanded menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95">
            <div className="px-3 py-2 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-3 py-2 rounded-md text-sm ${pathname === l.href ? "bg-gray-100 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (onQuickAdd) onQuickAdd();
                    else router.push("/entries/new");
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-blue-600 text-white"
                >
                  + Quick add
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100">
                {session ? (
                  <div className="flex items-center gap-3 px-3 py-2">
                    <img src={session.user?.image || `/api/avatar/${session.user?.email}`} alt="avatar" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-medium">{session.user?.name}</div>
                      <button className="text-sm text-gray-500 hover:underline" onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="block px-3 py-2 text-sm text-gray-700">Login</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating quick add for mobile (FAB) */}
      <button
        onClick={() => {
          if (onQuickAdd) onQuickAdd();
          else router.push("/entries/new");
        }}
        aria-label="Quick add entry"
        className="fixed right-4 bottom-6 z-50 md:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-blue-600 text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* spacer so page content doesn't hide under fixed header */}
      <div className="h-14" />
    </>
  );
}
