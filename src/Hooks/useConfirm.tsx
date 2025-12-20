"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;

  // 🔥 NEW OPTIONAL PROPS
  requireText?: string; // e.g. "delete"
  inputPlaceholder?: string;
};

export function useConfirm() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [inputValue, setInputValue] = useState("");
  const resolverRef = useRef<((result: boolean) => void) | undefined>(undefined);

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setInputValue("");
    setOptions(opts);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleClose = (result: boolean) => {
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = undefined;
    }
    setOptions(null);
    setInputValue("");
  };

  const isTextMatched =
    !options?.requireText || inputValue === options.requireText;

  const ConfirmModal = options
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              {options.title || "Are you sure?"}
            </h3>

            <p className="text-gray-200 mb-4">{options.message}</p>

            {/* 🔥 OPTIONAL INPUT FIELD */}
            {options.requireText && (
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-1">
                  Type <span className="font-semibold text text-red-400">{options.requireText}</span> to confirm
                </p>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    options.inputPlaceholder || options.requireText
                  }
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                {options.cancelText || "Cancel"}
              </button>

              <button
                disabled={!isTextMatched}
                onClick={() => handleClose(true)}
                className={`px-4 py-1 rounded text-white transition
                  ${
                    isTextMatched
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-400 opacity-50 cursor-not-allowed"
                  }`}
              >
                {options.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return { confirm, ConfirmModal };
}
