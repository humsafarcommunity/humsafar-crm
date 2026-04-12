"use client";

import React from "react";

interface ToastProps {
  msg: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ msg, type = "info", onClose }) => {
  const backgrounds = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-indigo-500",
  };

  const icons = {
    success: "✓",
    error: "✗",
    info: "ℹ",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${backgrounds[type]} text-white px-5 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300`}
    >
      <span>{icons[type]}</span>
      <span className="flex-1">{msg}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white text-lg leading-none ml-2"
      >
        ×
      </button>
    </div>
  );
};
