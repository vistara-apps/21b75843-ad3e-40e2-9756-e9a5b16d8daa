'use client';

import { cn } from '@/lib/utils';
import { type ReactNode, useState } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg',
    'active:scale-95 transform-gpu',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none',
    isPressed && !disabled && !loading && 'scale-95'
  );
  
  const variants = {
    primary: cn(
      'bg-primary text-white shadow-lg',
      'hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5',
      'active:bg-primary-700 active:shadow-md active:translate-y-0',
      'focus:ring-primary/20'
    ),
    secondary: cn(
      'bg-secondary-100 text-textPrimary',
      'hover:bg-secondary-200 hover:shadow-md hover:-translate-y-0.5',
      'active:bg-secondary-300 active:translate-y-0',
      'focus:ring-secondary/20'
    ),
    outline: cn(
      'border border-border text-textPrimary bg-surface',
      'hover:bg-surfaceSecondary hover:border-secondary-300 hover:shadow-md hover:-translate-y-0.5',
      'active:bg-secondary-100 active:translate-y-0',
      'focus:ring-primary/20'
    ),
    ghost: cn(
      'text-textPrimary',
      'hover:bg-secondary-50 hover:text-textPrimary',
      'active:bg-secondary-100',
      'focus:ring-primary/20'
    ),
    accent: cn(
      'bg-accent text-white shadow-lg',
      'hover:bg-accent-600 hover:shadow-xl hover:-translate-y-0.5',
      'active:bg-accent-700 active:shadow-md active:translate-y-0',
      'focus:ring-accent/20'
    ),
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg gap-2',
    md: 'px-6 py-3 text-base rounded-lg gap-2',
    lg: 'px-8 py-4 text-lg rounded-xl gap-3',
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span className={cn(loading && 'opacity-70')}>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}
