"use client";

import { useEffect, useState } from "react";

// Custom type for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPrompt() {
 const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
const [showInstall, setShowInstall] = useState(false);


  useEffect(() => {
    const handler = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the installation");
    } else {
      console.log("User dismissed the installation");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <>
      {showInstall && (
        <button
          onClick={installApp}
          className=" px-4 py-1 bg-blue-600 text-white rounded-sm mx-auto hover:bg-blue-700 transition"
        >
          Download App
        </button>
      )}
    </>
  );
}
