"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useConfirm } from "@/hooks/useConfirm";
import {
  deleteEntryData,
  fetchEntriesDataById,
} from "@/lib/allApiRequest/apiRequests";
import { Entry } from "@/lib/interfaces/interfaces";
import EntryDataTable from "@/Component/EntryDataTable";
import AddEntryDataModal from "@/Component/AddEntryDataModal";
import toast from "react-hot-toast";
import PerDaySalaryInput from "@/Component/PerDaySalary";

const Entries = () => {
  const params = useParams();
  const { user } = useUser();
  const { confirm, ConfirmModal } = useConfirm();

  const userId = user?.id ?? user?._id;
  const entryId = params.id as string;

  const [perDaySalary, setPerDaySalary] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch entries
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["entries", entryId],
    enabled: !!userId && !!entryId,
    queryFn: async () => {
      const res = await fetchEntriesDataById(String(userId), entryId);
      return res.data as Entry;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading entries...</p>;
  if (!data) return <p>No entries found.</p>;

  const entryData = data.entryData || [];

  // -------- NEW CALCULATIONS --------
  const totalDays = entryData.length;                  // Total entry count
  const totalSalary = perDaySalary * totalDays;        // Per day × total entry
  const paidSalary = entryData.reduce(
    (sum, d) => sum + (d.addAmount || 0),
    0
  ); // Sum of all addAmount
  const remainingSalary = totalSalary - paidSalary;    // Remaining
  // -----------------------------------

  const handleDelete = async (entryDataId: string) => {
    const ok = await confirm({
      title: "Delete Category",
      message: "Are you sure you want to delete this item?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    });

    if (ok) {
      await deleteEntryData(entryDataId, entryId, String(userId));
      toast.success("Deleted successfully!");
      refetch();
    }
  };

  return (
    <div className="p-3 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">{data.entryName}</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="number"
            placeholder="Per Day Salary"
            value={perDaySalary}
            onChange={(e) => setPerDaySalary(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full sm:w-40"
          />
          <PerDaySalaryInput
            userId={String(userId)}
            entryId={entryId}
            perDaySalary={perDaySalary}
            setPerDaySalary={setPerDaySalary}
          > 

          </PerDaySalaryInput>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
          >
            Add Data
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
        <div className="font-medium">Total Salary: {totalSalary} tk</div>
        <div className="font-medium">Paid Salary: {paidSalary} tk</div>
        <div className="font-medium">Remaining Salary: {remainingSalary} tk</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <EntryDataTable
          userId={String(userId)}
          entries={entryData}
          onTitleClick={(id) => console.log("Title clicked:", id)}
          entryId={entryId}
          handleDelete={(id) => handleDelete(id)}
        />
      </div>

      {/* Add EntryData Modal */}
      {showAddModal && (
        <AddEntryDataModal
          entryId={entryId}
          userId={String(userId)}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {ConfirmModal}
    </div>
  );
};

export default Entries;
