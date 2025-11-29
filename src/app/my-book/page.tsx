"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addEntry,
  fetchEntriesName,
  updateEntry,
  deleteEntry,
} from "@/lib/allApiRequest/apiRequests";
import EntryTable from "@/Component/EntryTable";
import toast from "react-hot-toast";
import { Entry } from "@/lib/interfaces/interfaces";
import { useConfirm } from "@/hooks/useConfirm";
import { useUser } from "@/hooks/useUser";

const MyWorkBook = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editingId, setEditingId] = useState<string>("");
  const { user } = useUser();
  const { confirm, ConfirmModal } = useConfirm();
  const queryClient = useQueryClient();

 const userId = user?.id ?? user?._id;

  const { data, isLoading } = useQuery({
    queryKey: ["entries"],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetchEntriesName(String(userId));
      console.log(res)
      return res.data as Entry[];
    },
  });

  const entries = data || [];
  
  // ADD ENTRY
  const handleAddTitle = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return toast.error("Title name cannot be empty");
   

    if (!userId) {
      return toast.error("User not found. Please login again.");
    }

    const res = await addEntry(trimmed, userId as string);

    if (res?.success) {
      toast.success("Title added successfully");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      setShowAddModal(false);
      setNewTitle("");
    } else {
      toast.error(`Error adding title: ${res?.message}`);
    }
  };

  // EDIT ENTRY
  const openEditModal = (entry: Entry) => {
    setEditingId(entry._id as string);
    setEditTitle(entry.entryName);
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return toast.error("Title name cannot be empty");

    const res = await updateEntry(editingId, trimmed);
    if (res?.success) {
      toast.success("Title updated successfully");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      setShowEditModal(false);
    } else {
      toast.error(res?.message || "Failed to update");
    }
  };

  // DELETE ENTRY
  const handleDelete = async (id: string) => {

    const ok = await confirm({
      title: "Delete Entry",
      message: "Are you sure you want to delete this entry?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    });

    if (!ok) return;

    const res = await deleteEntry(id);
    if (res?.success) {
      toast.success("Title deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="md:text-2xl text-lg font-bold">MyWorkBook Titles</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex text-sm items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
        >
          <FiPlus /> Add Entry Name
        </button>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md min-w-96 md:w-6/12 w-full">
            <h2 className="text-lg font-bold mb-4">Add New Title</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              placeholder="Enter title name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTitle}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md min-w-96 md:w-6/12 w-full">
            <h2 className="text-lg font-bold mb-4">Edit Title</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
              placeholder="Enter new title name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <EntryTable
        entries={entries}
        onTitleClick={(id) => console.log("Clicked:", id)}
        handleEdit={(id) => {
          const entry = entries.find((e) => e._id === id);
          if (entry) openEditModal(entry);
        }}
        handleDelete={handleDelete}
      />

      {ConfirmModal}
    </div>
  );
};

export default MyWorkBook;
