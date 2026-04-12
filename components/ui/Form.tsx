import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
        {label}
      </label>
    )}
    <input
      className={`px-3 py-2.5 rounded-lg border-1.5 border-slate-200 text-[13px] bg-white outline-hidden focus:border-indigo-500 transition-colors ${className}`}
      {...props}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, children, className = "", ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
        {label}
      </label>
    )}
    <select
      className={`px-3 py-2.5 rounded-lg border-1.5 border-slate-200 text-[13px] bg-white outline-hidden focus:border-indigo-500 cursor-pointer transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  </div>
);
