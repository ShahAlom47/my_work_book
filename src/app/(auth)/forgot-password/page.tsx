"use client";
import { forgotPasswordRequest } from "@/lib/allApiRequest/apiRequests";
import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


   const handleSend = (e) => {
    e.preventDefault();

  const res=   emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
      {
        user_email: email,
        reset_link: `https://your-website.com/reset-password?email=${email}`,
      },
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
    )
    
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to send email");
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  console.log(  handleSend(e))

    if (!email) {
      return alert("Please enter your email address");
    }
    setLoading(true);
    try {
      const response = await forgotPasswordRequest(email);
      if (response.success) {
        toast.success(response.message || "Reset link sent to your email!");
        setEmail("");
        setLoading(false);
      } else {
        toast.error(response.message || "Failed to send reset link.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "There was an error sending the reset email. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-200 text-center mb-6">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Remembered your password?
          <a href="/login" className="text-blue-600 hover:underline">
            Go back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
