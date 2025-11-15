"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const NavSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    setIsExpanded(false);
    setSearchValue("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
    // Your search logic here
  };

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      className={`
        relative flex items-center
        ${isExpanded ? "bg-gray-600 bg-opacity-80 rounded-full lg:w-[260px] md:w-[150]" : " w-10 "}
        transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] overflow-hidden
      `}
      style={{
        height: "30px",
        paddingLeft: isExpanded ? "16px" : "0",
        paddingRight: isExpanded ? "8px" : "0",
      }}
    >
      {isExpanded ? (
        <>
          <form onSubmit={handleSubmit} className="flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white w-full 
                        placeholder:text-white placeholder:opacity-70 lg:text-sm md:text-sm text-xs"
            />
          </form>
          <button
            type="button"
            onClick={handleCloseClick}
            className="ml-2 text-gray-300 hover:text-gray-100 cursor-pointer transition-colors duration-300"
          >
            <FiX size={18} />
          </button>
        </>
      ) : (
        <button
          onClick={handleSearchClick}
          className="absolute inset-0 flex items-center justify-center w-full h-full
                   text-white hover:text-gray-200 transition-colors duration-300"
        >
          <FiSearch size={18} />
        </button>
      )}
    </div>
  );
};

export default NavSearchBar;
