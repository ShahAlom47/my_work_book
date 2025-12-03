"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import PrimaryButton from "@/Component/PrimaryButton";
import SocialLogin from "@/Component/SocialLogin";

export interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState<IFormInput | null>(null);

  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // Step 1: Open confirmation modal
  const handleRegisterClick: SubmitHandler<IFormInput> = (data) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  // Step 2: Confirm and submit API
  const submitRegistration = async () => {
    if (!formData) return;

    try {
      startLoading();
      const res = await registerUser({ ...formData });

      if (res?.success) {
        toast.success(res.message || "Registration successful");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      stopLoading();
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="max-w flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleRegisterClick)}
        className="bg-color-primary rounded px-8 pt-6 pb-8 mb-4 lg:w-4/12 md:w-6/12 sm:w-9/12 w-11/12 h-fit"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-6 border-b-2 border-color-secondary pb-2">
          Register
        </h1>

        {/* Register Form */}
        <div className="mb-4 text-white">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-1 rounded-sm focus:outline-none mb-3 border-b border-color-secondary"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-1 rounded-sm focus:outline-none mb-3 border-b border-color-secondary"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-1 rounded-sm focus:outline-none mb-3 border-b border-color-secondary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white pb-1"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Bangla Important Note */}
        <p className="text-yellow-200 text-xs mb-3 bg-yellow-700/20 p-2 rounded-sm">
          ⚠️ গুরুত্বপূর্ণ নোট: রেজিস্ট্রেশনের জন্য যেই ইমেইল ব্যবহার করবেন,
          সেটি সঠিক এবং সক্রিয় কিনা ভালোভাবে যাচাই করে নিন। ভুল ইমেইল ব্যবহার করলে
          ভবিষ্যতে অ্যাকাউন্ট রিকভারি বা পাসওয়ার্ড রিসেট করতে সমস্যা হতে পারে।
        </p>

        <PrimaryButton
          className="w-full mb-3 rounded-sm"
          type="submit"
          isLoading={loading}
        >
          Register
        </PrimaryButton>

        {/* Social Login */}
        <SocialLogin />

        {/* Login Link */}
        <div className="text-center text-sm text-white">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-300 hover:underline">
              Login here
            </Link>
          </p>
          <p>
            <Link href="/" className="text-blue-300 hover:underline">
              Go to Home
            </Link>
          </p>
        </div>
      </form>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center shadow-lg">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              রেজিস্ট্রেশন নিশ্চিত করুন
            </h2>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              আপনি যেই ইমেইলটি ব্যবহার করেছেন সেটি কি সঠিক? <br />
              অনুগ্রহ করে আপনার ইমেইলটি আবার যাচাই করে নিন।
              <br />
              ভুল ইমেইল দিলে ভবিষ্যতে অ্যাকাউন্ট রিকভারি বা পাসওয়ার্ড রিসেট করতে
              সমস্যা হবে।
            </p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={submitRegistration}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                হ্যাঁ, রেজিস্টার করুন
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                না, ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
