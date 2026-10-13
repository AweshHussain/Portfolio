import React from 'react';

interface AvailabilityBadgeProps {
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ className = '' }) => {
  return (
    <a
      href="#contact"
      className={`group relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center select-none pointer-events-auto transition-transform duration-300 hover:scale-105 ${className}`}
      title="Open for projects (Click to contact)"
    >
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Path with radius = 53 for outer rotating text (circumference ~333px) */}
          <path
            id="badgeCirclePath"
            d="M 70,70 m -53,0 a 53,53 0 1,1 106,0 a 53,53 0 1,1 -106,0"
            fill="none"
          />
        </defs>

        {/* Outer Rotating Text Ring - cleanly positioned outside the inner core */}
        <g className="animate-spin-slow origin-center">
          <text
            fill="#A19D95"
            fontSize="8"
            fontFamily="'Inter', system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="2"
            textLength="328"
            lengthAdjust="spacing"
            className="group-hover:fill-terracotta transition-colors duration-300"
          >
            <textPath href="#badgeCirclePath" startOffset="0%">
              • AVAILABLE FOR WORK • OPEN FOR PROJECTS •
            </textPath>
          </text>
        </g>

        {/* Inner Editorial Core Circle (Radius = 36, safe 17px buffer from text ring) */}
        <circle
          cx="70"
          cy="70"
          r="36"
          fill="#161514"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="1"
          className="group-hover:stroke-terracotta/40 transition-colors duration-300"
        />

        {/* Terracotta pulsing dot */}
        <circle
          cx="70"
          cy="54"
          r="2.5"
          fill="#E07A5F"
        />

        {/* Upright Center Text Hierarchy */}
        <text
          x="70"
          y="68"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E07A5F"
          fontSize="8.5"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="1"
        >
          OPEN FOR
        </text>
        <text
          x="70"
          y="80"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E07A5F"
          fontSize="8.5"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="1"
        >
          PROJECTS
        </text>
      </svg>
    </a>
  );
};
