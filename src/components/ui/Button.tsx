import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'clay';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta disabled:opacity-50 disabled:pointer-events-none tracking-wider uppercase text-xs';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
  };

  const variantStyles = {
    primary:
      'bg-terracotta text-white hover:bg-terracotta-dark shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border border-near-black/20 dark:border-ivory/20 text-near-black dark:text-ivory hover:border-terracotta hover:text-terracotta bg-transparent',
    ghost:
      'text-near-black dark:text-ivory hover:text-terracotta hover:bg-terracotta/10 bg-transparent',
    clay:
      'clay-circle text-white font-semibold shadow-clay hover:scale-105 active:scale-95',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asLink && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedStyles}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};
