"use client";

import { Entry } from "@/lib/interfaces/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface EntryTableProps {
  entries: Entry[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const EntryTable: React.FC<EntryTableProps> = ({
  entries,
  handleEdit,
  handleDelete,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (id: string) => {
     setLoading(true);
    router.push(`/my-book/entries/${id}`);
  };

  return (
    <>
      {loading && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )}
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-200 shadow-lg">
      <table className="table table-zebra w-full p-3">
        <thead className="bg-gray-700/40 sticky top-0 text-black z-10">
          <tr>
            <th className="py-4 text-base font-semibold">Entry Name</th>
            <th className="w-40 text-center text-base font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <tr
                key={entry._id as string}
                className="hover:bg-gray-400 transition-all duration-200 shadow-lg rounded-sm"
              >
                <td
                  onClick={() => handleNavigate(entry._id as string)}
                  className="cursor-pointer p-4 font-medium hover:text-primary transition"
                >
                  {entry.entryName}
                </td>

                <td>
                  <div className="flex items-center justify-center gap-2 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(entry._id as string);
                      }}
                      className="btn btn-sm btn-warning btn-outline"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry._id as string);
                      }}
                      className="btn btn-sm btn-error btn-outline"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="py-12 text-center text-base-content/60"
              >
                No entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EntryTable;