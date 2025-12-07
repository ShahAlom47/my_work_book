"use client";

import { resetPasswordRequest } from "@/lib/allApiRequest/apiRequests";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const otpFromUrl = searchParams.get("otp");

  const [otp, setOtp] = useState(otpFromUrl || "");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !password || !confirmPass || !email) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ⭐ Backend API here:
      const res = await  resetPasswordRequest(email, Number(otp), password);
      if(res.success){
        toast.success("Password reset successful!");
        router.push("/login");
      }
   else {
        toast.error(res.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
         <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">

          {/* Email (Read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-100">Email</label>
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm font-medium text-gray-100">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-100">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-100">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
