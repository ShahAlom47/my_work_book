"use client";
import { forgotPasswordRequest } from "@/lib/allApiRequest/apiRequests";
import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
  data?: {
    otp: number;
    email: string;
  };
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ⭐ EmailJS দিয়ে OTP পাঠানোর function
  const sendOtpEmail = async (otp: number, userEmail: string,reset_link:string) => {
    try {
    await emailjs.send(
  process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
  {
    user_email: userEmail,   // To Email
    name: "My App",          // From Name
    reset_link: reset_link,   // OTP link
    otp: otp                 // OTP
  },
  process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
);
      toast.success("OTP has been sent to your email.");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OTP email.");
    }
  };

  // ⭐ Main Submit Handler
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email address.");
    return;
  }

  setLoading(true);

  try {
    // Backend request → OTP generate করে দিবে
    const response = await forgotPasswordRequest(email);
    const res = response as ForgotPasswordResponse;

    if (!res || !res.data) {
      toast.error("Something went wrong!");
      return;
    }

    if (res.success) {
      const userEmail = res.data.email;
      const otp = res.data.otp;

      if (!userEmail || !otp) {
        toast.error("Invalid response from server.");
        return;
      }
      const reset_link = `http://localhost:3000/reset-password?email=${encodeURIComponent(userEmail)}&otp=${otp}`;

      // EmailJS দিয়ে OTP পাঠানো
      await sendOtpEmail(otp, userEmail, reset_link);

      toast.success(res.message || "Check your email for OTP!");
      setEmail("");
    } else {
      toast.error(res.message || "Failed to send OTP.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-white">
          Forgot Password?
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Enter your email address and we’ll send you a verification OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Go back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
