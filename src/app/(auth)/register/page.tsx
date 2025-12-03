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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">

    {/* Glass Form Card */}
    <form
      onSubmit={handleSubmit(handleRegisterClick)}
      className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full"
    >
      <h1 className="text-3xl font-semibold text-white text-center mb-6 pb-2 border-b border-white/30">
        Register
      </h1>

      {/* Inputs */}
      <div className="mb-4 text-white space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 focus:outline-none focus:border-blue-400 placeholder-gray-300"
        />
        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 focus:outline-none focus:border-blue-400 placeholder-gray-300"
        />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 focus:outline-none focus:border-blue-400 placeholder-gray-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-200"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
      </div>

      {/* Note */}
      <p className="text-yellow-200 text-xs mb-4 bg-yellow-700/20 p-2 rounded-md border border-yellow-400/30">
        ⚠️ গুরুত্বপূর্ণ: ইমেইলটি সঠিক এবং সক্রিয় কিনা যাচাই করে নিন। ভুল ইমেইল দিলে পরবর্তীতে
        অ্যাকাউন্ট রিকভারি বা পাসওয়ার্ড রিসেট করতে সমস্যা হতে পারে।
      </p>

      {/* Button */}
      <PrimaryButton
        className="w-full mb-4 rounded-md"
        type="submit"
        isLoading={loading}
      >
        Register
      </PrimaryButton>

      <SocialLogin />

      {/* Links */}
      <div className="text-center text-sm text-gray-200 mt-4">
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
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl text-center w-full max-w-sm">
       

          <h3 className="text-lg text-white mb-2">
          Your Email:{" "}
            <span className="font-semibold text-yellow-600">{formData?.email}</span>
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed mb-4">
            আপনি যেই ইমেইলটি ব্যবহার করেছেন সেটি কি সঠিক?
            ভুল হলে ভবিষ্যতে অ্যাকাউন্ট রিকভারি ও পাসওয়ার্ড রিসেট করতে সমস্যা হবে।
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={submitRegistration}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>

            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default Register;
