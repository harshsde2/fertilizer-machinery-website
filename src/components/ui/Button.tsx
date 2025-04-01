"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "font-medium rounded-md transition-all duration-300 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    outline: "bg-transparent border border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100",
  };
  
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={buttonStyles}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button; 