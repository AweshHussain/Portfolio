import React, { useEffect, useState } from 'react';

interface FixedLightTrailsProps {
  forceVisible?: boolean;
}

export const FixedLightTrails: React.FC<FixedLightTrailsProps> = ({ forceVisible = false }) => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) {
      setIsScrolledPastHero(true);
      return;
    }

    const checkScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Visible as soon as user begins scrolling down past the top of the hero into About and other sections
        const isAtHeroTop = heroRect.bottom > window.innerHeight * 0.45 && window.scrollY < 100;
        setIsScrolledPastHero(!isAtHeroTop);
      } else {
        // When there is no hero section on the page (e.g. Project Archive), show light trails immediately from top
        setIsScrolledPastHero(true);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [forceVisible]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden transition-opacity duration-700 ease-out ${
        isScrolledPastHero ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ─── BASE STATIC LIGHT-TRAIL IMAGE (No animation, fixed across all sections) ─── */}
      <img
        src="/assets/about-light-trails.png"
        alt=""
        className="w-full h-full object-cover object-left md:object-center opacity-[0.12] dark:opacity-85 mix-blend-multiply dark:mix-blend-screen select-none"
      />

      {/* ─── RESTRAINED AMBIENT GRADIENTS & EDGE VIGNETTES ─── */}
      {/* Left/Right Edge blending to prevent harsh image seams */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-transparent to-ivory/85 dark:from-[#0C0B0A]/80 dark:via-transparent dark:to-[#0C0B0A]/85 pointer-events-none" />

      {/* Top and Bottom soft fades to transition seamlessly */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ivory dark:from-[#0C0B0A] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory dark:from-[#0C0B0A] to-transparent pointer-events-none" />

      {/* Center text protection vignette: active in dark mode to keep light mode bright & airy */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block opacity-60 bg-[radial-gradient(ellipse_at_65%_50%,rgba(12,11,10,0.8)_0%,transparent_75%)]" />
    </div>
  );
};
