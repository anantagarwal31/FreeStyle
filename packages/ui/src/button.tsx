"use client";

import { ReactNode } from "react";

interface ButtonProps {
  size: "lg" | "sm",
  variant: "primary" | "secondary" | "outline",
  className?: string,
  onClick?: () => void,
  children: ReactNode
}

export const Button = ({ size, variant, className, onClick, children }: ButtonProps) => {
  return (
    <button
      className={`${className}
        ${variant === "primary" ? "bg-primary" : variant == "secondary" ? "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"}
        ${size === "lg" ? "px-4 py-2" : "px-2 py-1"}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
