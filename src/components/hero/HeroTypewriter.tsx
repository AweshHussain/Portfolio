import React, { useState, useEffect } from 'react';

const PHRASES = [
  'Machine Learning',
  'Data Science',
  'Full Stack Developer',
  'UI/UX Designer',
  'Photographer',
  'Videographer',
];

interface HeroTypewriterProps {
  className?: string;
}

export const HeroTypewriter: React.FC<HeroTypewriterProps> = ({ className = '' }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect user's reduced motion accessibility preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Typewriter typing & erasing loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(PHRASES[0]);
      return;
    }

    const currentPhrase = PHRASES[phraseIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase: type progressively one character at a time
      if (displayedText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        // Complete phrase: pause for approx 1.4 seconds before deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 1400);
      }
    } else {
      // Deleting phase: progressively erase character by character
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        // Deletion complete: pause briefly (~350ms) before typing next phrase in cycle
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
        }, 350);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex, prefersReducedMotion]);

  return (
    <div
      className={`inline-flex items-center justify-center font-display font-bold select-none ${className}`}
      aria-label="Roles: Machine Learning, Data Science, Full Stack Developer, UI/UX Designer, Photographer, Videographer"
    >
      <span className="text-near-black dark:text-[#F7F4EE] transition-colors duration-300">
        {displayedText}
      </span>
      {!prefersReducedMotion && (
        <span
          className="inline-block ml-1.5 w-[3px] lg:w-[3.5px] h-[0.9em] bg-terracotta rounded-full animate-typewriter-cursor flex-shrink-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
