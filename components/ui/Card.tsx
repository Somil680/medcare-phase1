import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hover = false,
}) => {
  const baseStyles =
    "bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-6";

  const hoverStyles = hover
    ? "transition-all duration-300 hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1 cursor-pointer"
    : "";

  const clickStyles = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

