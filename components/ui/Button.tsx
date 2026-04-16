import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "danger" | "ghost" | "whatsapp" | "email" | "call";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-black transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-linear-to-br from-indigo-400 to-indigo-600 text-white shadow-md shadow-indigo-100",
    success: "bg-linear-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-100",
    danger: "bg-linear-to-br from-red-400 to-red-600 text-white shadow-md shadow-red-100",
    ghost: "bg-white text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 shadow-sm",
    whatsapp: "bg-linear-to-br from-emerald-300 to-emerald-500 text-white shadow-md shadow-emerald-100",
    email: "bg-linear-to-br from-amber-300 to-amber-500 text-white shadow-md shadow-amber-100",
    call: "bg-linear-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4.5 py-2.5 text-[13px]",
    lg: "px-7 py-3 text-[15px]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
