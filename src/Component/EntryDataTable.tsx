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
}> = ({ entries, onTitleClick, handleDelete, userId, entryId }) => {
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

  return (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-700">
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
              <tr key={entry.entryDataId} className="hover:bg-gray-800 bg-gray-900">
                <td className="border p-2">{formatDateUI(entry.date)}</td>

                <td
                  className="border p-2 cursor-pointer text-blue-600"
                  onClick={() => onTitleClick(String(entry.entryDataId))}
                >
                  {entry.placeName}
                </td>

                <td className="border p-2">{entry.description}</td>
                <td className="border p-2">{entry.addAmount}</td>

                <td className="border p-2 flex gap-2 justify-center ">
                  <button
                    className="bg-yellow-500 px-2 py-1 text-white rounded"
                    onClick={() => openEditModal(entry)}
                  >
                    <FaEdit className="text-black" />
                  </button>

                  <button
                    className="bg-red-600 px-2 py-1 text-white rounded"
                    onClick={() => handleDelete(String(entry.entryDataId))}
                  >
                    <MdDeleteForever className="text-lg text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4  bg-gray-700">
        {entries.map((entry) => (
          <div
            key={entry.entryDataId}
            className="border rounded-lg p-4 shadow-sm bg-gray-900"
          >
            <div className="flex justify-between text-lg text-gray-400">
              <span className=" font-bold">{formatDateUI(entry.date)}</span>
              <span className="font-bold text-green-700">
                ৳ {entry.addAmount} TK
              </span>
            </div>

            <h3
              onClick={() => onTitleClick(String(entry.entryDataId))}
              className="mt-2 text-lg font-bold text-blue-600 cursor-pointer"
            >
            <strong className=" text-gray-100"> Place: </strong> {entry.placeName}
            </h3>

            <p className="mt-1 text-gray-400"><strong>Comment: </strong>{entry.description}</p>

            <div className="flex justify-end gap-3 mt-3">
              <button
                className="px-3 py-1 bg-yellow-400 text-black rounded"
                onClick={() => openEditModal(entry)}
              >
                <FaEdit />
              </button>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleDelete(String(entry.entryDataId))}
              >
                <MdDeleteForever className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {selectedEntry && (
        <EditEntryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          entryData={selectedEntry}
          userId={userId}
          entryId={String(entryId)}
          onUpdated={() => {}}
        />
      )}
    </>
  );
};

export default EntryDataTable;
