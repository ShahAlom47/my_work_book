"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useConfirm } from "@/hooks/useConfirm";
import {
  deleteEntryData,
  fetchEntriesDataByQuery,
} from "@/lib/allApiRequest/apiRequests";
import { Entry } from "@/lib/interfaces/interfaces";
import EntryDataTable from "@/Component/EntryDataTable";
import AddEntryDataModal from "@/Component/AddEntryDataModal";
import PerDaySalaryInput from "@/Component/PerDaySalary";
import toast from "react-hot-toast";
import { FilterOption } from "@/types/types";
import SearchFilter from "@/Component/SearchFilter";
import HeaderSummary from "@/Component/HeaderSummary";

const Entries = () => {
  const params = useParams();
  const { user } = useUser();
  const { confirm, ConfirmModal } = useConfirm();

  const userId = user?.id ?? user?._id;
  const entryId = params.id as string;

  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterOption>("All");

  // Fetch entries with totalDays, salary info from server
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["entries", entryId, userId, search, filter],
    enabled: !!userId && !!entryId,
    queryFn: async () => {
      const query = { entryId, search, filter };
      const res = await fetchEntriesDataByQuery(String(userId), query);
      return res.data as Entry;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading entries...</p>;
  if (!data) return <p>No entries found.</p>;

  console.log(data);
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

        <SearchFilter onSearchChange={setSearch} onFilterChange={setFilter} />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Per Day Salary Input */}
          <PerDaySalaryInput
            userId={String(userId)}
            entryId={entryId}
            perDaySalary={data.perDaySalary || 0}
          />

          <button
            className="bg-blue-600 text-white px-4 py-1 text-sm rounded hover:bg-blue-700 w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
          >
            Add Data
          </button>
        </div>
      </div>
      <HeaderSummary
        totalPaid={data?.paidSalary || 0}
        totalSalary={data?.totalSalary || 0}
        totalWorkDays={data?.totalDays || 0}
        remainingSalary={data?.remainingSalary || 0}
      ></HeaderSummary>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <EntryDataTable
          userId={String(userId)}
          entries={data.entryData || []}
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
