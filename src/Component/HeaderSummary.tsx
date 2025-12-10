"use client";

import React from "react";

interface HeaderSummaryProps {
  totalWorkDays: number;
  totalSalary: number;
  totalPaid: number;
  remainingSalary: number;
}

const HeaderSummary: React.FC<HeaderSummaryProps> = ({
  totalWorkDays,
  totalSalary,
  totalPaid,
  remainingSalary,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-900 rounded-lg shadow-sm">

      <div className="p-4 rounded-xl bg-gray-500/50 shadow text-center">
        <h3 className="text-sm font-semibold text-gray-50">Total Work Days</h3>
        <p className="text-xl font-bold text-gray-100">{totalWorkDays}</p>
      </div>

   

      <div className="p-4 rounded-xl bg-gray-500/50 shadow text-center">
        <h3 className="text-sm font-semibold text-gray-50">Total Salary</h3>
        <p className="text-xl font-bold text-blue-600">৳ {totalSalary}</p>
      </div>

      <div className="p-4 rounded-xl bg-gray-500/50 shadow text-center">
        <h3 className="text-sm font-semibold text-gray-50">Total Paid</h3>
        <p className="text-xl font-bold text-green-600">৳ {totalPaid}</p>
      </div>

      <div className="p-4 rounded-xl bg-gray-500/50 shadow text-center">
        <h3 className="text-sm font-semibold text-gray-50">Remaining Salary</h3>
        <p className="text-xl font-bold text-red-400">৳ {remainingSalary}</p>
      </div>
    

    </div>
  );
};

export default HeaderSummary;
