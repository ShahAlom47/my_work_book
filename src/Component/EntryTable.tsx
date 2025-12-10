"use client";
import { Entry } from "@/lib/interfaces/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// ---- Props Interface ----
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
  const route = useRouter();

  const handleNavigate = (id: string) => () => {
    route.push(`/my-book/entries/${id}`);
  };

  return (
    <table className="w-full border border-gray-300 rounded">
      <thead>
        <tr className="bg-gray-600">
          <th className="p-2 border">Title Name</th>
          <th className="p-2 border w-32 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((title) => (
          <tr
          
            key={title._id as string}
            className="hover:bg-gray-700 transition cursor-pointer my-auto border"
          >
            {/* Title Cell */}
            <td
              className=" p-1  border"
              onClick={handleNavigate(title?._id as string)}
              
            >
              {title.entryName}
            </td>

            {/* Action Buttons */}
            <td className="p-1  flex items-center justify-center  mt-1 gap-3 ">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent parent click
                  handleEdit(title._id as string);
                }}
                className="text-yellow-500 hover:text-yellow-700 transition"
              >
                <FiEdit />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent parent click
                  handleDelete(title._id as string);
                }}
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
