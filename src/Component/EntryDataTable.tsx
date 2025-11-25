"use client";

import React, { useState } from "react";
import { EntryData } from "@/lib/interfaces/interfaces";
import EditEntryModal from "./EditEntryModal";
import { formatDateUI } from "@/utils/formatDateUI";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const EntryDataTable: React.FC<{
  entries: EntryData[];
  onTitleClick: (id: string) => void;
  handleDelete: (id: string) => void;
  userId: string;
  entryId: string;

}> = ({ entries, onTitleClick, handleDelete, userId,entryId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<EntryData | null>(null);

  const openEditModal = (entry: EntryData) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };
console.log(entries)
  return (
    <>
      <table className="w-full border-collapse border border-gray-300 overflow-x-scroll bb">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Place</th>
            <th className="border p-2">Comment</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr key={entry.entryDataId} className="hover:bg-gray-100 ">
              <td className="border p-2">
                {formatDateUI(entry.date)}
              </td>

              <td
                className="border p-2 cursor-pointer text-blue-600"
                onClick={() => onTitleClick(String(entry.entryDataId))}
              >
                {entry.placeName}
              </td>

              <td className="border p-2">{entry.description}</td>
              <td className="border p-2">{entry.addAmount}</td>

              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 px-2 py-1 text-white rounded"
                  onClick={() => openEditModal(entry)}
                >
                 <FaEdit className=" text-black" />
                </button>

                <button
                  className="bg-red-600 px-2 py-1 text-white rounded"
                  onClick={() => handleDelete(String(entry.entryDataId))}
                >
                  <MdDeleteForever className=" text-lg text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {selectedEntry && (
        <EditEntryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          entryData={selectedEntry}
          userId={userId}
          entryId={String(entryId)}
        />
      )}
    </>
  );
};

export default EntryDataTable;
