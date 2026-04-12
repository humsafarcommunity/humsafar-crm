import React from "react";

interface BadgeProps {
  label: string;
  config: {
    color: string;
    bg: string;
    icon?: string;
  };
}

export const Badge: React.FC<BadgeProps> = ({ label, config }) => (
  <span
    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
    style={{
      color: config.color,
      backgroundColor: config.bg,
      borderColor: `${config.color}22`,
    }}
  >
    {config.icon && <span>{config.icon}</span>}
    {label}
  </span>
);
