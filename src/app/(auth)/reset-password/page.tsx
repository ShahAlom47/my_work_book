"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // get the email from URL
  const otp = searchParams.get("otp");     // get the otp from URL

  console.log({ email, otp });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <p>Email: <span className="font-mono text-blue-600">{email}</span></p>
        <p>OTP: <span className="font-mono text-blue-600">{otp}</span></p>
      </div>
    </div>
  );
};

export default ResetPassword;
