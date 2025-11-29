"use client";

import React from "react";

interface HeaderSummaryProps {
  totalWorkDays: number;
  perDaySalary: number;
  totalSalary: number;
  totalPaid: number;
  remainingSalary: number;
}

const HeaderSummary: React.FC<HeaderSummaryProps> = ({
  totalWorkDays,
  perDaySalary,
  totalSalary,
  totalPaid,
  remainingSalary,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">

      <div className="p-4 rounded-xl bg-white shadow text-center">
        <h3 className="text-sm font-semibold text-gray-600">Total Work Days</h3>
        <p className="text-xl font-bold text-gray-800">{totalWorkDays}</p>
      </div>

   

      <div className="p-4 rounded-xl bg-white shadow text-center">
        <h3 className="text-sm font-semibold text-gray-600">Total Salary</h3>
        <p className="text-xl font-bold text-blue-600">৳ {totalSalary}</p>
      </div>

      <div className="p-4 rounded-xl bg-white shadow text-center">
        <h3 className="text-sm font-semibold text-gray-600">Total Paid</h3>
        <p className="text-xl font-bold text-green-600">৳ {totalPaid}</p>
      </div>

      <div className="p-4 rounded-xl bg-white shadow text-center">
        <h3 className="text-sm font-semibold text-gray-600">Remaining Salary</h3>
        <p className="text-xl font-bold text-red-600">৳ {remainingSalary}</p>
      </div>
         <div className="p-4 rounded-xl bg-white shadow text-center">
        <h3 className="text-sm font-semibold text-gray-600">Per Day Salary</h3>
        <p className="text-xl font-bold text-gray-800">৳ {perDaySalary}</p>
      </div>

    </div>
  );
};

export default HeaderSummary;
