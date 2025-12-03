"use client";

const DangerZone = () => {
  return (
    <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
      <h3 className="text-lg font-medium text-red-700 mb-3">Danger Zone</h3>

      <p className="text-sm text-gray-700 mb-3">
        Want to delete your account permanently?
      </p>

      <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Delete Account
      </button>
    </div>
  );
};

export default DangerZone;
