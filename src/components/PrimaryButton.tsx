"use client";
import React from "react";
import clsx from "clsx";
import { ImSpinner3 } from "react-icons/im";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  isLoading = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        "px-5 py-2 rounded-sm font-semibold text-white bg-color-secondary hover:bg-gray-600 transition duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center",
        className
      )}
    >
      {isLoading?<ImSpinner3 className="animate-spin" />: children}
    </button>
  );
};

export default PrimaryButton;
