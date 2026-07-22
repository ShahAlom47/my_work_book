"use client";

import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const userLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/my-book",
      label: "My Book",
    },
    {
      href: "/user/settings",
      label: "Settings",
    },
  ];

  const guestLinks = [
    {
      href: "/",
      label: "Home",
    },
  ];

  const navLinks = user ? userLinks : guestLinks;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          !scrolled
            ? "bg-yellow-200 shadow-md border-b"
            : "bg-gray-200/60 backdrop-blur"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">

          <div className="h-16 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">

   <button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="md:hidden p-2 rounded-lg text-black hover:bg-gray-100"
>
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="text-black"
  >
    {mobileOpen ? (
      <path d="M6 6L18 18M6 18L18 6" />
    ) : (
      <path d="M4 6H20M4 12H20M4 18H20" />
    )}
  </svg>
</button>

              <Logo />

            </div>

            {/* Desktop Menu */}

            <nav className="hidden md:flex items-center gap-2">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300

                  ${
                    pathname === item.href
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }
                  `}
                >
                  {item.label}
                </Link>
              ))}

            </nav>

            {/* Right */}

            <div className="relative" ref={menuRef}>

              {!user ? (
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-3 rounded-full border px-2 py-1 hover:bg-gray-100 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold uppercase">
                      {user.name?.charAt(0)}
                    </div>

                    <div className="hidden sm:block text-left">

                      <p className="text-sm font-semibold capitalize">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Welcome
                      </p>

                    </div>

                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>

                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-52 rounded-xl border bg-white shadow-xl overflow-hidden">

                      <Link
                        href="/user/settings"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-sm hover:bg-gray-50"
                      >
                        ⚙️ Settings
                      </Link>

                      <button
                        onClick={() =>
                          signOut({
                            callbackUrl: "/login",
                          })
                        }
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        🚪 Sign Out
                      </button>

                    </div>
                  )}
                </>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Menu */}
                {mobileOpen && (
         <div className="md:hidden border-t border-yellow-500 bg-yellow-400 shadow-xl rounded-b-2xl ">
  <div className="px-4 py-4 space-y-2">

    {navLinks.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
          pathname === item.href
            ? "bg-blue-700 text-white shadow-md"
            : "text-gray-900 hover:bg-yellow-300"
        }`}
      >
        {item.label}
      </Link>
    ))}

    <div className="border-t border-yellow-500 pt-4 mt-4">

      {!user ? (
        <Link
          href="/login"
          onClick={() => setMobileOpen(false)}
          className="block w-full rounded-xl bg-blue-700 text-white text-center py-3 font-semibold shadow hover:bg-blue-800 transition"
        >
          Login
        </Link>
      ) : (
        <>
          {/* User Card */}
          <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm mb-3">

            <div className="w-11 h-11 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold uppercase">
              {user.name?.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900 capitalize">
                {user.name}
              </p>

              <p className="text-xs text-gray-500">
                Welcome Back 👋
              </p>
            </div>

          </div>

          {/* Settings */}
          <Link
            href="/user/settings"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
          >
            ⚙️ Settings
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              setMobileOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="mt-3 w-full rounded-xl bg-red-500 text-white py-3 font-semibold shadow hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </>
      )}

    </div>

  </div>
</div>
        )}

      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}