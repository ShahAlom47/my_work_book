import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/Providers/Provider";
import InstallPrompt from "@/Component/InstallPrompt";
import Navbar from "@/Component/Navbar";



export const metadata: Metadata = {
  title: "My Work Book",
  description: "A personal collection of my projects, notes, and experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
 
  return (
    <html lang="en">
      <head>
        <title>My Work Book</title>
        <meta name="description" content="A personal collection of my projects, notes, and experiments." />
        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>

      <body
        className={` bg-white text-black`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>

        {/* Floating Install Button */}

        <div className=" w-full flex  justify-center  items-center  bg-slate-100 text-black bottom-4 right-4  ">
              <p>
    © {new Date().getFullYear()} All Rights Reserved. Developed by{" "}
    <span className="font-semibold">Shah Alom</span>
  </p>
          <InstallPrompt />
     
        </div>
      </body>
    </html>
  );
}
