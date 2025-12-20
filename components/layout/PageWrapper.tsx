import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageWrapper - Consistent page layout wrapper
 * Use this to ensure all pages have the same structure and styling
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col min-h-screen bg-white ${className}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

