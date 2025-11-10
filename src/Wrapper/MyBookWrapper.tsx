import React, { ReactNode } from 'react';

interface MyBookWrapperProps {
  children: ReactNode;
  title?: string;
}

const MyBookWrapper: React.FC<MyBookWrapperProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-6">
        {title && (
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default MyBookWrapper;
