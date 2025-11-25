"use client";

import { updateEntryData } from "@/lib/allApiRequest/apiRequests";
import { EntryData } from "@/lib/interfaces/interfaces";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryData: EntryData;
  userId: string;
  entryId: string;
}

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  isOpen,
  onClose,
  entryData,
  userId,
  entryId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EntryData>({
    defaultValues: entryData,
  });

  // Update form default values when entryData changes
  useEffect(() => {
    reset(entryData);
  }, [entryData, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: EntryData) => {
    try {
      const updatedData = {
        ...data,
        addAmount: Number(data.addAmount),
      };

      const response = await updateEntryData(
        entryData.entryDataId || "",
        entryId,
        userId,
        updatedData
      );

      if (response.success) {
        alert("Updated Successfully!");
        onClose();
      } else {
        alert(response.message || "Update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Entry</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register("date")}
              className="border p-2 rounded"
            />
          </div>

          {/* Place Name */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Place Name</label>
            <input
              {...register("placeName")}
              className="border p-2 rounded"
              placeholder="Place Name"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Description</label>
            <input
              {...register("description")}
              className="border p-2 rounded"
              placeholder="Description"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Amount</label>
            <input
              type="number"
              {...register("addAmount", { valueAsNumber: true })}
              className="border p-2 rounded"
              placeholder="Amount"
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              className="px-3 py-1 bg-gray-400 text-white rounded"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEntryModal;
