"use client";

import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

const DangerZone = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
        rounded-xl px-8 pt-6 pb-8 lg:w-4/12 md:w-6/12 sm:w-9/12 w-full">

        <h3 className="text-lg font-medium text-gray-100 mb-3">Danger Zone</h3>

        <p className="text-sm text-gray-200 mb-3">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-1 bg-red-600 text-sm text-white rounded-sm hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      {/* Modal Component */}
      {openModal && <DeleteAccountModal close={() => setOpenModal(false)} />}
    </>
  );
};

export default DangerZone;
