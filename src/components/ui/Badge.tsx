import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'neutral' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded-full';

  const variantStyles = {
    terracotta:
      'bg-terracotta/10 text-terracotta border border-terracotta/20',
    neutral:
      'bg-ivory-200 dark:bg-charcoal-700 text-near-black/80 dark:text-ivory/80 border border-border-subtle',
    outline:
      'border border-border-subtle text-muted',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
      )}
      {children}
    </span>
  );
};
