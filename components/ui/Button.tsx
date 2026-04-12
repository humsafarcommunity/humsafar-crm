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
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-linear-to-br from-indigo-500 to-indigo-600 text-white border-none",
    success: "bg-linear-to-br from-emerald-500 to-emerald-600 text-white border-none",
    danger: "bg-linear-to-br from-red-500 to-red-600 text-white border-none",
    ghost: "bg-transparent text-slate-500 border border-slate-200 hover:bg-slate-50",
    whatsapp: "bg-linear-to-br from-green-400 to-green-600 text-white border-none",
    email: "bg-linear-to-br from-amber-500 to-amber-600 text-white border-none",
    call: "bg-linear-to-br from-blue-500 to-blue-600 text-white border-none",
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
