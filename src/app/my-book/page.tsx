import MyBookWrapper from '@/Wrapper/MyBookWrapper';
import React from 'react';

const MyBook: React.FC = () => {
  return (
    <MyBookWrapper title="My WorkBook">
      <p className="text-gray-600">
        Manage your daily work, income, and pending amounts easily.
      </p>

      <div className="mt-6">
        my book page content...
      </div>
    </MyBookWrapper>
  );
};

export default MyBook;
