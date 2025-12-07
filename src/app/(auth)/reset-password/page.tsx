"use client";

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

    if (!otp || !password || !confirmPass) {
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
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successful!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">

          {/* Email (Read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="text-sm font-medium text-gray-700">OTP</label>
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
            <label className="text-sm font-medium text-gray-700">
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
            <label className="text-sm font-medium text-gray-700">
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
