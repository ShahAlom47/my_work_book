"use client";
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { fetchEntries } from '@/lib/allApiRequest/apiRequests';
import EntryTable from './EntryTable';

const MyWorkBook = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const res = await fetchEntries();
      return res.data;
    },
  });

  const handleDelete = (id) => {
    alert(`Delete logic for id: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit logic for id: ${id}`);
  };

  const handleAddTitle = () => {
    alert(`Add logic for title: ${newTitle}`);
  };

  const handleTitleClick = (id) => {
    alert(`Navigate to detail page for title id: ${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">MyWorkBook Titles</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FiPlus /> Add Hisab Name
        </button>
      </div>

      {/* Add Title Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
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

      {/* Entry Table */}
      <EntryTable
        entries={entries}
        onTitleClick={handleTitleClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyWorkBook;
