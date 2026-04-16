"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className = "", ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`
        relative w-full py-4 text-white rounded-xl font-black text-sm shadow-xl transition-all 
        flex items-center justify-center gap-3
        ${pending ? "bg-slate-800 cursor-not-allowed opacity-80" : "bg-linear-to-br from-indigo-500 to-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] cursor-pointer"}
        ${className}
      `}
    >
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Authenticating...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
