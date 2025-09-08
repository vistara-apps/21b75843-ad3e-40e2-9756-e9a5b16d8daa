'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-lg transition-all duration-200';
  
  const variants = {
    default: 'bg-surface border border-gray-200 shadow-card',
    glass: 'glass-card',
    elevated: 'bg-surface shadow-lg hover:shadow-xl border border-gray-100',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        onClick && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  );
}
