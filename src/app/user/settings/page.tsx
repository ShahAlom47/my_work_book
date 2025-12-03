"use client";

import ChangePassword from "@/Component/ChangePassword";
import DangerZone from "@/Component/DangerZone";
import ProfileInfo from "@/Component/ProfileInfo";



const Settings = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        ⚙️ Account Settings
      </h1>

      <ProfileInfo />
      <ChangePassword />
      <DangerZone />
    </div>
  );
};

export default Settings;
