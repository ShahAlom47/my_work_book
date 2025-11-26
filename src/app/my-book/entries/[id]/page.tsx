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
import { Entry, EntryData } from "@/lib/interfaces/interfaces";
import EntryDataTable from "@/Component/EntryDataTable";
import AddEntryDataModal from "@/Component/AddEntryDataModal";
import PerDaySalaryInput from "@/Component/PerDaySalary";
import toast from "react-hot-toast";

const Entries = () => {
  const params = useParams();
  const { user } = useUser();
  const { confirm, ConfirmModal } = useConfirm();

  const userId = user?.id ?? user?._id;
  const entryId = params.id as string;

  const [showAddModal, setShowAddModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch entries with totalDays, salary info from server
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

  // Sort entryData by date
  const sortedEntryData: EntryData[] = [...(data.entryData || [])].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  });

  const handleDelete = async (entryDataId: string) => {
    const ok = await confirm({
      title: "Delete Entry",
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
          {/* Per Day Salary Input */}
          <PerDaySalaryInput
            userId={String(userId)}
            entryId={entryId}
            perDaySalary={data.perDaySalary || 0}
            setPerDaySalary={() => refetch()} // Refetch after update
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
          >
            Add Data
          </button>

          {/* Sort Button */}
          <button
            className="bg-gray-300 text-black px-3 py-2 rounded hover:bg-gray-400"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded grid grid-cols-1 sm:grid-cols-5 gap-3 text-center sm:text-left">
        <div className="font-medium">Total Workdays: {data.totalDays || 0}</div>
        <div className="font-medium">Per Day Salary: {data.perDaySalary || 0} tk</div>
        <div className="font-medium">Total Salary: {data.totalSalary || 0} tk</div>
        <div className="font-medium">Paid Salary: {data.paidSalary || 0} tk</div>
        <div className="font-medium">
          Remaining: {data.remainingSalary || 0} tk
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <EntryDataTable
          userId={String(userId)}
          entries={sortedEntryData}
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
