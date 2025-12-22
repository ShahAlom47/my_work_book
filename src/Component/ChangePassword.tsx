"use client";

import { useState } from "react";
import { passwordChange } from "@/lib/allApiRequest/apiRequests";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { user } = useUser();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePassword = async () => {
    if (!oldPass || !newPass || !confirmPass)
      return toast.error("All fields required");

    if (newPass.length < 6)
      return toast.error("Password must be 6 characters");

    if (newPass !== confirmPass)
      return toast.error("Passwords do not match");

    if (!user?.id) return;

    try {
      setLoading(true);

      const res = await passwordChange(String(user.id), oldPass, newPass);

      if (res.success) {
        toast.success(res.message);
        setOldPass("");
        setNewPass("");
        setConfirmPass("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full">
      <h3 className="text-lg font-medium mb-4 text-gray-100">
        Change Password
      </h3>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
        className="w-full px-4 py-1 border rounded-sm mb-4 text-white"
      />

      <input
        type="text"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="w-full px-4 py-1 border rounded-sm mb-4 text-white"
      />

      <input
        type="text"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        className="w-full px-4 py-1 border rounded-sm mb-4 text-white"
      />

      <button
        onClick={updatePassword}
        disabled={loading}
        className="px-5 py-1 bg-green-600 text-white rounded-sm text-sm hover:bg-green-700 transition"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
