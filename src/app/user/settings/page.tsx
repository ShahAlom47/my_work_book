"use client";

import { useState, useEffect, startTransition } from "react";
import { useUser } from "@/hooks/useUser";
import { passwordChange, updateUserName } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Settings = () => {
  const { user } = useUser();
  const { data: session, update } = useSession();

  const [name, setName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [loadingName, setLoadingName] = useState(false); // 🔥 NEW

  useEffect(() => {
    if (user?.name) {
      startTransition(() => {
        setName(user.name);
      });
    }
  }, [user, session]);

  const handleNameUpdate = async () => {
    const userId = user?.id;
    if (!userId) return;

    try {
      setLoadingName(true); // 🔥 Loading ON

      const response = await updateUserName(String(userId), name);

      toast.success(response?.message || "Name updated successfully");

      await update({
        user: {
          ...session?.user,
          name: name,
        },
      });

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    } finally {
      setLoadingName(false); // 🔥 Loading OFF
    }
  };

const handleChangePassword = async (oldPassword: string, newPassword: string) => {
  const userId = user?.id;
  if (!userId) return;

  // 🔥 Validation
  if (!oldPassword || !newPassword) {
    toast.error("Both fields are required!");
    return;
  }

  if (newPassword.length < 6) {
    toast.error("New password must be at least 6 characters long!");
    return;
  }

  if (oldPassword === newPassword) {
    toast.error("New password cannot be the same as the old password!");
    return;
  }

  try {
    const response = await passwordChange(String(userId), oldPassword, newPassword);

    if (response.success) {
      toast.success(response.message || "Password updated successfully");
      setOldPass("");
      setNewPass("");
    } else {
      toast.error(response.message || "Failed to update password");
    }

  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Something went wrong!");
  }
};


  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        ⚙️ Account Settings
      </h1>

      {/* Profile Info */}
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

        {/* Save Button with Loading State */}
        <button
          onClick={handleNameUpdate}
          disabled={loadingName}
          className={`px-5 py-2 rounded-lg text-white transition ${
            loadingName
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loadingName ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </div>
          ) : (
            "Save Changes"
          )}
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
          onClick={() =>handleChangePassword(oldPass, newPass)}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Update Password
        </button>
      </div>

      {/* Danger Zone */}
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
