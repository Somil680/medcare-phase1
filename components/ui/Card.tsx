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
    "bg-white rounded-xl shadow-sm border border-gray-100 p-6";

  const hoverStyles = hover
    ? "transition-all duration-200 hover:shadow-md hover:border-primary-200 cursor-pointer"
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

