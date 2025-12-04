"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { deleteUserAccount } from "@/lib/allApiRequest/apiRequests";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteAccountModal = ({ close }: { close: () => void }) => {
  const { user } = useUser();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) return toast.error("Please enter your password");


    if (!user?.id) return;

    try {
      setLoading(true);

      const res = await deleteUserAccount(String(user.id), password);

      if (res.success) {
        toast.success("Account deleted successfully");

        await signOut({ redirect: false });
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete account";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white/10 border border-white/80 rounded-xl shadow-2xl p-6 w-full max-w-md relative">

        <h2 className="text-xl font-semibold text-white mb-4">Confirm Account Deletion</h2>

        <p className="text-gray-200 text-sm mb-4">
          This action is permanent. Once deleted, your account cannot be recovered.
        </p>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-1 border rounded-sm mb-4 text-white bg-transparent"
        />

  

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="px-4 py-1 bg-gray-500 text-white rounded-sm hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteAccountModal;
