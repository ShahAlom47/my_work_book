"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link"; // SocialLogin Component Import
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/lib/allApiRequest/apiRequests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import PrimaryButton from "@/app/Component/PrimaryButton";
import SocialLogin from "@/app/Component/SocialLogin";
import { useLoading } from "@/Hooks/useLoading";

export interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
    const { loading, startLoading, stopLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
    startLoading(); // Start loading state
    const res = await registerUser({ ...data });

    if (res?.success) {
      toast.success(res.message || "Registration successful");
      router.push("/login"); // Redirect to login page after successful registration



    } else {
      toast.error(res.message || "Registration failed");
      console.warn("Server responded with success: false", res);
   

    }
  } catch (error) {
    handleApiError(error);  // Use the centralized error handler
  } finally {
    console.log("Form Data:", data);
    stopLoading(); // Stop loading state
  }
};

  return (
    <div className="max-w flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <PrimaryButton className="w-full mb-3 rounded-sm" type="submit" isLoading={loading}>
          Register
        </PrimaryButton>
        {/* Social Login */}
        <SocialLogin /> {/* Using the SocialLogin Component here */}
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
    </div>
  );
};

export default Register;
