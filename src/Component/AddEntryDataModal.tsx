"use client";
import { addEntryDataById } from "@/lib/allApiRequest/apiRequests";
import { queryClient } from "@/Providers/Provider";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  entryId: string;
  userId: string;
  onClose: () => void;
}

const AddEntryDataModal: React.FC<Props> = ({ entryId, userId, onClose }) => {
  const [date, setDate] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [addAmount, setAddAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false); // <-- Loading State

  const handleSubmit = async () => {
    if (!date || !placeName) {
      return toast.error("Date and Place Name are required");
    }

    setLoading(true); // <-- Start loading

    const data = {
      date: new Date(date).toISOString(),
      placeName,
      description: description || "",
      addAmount: addAmount || 0,
      balance: 0,
    };

    try {
      const response = await addEntryDataById(userId, entryId, data);

      if (response?.success) {
        toast.success(response.message || "Entry data added successfully");
        queryClient.invalidateQueries({ queryKey: ["entries", entryId] });

        onClose();
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add entry data");
      } else {
        toast.error("Failed to add entry data");
      }
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 max-h-screen overflow-y-scroll">
      <div className="bg-white p-6 rounded-md md:w-6/12 w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-5 text-center">Add Entry Data</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Place Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter place name"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded resize-none"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            placeholder="Optional"
            value={addAmount}
            onChange={(e) =>
              setAddAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntryDataModal;
