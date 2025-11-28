"use client";

import React from "react";

const SortingFilter = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) => {
  return (
    <select
      className="border px-3 py-1 rounded text-sm"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
      <option value="year">This Year</option>
    </select>
  );
};

export default SortingFilter;
