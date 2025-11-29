"use client";

import { FilterOption } from "@/types/types";
import React, { useState } from "react";

interface SearchFilterProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: FilterOption) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearchChange,
  onFilterChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchClick = () => {
    onSearchChange(inputValue);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded-md px-4 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearchClick}
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Filter Select */}
      <select
        onChange={(e) => onFilterChange(e.target.value as FilterOption)}
        className="border rounded-md px-4 py-1 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All</option>
        <option value="This Week">This Week</option>
        <option value="This Month">This Month</option>
        <option value="This Year">This Year</option>
      </select>
    </div>
  );
};

export default SearchFilter;
