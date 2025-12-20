/**
 * Design System Configuration
 * Centralized design tokens and utilities for consistent styling across the app
 */

export const designSystem = {
  colors: {
    primary: {
      light: "emerald-50",
      DEFAULT: "emerald-500",
      dark: "emerald-600",
      gradient: "from-emerald-500 to-teal-600",
    },
    secondary: {
      light: "teal-50",
      DEFAULT: "teal-500",
      dark: "teal-600",
      gradient: "from-teal-500 to-cyan-600",
    },
    accent: {
      light: "amber-50",
      DEFAULT: "amber-400",
      dark: "amber-500",
      gradient: "from-yellow-300 via-amber-300 to-orange-300",
    },
  },
  spacing: {
    section: {
      mobile: "py-24",
      desktop: "md:py-36",
    },
    container: {
      mobile: "px-6 sm:px-8",
      desktop: "lg:px-10",
    },
  },
  typography: {
    heading: {
      hero: "font-display text-6xl md:text-7xl lg:text-8xl font-bold",
      section: "font-display text-5xl md:text-6xl font-bold",
      card: "font-display text-2xl font-bold",
    },
    body: {
      large: "text-xl md:text-2xl",
      base: "text-base",
      small: "text-sm",
    },
  },
  effects: {
    cardHover: "hover:shadow-2xl hover:-translate-y-3 transition-all duration-300",
    buttonHover: "hover:scale-105 hover:-translate-y-1 transition-all duration-300",
    iconHover: "group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
  },
} as const;

/**
 * Get gradient classes for different color schemes
 */
export const getGradient = (type: "hero" | "section" | "card" | "dark") => {
  const gradients = {
    hero: "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600",
    section: "bg-gradient-to-b from-white to-emerald-50/30",
    card: "bg-gradient-to-br from-emerald-50 to-teal-50",
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
  };
  return gradients[type];
};

/**
 * Get section container classes
 */
export const getSectionContainer = () => {
  return "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10";
};

/**
 * Get section spacing classes
 */
export const getSectionSpacing = () => {
  return "py-28 md:py-36";
};

