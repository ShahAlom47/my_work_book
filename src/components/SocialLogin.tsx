"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

// 👉 Reusable sign-in handler
const handleSignIn = (provider: "google" | "github" | "facebook"|"linkedin") => {
  signIn(provider, { callbackUrl: "/" });
};

const SocialLogin: React.FC = () => {
  return (
    <div className="flex gap-4 justify-center mb-4">
      <button
        type="button"
        onClick={() => handleSignIn("facebook")}
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
        aria-label="Sign in with Facebook"
      >
        <FaFacebook size={15} />
      </button>
      <button
        type="button"
        onClick={() => handleSignIn("github")}
        className="bg-black text-white p-2 rounded-full hover:bg-gray-800"
        aria-label="Sign in with GitHub"
      >
        <FaGithub size={15} />
      </button>
      <button
        type="button"
        onClick={() => handleSignIn("google")}
        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
        aria-label="Sign in with Google"
      >
        <FaGoogle size={15} />
      </button>
      <button
        type="button"
        onClick={() => handleSignIn("linkedin")}
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
        aria-label="Sign in with Google"
      >
        <FaLinkedin size={15} />
      </button>
    </div>
  );
};

export default SocialLogin;
