"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { updateUserName } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";

const Settings = () => {
  const { user } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleNameUpdate = () => {
    console.log("Update Name:", name);
    const userId = user?.id;
    if (userId) {
      const updateName = async () => {
        try {
          // Assuming updateUserName is an imported API function
         const response = await updateUserName(String(userId), name);
          toast.success(response?.message || "Name updated successfully");
      
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to update name");
        }
      };
      updateName();
    }
  };

  const handlePasswordUpdate = () => {
    console.log("Password Change:", { oldPass, newPass });
    // TODO: API Call → /api/change-password
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        ⚙️ Account Settings
      </h1>

      {/* User Email – Read Only */}
      <div className="bg-white shadow-sm rounded-xl p-5 mb-6 border">
        <h3 className="text-lg font-medium mb-3 text-gray-800">
          Profile Information
        </h3>

        <label className="block text-sm text-gray-600 mb-1">
          Email (read-only)
        </label>
        <input
          type="text"
          disabled
          value={user?.email || ""}
          className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-lg cursor-not-allowed"
        />

        <label className="block text-sm text-gray-600 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring focus:ring-blue-200"
        />

        <button
          onClick={handleNameUpdate}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      {/* Password Change */}
      <div className="bg-white shadow-sm rounded-xl p-5 mb-6 border">
        <h3 className="text-lg font-medium mb-4 text-gray-800">
          Change Password
        </h3>

        <label className="block text-sm text-gray-600 mb-1">Old Password</label>
        <input
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring focus:ring-blue-200"
        />

        <label className="block text-sm text-gray-600 mb-1">
          New Password
        </label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring focus:ring-blue-200"
        />

        <button
          onClick={handlePasswordUpdate}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Update Password
        </button>
      </div>

      {/* Optional Danger Zone */}
      <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
        <h3 className="text-lg font-medium text-red-700 mb-3">Danger Zone</h3>

        <p className="text-sm text-gray-700 mb-3">
          Want to delete your account permanently?
        </p>

        <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
