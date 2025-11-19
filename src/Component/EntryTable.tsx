"use client";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// ---- Entry Interface ----
export interface Entry {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// ---- Props Interface ----
interface EntryTableProps {
  entries: Entry[];
  onTitleClick: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const EntryTable: React.FC<EntryTableProps> = ({
  entries,
  onTitleClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <table className="w-full border border-gray-300 rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Title Name</th>
          <th className="p-2 border w-32 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((title) => (
          <tr
            key={title.id}
            className="hover:bg-gray-50 transition cursor-pointer"
          >
            {/* Title Cell */}
            <td
              className="p-2 border"
              onClick={() => onTitleClick(title.id)}
            >
              {title.name}
            </td>

            {/* Action Buttons */}
            <td className="p-2 border flex items-center justify-center gap-3">
              <button
                onClick={() => handleEdit(title.id)}
                className="text-yellow-500 hover:text-yellow-700 transition"
              >
                <FiEdit />
              </button>

              <button
                onClick={() => handleDelete(title.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryTable;
