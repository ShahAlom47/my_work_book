"use client";
import { useUser } from '@/Hooks/useUser';
import React, { ReactNode } from 'react'; // 🔹 তোমার hook path অনুযায়ী adjust করো

interface MyBookWrapperProps {
  children: ReactNode;
  title?: string;
}

const MyBookWrapper: React.FC<MyBookWrapperProps> = ({ children, title }) => {
  const { user, isLoading } = useUser();

  // 🔹 User data লোড হওয়া পর্যন্ত Loading দেখাও
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  // 🔹 যদি user না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট বা মেসেজ দেখাও
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600 text-lg">Please log in to access this page.</p>
      </div>
    );
  }

  // 🔹 user থাকলে মূল content দেখাও
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-6">
        {title && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default MyBookWrapper;
