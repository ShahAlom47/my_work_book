"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useConfirm } from "@/hooks/useConfirm";
import { deleteEntryData, fetchEntriesDataById, updateEntryData } from "@/lib/allApiRequest/apiRequests";
import { Entry } from "@/lib/interfaces/interfaces";
import EntryDataTable from "@/Component/EntryDataTable";
import AddEntryDataModal from "@/Component/AddEntryDataModal";
import toast from "react-hot-toast";

const Entries = () => {
  const params = useParams();
  const { user } = useUser();
  const { confirm, ConfirmModal } = useConfirm();

  const userId = user?.id ?? user?._id;
  const entryId = params.id as string;

  const [perDaySalary, setPerDaySalary] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch entries
  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["entries", entryId],
    enabled: !!userId && !!entryId,
    queryFn: async () => {
      const res = await fetchEntriesDataById(String(userId), entryId);
      return res.data as Entry;
    },
  });

  if (isLoading) return <p>Loading entries...</p>;

  if (!data) return <p>No entries found.</p>;

  const entryData = data.entryData || [];

  // Calculate summary
  const totalAddAmount = entryData.reduce((sum, d) => sum + d.addAmount, 0);
  const remainingSalary = (data.totalSalary || 0) - (data.paidSalary || 0);

  

  const handleDelete = async (entryDataId: string) => {
    const ok = await confirm({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    });

    if (ok) {
      // ✅ ইউজার Confirm করেছে, এখন delete কাজ করো
      await deleteEntryData(entryDataId, entryId, String(userId));
      toast.success("Category deleted!");
      refetch();
    } else {
      // ❌ ইউজার Cancel করেছে
      console.log("User cancelled delete");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{data.entryName}</h1>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Per Day Salary"
            value={perDaySalary}
            onChange={(e) => setPerDaySalary(Number(e.target.value))}
            className="border rounded px-2 py-1"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAddModal(true)}
          >
            Add Data
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded flex gap-6">
        <div>Total Added: {totalAddAmount}</div>
        <div>Paid Salary: {data.paidSalary || 0}</div>
        <div>Remaining Salary: {remainingSalary}</div>
      </div>

      {/* Table */}
      <EntryDataTable
        entries={entryData}
        onTitleClick={(id) => console.log("Title clicked:", id)}
      
        handleDelete={(id) => handleDelete(id)}
      />

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
