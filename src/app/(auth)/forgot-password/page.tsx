"use client";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your email address");
    }

    // API call here…
    console.log("Reset email sent to:", email);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-3">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
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
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Go back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
