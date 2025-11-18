"use client";
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const EntryTable = ({ entries, onTitleClick, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border border-gray-300 rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Title Name</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((title) => (
          <tr key={title.id} className="hover:bg-gray-50 cursor-pointer">
            <td
              className="p-2 border"
              onClick={() => onTitleClick(title.id)}
            >
              {title.name}
            </td>
            <td className="p-2 border flex gap-2">
              <button
                onClick={() => handleEdit(title.id)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(title.id)}
                className="text-red-500 hover:text-red-700"
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
