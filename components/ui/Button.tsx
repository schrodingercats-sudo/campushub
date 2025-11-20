import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark' | 'pill';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 transition-all duration-300 font-medium text-sm uppercase tracking-wider";
  
  const variants = {
    primary: "bg-pinnacle-green text-white hover:bg-green-600 rounded-full",
    outline: "border-2 border-pinnacle-dark text-pinnacle-dark hover:bg-pinnacle-dark hover:text-white rounded-full",
    dark: "bg-pinnacle-dark text-white hover:bg-gray-900 rounded-full",
    pill: "bg-black text-white rounded-full px-8 py-4 hover:scale-105 active:scale-95 shadow-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
};