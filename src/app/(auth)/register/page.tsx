"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("✅ Registration successful!");
      router.push("/login");
    } else {
      const err = await res.json();
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className="border w-full p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          placeholder="Email"
          className="border w-full p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password is required", minLength: 6 })}
          placeholder="Password"
          className="border w-full p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">Min 6 characters</p>}

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
