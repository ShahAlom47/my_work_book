"use client";

import PrimaryButton from "@/components/PrimaryButton";
import SocialLink from "@/components/SocialLink";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    reset(); // Reset form after submission (backend later)
  };

  return (
    <section className="w-full bg  px-4 py-12 md:px-16 bg-light dark:bg-dark">
      <div className="max-w  grid md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 border-b border-color-secondary">
            Contact Me
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Have questions, suggestions, or want to collaborate? Feel free to
            reach out!
          </p>
          <ul className="text-gray-700 dark:text-gray-300 space-y-3 p">
            <li>
              <strong>Email:</strong> devdiary@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +8801747291486
            </li>
            <li>
              <strong>Address:</strong> Sylhet, Bangladesh.
            </li>
          </ul>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap  gap-4 text-xl text-gray-700 dark:text-gray-300">
            <SocialLink></SocialLink>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-200 dark:bg-gray-400/40 p-5 rounded-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-2 py-2 rounded-md  border-b-2 border-color-secondary  dark:text-white  outline-none"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
                   className="w-full px-2 py-2 rounded-md  border-b-2 border-color-secondary  dark:text-white  outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={5}
                  className="w-full px-2 py-2 rounded-md  border-2 border-color-secondary  dark:text-white  outline-none"
              placeholder="Write your message..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <PrimaryButton
          isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
          >
            Send Message
          </PrimaryButton>

          {isSubmitSuccessful && (
            <p className="text-green-500 mt-2">Your message has been sent!</p>
          )}
        </form>
      </div>
    </section>
  );
}
