"use client";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <p className="text-gray-700 text-lg font-medium">Loading, please wait...</p>
    </div>
  );
}
