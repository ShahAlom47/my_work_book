"use client";

import { useEffect, useState, startTransition } from "react";
import { useUser } from "@/hooks/useUser";
import { updateUserName } from "@/lib/allApiRequest/apiRequests";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const ProfileInfo = () => {
  const { user } = useUser();
  const { data: session, update } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user name
  useEffect(() => {
    if (user?.name) {
      startTransition(() => setName(user.name));
    }
  }, [user]);

  // Update Name
  const handleNameUpdate = async () => {
    const userId = user?.id;
    if (!userId) return;
    try {
      setLoading(true);

      const response = await updateUserName(String(userId), name);
      toast.success(response?.message || "Name updated successfully");
      await update({ user: { ...session?.user, name: name } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 mb-6 border">
      <h3 className="text-lg font-medium mb-3 text-gray-800">
        Profile Information
      </h3>

      <label className="block text-sm text-gray-600 mb-1">Email</label>
      <input
        disabled
        value={user?.email || ""}
        className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-100"
      />

      <label className="block text-sm text-gray-600 mb-1">Full Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />

      <button
        onClick={handleNameUpdate}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white transition ${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileInfo;
