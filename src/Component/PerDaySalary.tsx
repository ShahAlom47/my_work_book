"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { updatePerDaySalary } from "@/lib/allApiRequest/apiRequests";
import { queryClient } from "@/Providers/Provider";

interface Props {
  userId: string;
  entryId: string;
  perDaySalary: number; // default value from DB
}

const PerDaySalaryInput: React.FC<Props> = ({
  userId,
  entryId,
  perDaySalary,
}) => {
  const [value, setValue] = useState(perDaySalary); // local state for input
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!value || value <= 0) {
      toast.error("Please enter a valid salary");
      return;
    }

    try {
      setLoading(true);
      const res = await updatePerDaySalary(userId, entryId, value);

      if (res.success) {
        toast.success("Per day salary updated!");
        queryClient.invalidateQueries({ queryKey: ["entries", entryId] });
      } else {
        toast.error(res.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="Per Day Salary"
        className="border rounded px-3 py-1 w-full sm:w-40 text-sm"
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-green-600 text-sm text-white px-4 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default PerDaySalaryInput;
