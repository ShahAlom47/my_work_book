
"use client";

import React, { useState } from "react";
import { updatePerDaySalary } from "@/lib/allApiRequest/apiRequests"; 
import toast from "react-hot-toast";

interface Props {
  userId: string;
  entryId: string;
  perDaySalary: number;
  setPerDaySalary: (value: number) => void;
}

const PerDaySalaryInput: React.FC<Props> = ({
  userId,
  entryId,
  perDaySalary,

  setPerDaySalary,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!perDaySalary || perDaySalary <= 0) {
      toast.error("Please enter a valid salary");
      return;
    }

    try {
      setLoading(true);
      await updatePerDaySalary(userId, entryId, perDaySalary);
      toast.success("Per day salary updated!");
    } catch (err) {
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="number"
        placeholder="Per Day Salary"
        value={perDaySalary}
        onChange={(e) => setPerDaySalary(Number(e.target.value))}
        className="border rounded px-3 py-2 w-full sm:w-40"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default PerDaySalaryInput;
