"use client";

import { FilterOption } from "@/types/types";
import React, { useState, useEffect } from "react";


interface SearchFilterProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: FilterOption) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearchChange,
  onFilterChange,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterOption>("All");

  // Call parent handler when search changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearchChange(search);
    }, 300); // Debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [search, onSearchChange]);

  // Call parent handler when filter changes
  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter Select */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterOption)}
        className="border rounded-md px-4 py-2 w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="this Week">This Week</option>
        <option value="this Month">This Month</option>
        <option value="this Year">This Year</option>
      </select>
    </div>
  );
};

export default SearchFilter;
