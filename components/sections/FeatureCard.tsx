import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: "emerald" | "teal" | "cyan";
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradient = "emerald",
  className = "",
}) => {
  const gradientClasses = {
    emerald: "from-emerald-50 to-teal-50 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-200/50",
    teal: "from-teal-50 to-cyan-50 border-teal-100 hover:border-teal-300 hover:shadow-teal-200/50",
    cyan: "from-cyan-50 to-blue-50 border-cyan-100 hover:border-cyan-300 hover:shadow-cyan-200/50",
  };

  const iconGradients = {
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/30",
    teal: "from-teal-500 to-cyan-600 shadow-teal-500/30",
    cyan: "from-cyan-500 to-blue-600 shadow-cyan-500/30",
  };

  return (
    <div className={`group feature-card bg-gradient-to-br ${gradientClasses[gradient]} ${className}`}>
      <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${iconGradients[gradient]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </div>
  );
};

