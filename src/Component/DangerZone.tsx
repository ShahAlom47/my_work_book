"use client";

const DangerZone = () => {
  return (
     <div  className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
      rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full">
      <h3 className="text-lg font-medium text-gray-100 mb-3">Danger Zone</h3>

      <p className="text-sm text-gray-200 mb-3">
        Want to delete your account permanently?
      </p>

      <button className="px-5 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 transition">
        Delete Account
      </button>
    </div>
  );
};

export default DangerZone;
