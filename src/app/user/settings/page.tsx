"use client";

import ChangePassword from "@/Component/ChangePassword";
import DangerZone from "@/Component/DangerZone";
import ProfileInfo from "@/Component/ProfileInfo";



const Settings = () => {
  return (
     <div className="min-h-screen flex gap-3 flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-100">
        ⚙️ Account Settings
      </h1>

      <ProfileInfo />
      <ChangePassword />
      <DangerZone />
    </div>
  );
};

export default Settings;
