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
      className={`px-4 py-3 rounded-md border border-slate-300 text-slate-900 font-semibold text-[14px] bg-slate-50/50 outline-hidden focus:border-slate-500 focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition-all placeholder:text-slate-300 ${className}`}
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
      className={`px-4 py-3 rounded-lg border border-slate-200 text-slate-900 font-semibold text-[14px] bg-slate-50/50 outline-hidden focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-900/5 cursor-pointer transition-all ${className}`}
      {...props}
    >
      {children}
    </select>
  </div>
);
