import React from 'react';

interface SignatureProps {
  className?: string;
  name?: string;
}

export const Signature: React.FC<SignatureProps> = ({
  className = '',
  name = 'Awesh Hussain',
}) => {
  return (
    <div className={`inline-flex flex-col select-none relative ${className}`}>
      <span className="font-signature text-3xl sm:text-4xl text-near-black/90 dark:text-ivory/90 tracking-wide transform -rotate-2 hover:rotate-0 transition-transform duration-300">
        {name}
      </span>
      {/* Editorial handwritten flourish underline stroke */}
      <svg
        viewBox="0 0 160 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 sm:w-40 h-auto -mt-2 text-terracotta opacity-85"
      >
        <path
          d="M 4 12 C 35 15, 80 5, 120 10 S 150 14, 156 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
