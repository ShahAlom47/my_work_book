"use client";

import React from "react";
import { EntryData } from "@/lib/interfaces/interfaces";

const EntryDataTable: React.FC<{
  entries: EntryData[];
  onTitleClick: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}> = ({ entries, onTitleClick, handleEdit, handleDelete }) => {


   
console.log(entries, "entries in entry data table component");


  return (

    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Place Name</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.entryDataId} className="hover:bg-gray-100">
            <td className="border p-2">{new Date(entry.date).toLocaleDateString()}</td>
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
                onClick={() => handleEdit(String(entry.entryDataId))}
              >
                Edit
              </button>
              <button
                className="bg-red-600 px-2 py-1 text-white rounded"
                onClick={() => handleDelete(String(entry.entryDataId))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryDataTable;
