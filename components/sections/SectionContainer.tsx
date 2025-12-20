import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "light" | "gradient" | "dark";
  spacing?: "sm" | "md" | "lg";
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
  background = "white",
  spacing = "md",
}) => {
  const backgroundClasses = {
    white: "bg-white",
    light: "bg-gradient-to-b from-white to-emerald-50/30",
    gradient: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
  };

  const spacingClasses = {
    sm: "py-16 md:py-20",
    md: "py-28 md:py-36",
    lg: "py-32 md:py-40",
  };

  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

