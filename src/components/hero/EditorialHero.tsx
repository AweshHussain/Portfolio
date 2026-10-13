import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profileConfig } from '../../config/profile';
import { AvailabilityBadge } from './AvailabilityBadge';
import { ParticleMesh } from './ParticleMesh';
import { HeroTypewriter } from './HeroTypewriter';

interface EditorialHeroProps {
  onScrollToNext?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onScrollToNext }) => {
  const [imgError, setImgError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative z-10 min-h-[100svh] lg:min-h-screen bg-ivory-100 dark:bg-[#0C0B0A] text-near-black dark:text-[#F7F4EE] overflow-hidden flex flex-col justify-between px-0 pt-20 sm:pt-24 lg:pt-28 pb-3 sm:pb-5 lg:pb-8 transition-colors duration-500 select-none"
    >
      {/* LAYER z-0 — CURSOR-RESPONSIVE PARTICLE MESH */}
      <ParticleMesh />

      {/* LAYER z-[1] — SOFT BURGUNDY SIDE LIGHTING (DARK THEME) */}
      <div
        aria-hidden="true"
        className="hidden dark:block absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden"
      >
        {/* Left Side Burgundy Wash — tall atmospheric glow emanating from left flank */}
        <div
          className="hero-burgundy-glow-left absolute inset-y-0 left-0 w-[30%] sm:w-[26%] lg:w-[23%] xl:w-[21%] 2xl:w-[20%] pointer-events-none"
        />

        {/* Right Side Burgundy Wash — tall atmospheric glow emanating from right flank */}
        <div
          className="hero-burgundy-glow-right absolute inset-y-0 right-0 w-[30%] sm:w-[26%] lg:w-[23%] xl:w-[21%] 2xl:w-[20%] pointer-events-none"
        />
      </div>

      {/* VERTICAL EDGE LABELS — desktop only, fixed */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-12 z-20 pointer-events-none">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-mono text-muted dark:text-[#7E7A73]">
          PHOTOGRAPHY
        </span>
        <div className="w-[1px] h-12 bg-editorial dark:bg-white/10" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-mono text-muted dark:text-[#7E7A73]">
          VIDEOGRAPHY
        </span>
      </div>
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-12 z-20 pointer-events-none">
        <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] font-mono text-muted dark:text-[#7E7A73]">
          GAMING
        </span>
        <div className="w-[1px] h-12 bg-editorial dark:bg-white/10" />
        <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] font-mono text-muted dark:text-[#7E7A73]">
          CREATIVE WORK
        </span>
      </div>

      {/* Accessible heading */}
      <h1 className="sr-only">Awesh Hussain</h1>

      {/* ─── DESKTOP FULL-BLEED COMPOSITION STAGE (lg+) ─── */}
      <div className="hidden lg:block relative flex-1 w-full overflow-hidden min-h-[760px] xl:min-h-[820px]">
        {/* TOP ANIMATED TYPEWRITER HEADLINE (24–32px semibold, cycling phrases) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="absolute top-1 xl:top-2 inset-x-0 flex justify-center z-40 pointer-events-none"
        >
          <div className="h-12 xl:h-14 flex items-center justify-center">
            <HeroTypewriter className="text-3xl lg:text-[38px] xl:text-[44px] tracking-tight" />
          </div>
        </motion.div>

        {/* LAYER z-10 — TERRACOTTA SUN SPHERE */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[11.5%] xl:top-[12.5%] z-10 pointer-events-none select-none">
          <motion.div
            animate={{ x: mousePos.x * -14, y: mousePos.y * -14 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="editorial-terracotta-sun rounded-full
              lg:w-[556px] lg:h-[556px]
              xl:w-[624px] xl:h-[624px]"
          />
        </div>

        {/* LAYER z-20 — LEFT COLUMN: HELLO, I'M + AWESH + INTRO & CTA */}
        {/* Right edge of AWESH ("H") sits just at the outer left edge of the circle */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: mousePos.x * 8, y: mousePos.y * 6 }}
          transition={{
            opacity: { duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
            x: { type: 'spring', stiffness: 85, damping: 22 },
            y: { type: 'spring', stiffness: 85, damping: 22 },
          }}
          className="absolute right-[calc(50%+230px)] lg:right-[calc(50%+250px)] xl:right-[calc(50%+280px)] 2xl:right-[calc(50%+300px)]
            top-[20%] lg:top-[21%] xl:top-[22%] z-40 text-left pointer-events-auto flex flex-col items-start w-max"
        >
          {/* HELLO, I'M editorial label (prominent, matching reference mockup) */}
          <div className="flex items-center gap-3.5 mb-2 sm:mb-2.5">
            <span className="w-10 lg:w-12 h-[2.5px] bg-terracotta flex-shrink-0" />
            <p className="text-sm sm:text-[15px] lg:text-base xl:text-[17px] font-mono tracking-[0.28em] lg:tracking-[0.32em] uppercase font-bold text-terracotta">
              HELLO, I'M
            </p>
          </div>

          {/* 3D AWESH Typography — right edge ("H") ends just at outer left edge of circle */}
          <div className="select-none pointer-events-none mb-5 sm:mb-6 lg:mb-7" aria-hidden="true">
            <span className="editorial-3d-name block uppercase whitespace-nowrap leading-[0.88] tracking-tight text-[7vw] lg:text-[7.5vw] xl:text-[8vw] 2xl:text-[118px]">
              AWESH
            </span>
          </div>

          {/* Title Subtitle (scaled up) */}
          <p className="text-sm sm:text-[15px] lg:text-base xl:text-[17px] font-display tracking-[0.08em] uppercase font-extrabold text-terracotta mb-3 leading-snug">
            AI/DS &amp; MACHINE LEARNING STUDENT
          </p>

          {/* Biography text — 3 lines with clean, increased vertical separation */}
          <div className="font-sans text-[13.5px] sm:text-sm lg:text-[15px] xl:text-[15.5px] leading-relaxed text-near-black/90 dark:text-[#D1CCC2] mb-5 sm:mb-6 whitespace-nowrap space-y-2 lg:space-y-2.5">
            <p>3rd-Year B.Tech CSE (AI/DS) Undergraduate</p>
            <p>Specializing in Data Science, ML, DL, and</p>
            <p>have experience in full-stack web development.</p>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3 pointer-events-auto">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-terracotta/40 bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white font-mono text-xs sm:text-[13px] lg:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-sm hover:shadow-terracotta/25"
            >
              <span>EXPLORE PROJECTS</span>
              <span className="text-sm transition-transform group-hover:translate-x-1.5">→</span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-editorial dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] hover:border-terracotta hover:bg-terracotta/10 text-near-black dark:text-[#E8E4DC] hover:text-terracotta font-mono text-xs sm:text-[13px] lg:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-sm hover:shadow-terracotta/20"
            >
              <span>LET'S CONNECT</span>
              <span className="text-sm transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </div>
        </motion.div>

        {/* LAYER z-20 — HUSSAIN: starts just at the outer right edge of the circle */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: mousePos.x * 12, y: mousePos.y * 10 }}
          transition={{
            opacity: { duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] },
            x: { type: 'spring', stiffness: 85, damping: 22 },
            y: { type: 'spring', stiffness: 85, damping: 22 },
          }}
          className="absolute z-20 pointer-events-none select-none
            left-[calc(50%+230px)] lg:left-[calc(50%+250px)] xl:left-[calc(50%+280px)] 2xl:left-[calc(50%+300px)]
            top-[46%] xl:top-[48%] -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="editorial-3d-name block uppercase whitespace-nowrap leading-[0.88] tracking-tight
            text-[6.5vw] lg:text-[7vw] xl:text-[7.5vw] 2xl:text-[112px]">
            HUSSAIN
          </span>
        </motion.div>

        {/* LAYER z-30 — PORTRAIT, centered, in the foreground */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: mousePos.x * 8 }}
          transition={{
            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            x: { type: 'spring', stiffness: 85, damping: 22 },
          }}
          className="absolute inset-x-0 bottom-0 z-30 flex justify-center items-end pointer-events-none"
        >
          <img
            src={imgError ? '/assets/portrait.png' : '/assets/portrait-cutout.png'}
            alt={profileConfig.name}
            onError={() => setImgError(true)}
            className="w-auto object-contain object-bottom select-none
              lg:h-[84vh] xl:h-[89vh] max-h-[860px]
              filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.9)]
              dark:drop-shadow-[0_20px_42px_rgba(0,0,0,0.97)]"
          />
        </motion.div>

        {/* BOTTOM TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="absolute bottom-5 inset-x-0 text-center z-40 pointer-events-none
            font-mono text-[11px] uppercase tracking-[0.38em] text-muted dark:text-[#7A766F]"
        >
          BUILDING INTELLIGENT SYSTEMS
        </motion.p>

        {/* LAYER z-40 — AVAILABILITY STAMP, bottom-right */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
          className="absolute right-8 lg:right-12 xl:right-16 bottom-8 xl:bottom-12 z-40 pointer-events-auto"
        >
          <AvailabilityBadge />
        </motion.div>
      </div>

      {/* ─── MOBILE DEDICATED COMPOSITION (< lg) ─── */}
      <div className="lg:hidden flex flex-col items-center flex-1 w-full relative z-20 px-3 sm:px-6">
        {/* Zone 1: Animated Typewriter Headline */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-1 pb-1 text-center pointer-events-none w-full flex justify-center items-center min-h-[44px]"
        >
          <HeroTypewriter className="text-xl xs:text-2xl sm:text-3xl tracking-tight" />
        </motion.div>

        {/* Zone 2: HELLO, I'M Label (Directly before AWESH) */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex items-center justify-center gap-2.5 pt-1 pb-0.5 z-20 pointer-events-none select-none"
        >
          <span className="w-6 sm:w-8 h-[2px] bg-terracotta flex-shrink-0" />
          <p className="text-xs sm:text-sm font-mono tracking-[0.26em] uppercase font-bold text-terracotta">
            HELLO, I'M
          </p>
        </motion.div>

        {/* Zone 3: AWESH (Centered directly above portrait and circle) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full flex justify-center items-center pointer-events-none select-none pt-0.5 pb-1 z-20"
          aria-hidden="true"
        >
          <span className="editorial-3d-name block uppercase whitespace-nowrap leading-[0.88] tracking-tight text-[11vw] xs:text-[10vw] sm:text-[8vw] md:text-[6.5vw] text-center">
            AWESH
          </span>
        </motion.div>

        {/* Zone 4: Main Visual Composition Stage (Terracotta Circle + Portrait, increased by ~6-7%) */}
        <div className="relative w-full h-[288px] xs:h-[322px] sm:h-[372px] md:h-[415px] flex items-end justify-center select-none my-1">
          {/* Terracotta Sun Sphere behind portrait with glowing edge */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[2%] sm:top-[1%] z-10 pointer-events-none select-none">
            <motion.div
              animate={{ x: mousePos.x * -8, y: mousePos.y * -8 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              className="editorial-terracotta-sun rounded-full
                w-[196px] h-[196px]
                xs:w-[218px] xs:h-[218px]
                sm:w-[265px] sm:h-[265px]
                md:w-[308px] md:h-[308px]"
            />
          </div>

          {/* Centered Transparent Portrait Cutout in foreground (preserved original proportions, no frame) */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 z-30 flex justify-center items-end pointer-events-none"
          >
            <img
              src={imgError ? '/assets/portrait.png' : '/assets/portrait-cutout.png'}
              alt={profileConfig.name}
              onError={() => setImgError(true)}
              className="w-auto object-contain object-bottom select-none
                h-[272px] xs:h-[305px] sm:h-[355px] md:h-[398px]
                filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.92)]
                dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.98)]"
            />
          </motion.div>
        </div>

        {/* Zone 5: HUSSAIN (Centered directly below portrait, unobstructed) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full flex justify-center items-center pointer-events-none select-none pt-1 pb-1.5 z-20"
          aria-hidden="true"
        >
          <span className="editorial-3d-name block uppercase whitespace-nowrap leading-[0.88] tracking-tight text-[10vw] xs:text-[9.2vw] sm:text-[7.4vw] md:text-[6vw] text-center">
            HUSSAIN
          </span>
        </motion.div>

        {/* Zone 6: Student Title, Biography & CTA Buttons */}
        <div className="flex flex-col items-center text-center px-4 pt-2 pb-4 z-40 max-w-md mx-auto space-y-3">
          <p className="text-sm sm:text-base font-display tracking-[0.08em] uppercase font-extrabold text-terracotta leading-snug">
            AI/DS &amp; MACHINE LEARNING STUDENT
          </p>
          <div className="font-sans text-[13px] sm:text-sm leading-relaxed text-near-black/90 dark:text-[#D1CCC2] max-w-[340px] space-y-1 sm:space-y-1.5">
            <p>3rd-Year B.Tech CSE (AI/DS) Undergraduate</p>
            <p>Specializing in Data Science, ML, DL, and</p>
            <p>have experience in full-stack web development.</p>
          </div>
          <div className="flex flex-col items-center gap-2.5 pt-1 pointer-events-auto w-full max-w-[280px] xs:max-w-[300px]">
            <a
              href="#projects"
              className="w-full justify-center group inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-terracotta/40 bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white text-xs sm:text-[13px] font-mono uppercase tracking-widest font-bold transition-all duration-300 shadow-md text-center"
            >
              <span>EXPLORE PROJECTS</span>
              <span className="text-sm transition-transform group-hover:translate-x-1.5">→</span>
            </a>
            <a
              href="#contact"
              className="w-full justify-center group inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-editorial dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] hover:border-terracotta hover:bg-terracotta/10 text-near-black dark:text-[#E8E4DC] hover:text-terracotta text-xs sm:text-[13px] font-mono uppercase tracking-widest font-bold transition-all duration-300 shadow-sm text-center"
            >
              <span>LET'S CONNECT</span>
              <span className="text-sm transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-muted dark:text-[#7A766F] pt-0.5">
            BUILDING INTELLIGENT SYSTEMS
          </p>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full border-t border-editorial px-4 sm:px-8 md:px-14 lg:px-20 py-2.5 sm:py-3 lg:py-4
          flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2.5 sm:gap-4 z-40"
      >
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">SCROLL TO EXPLORE</span>
          <div className="w-6 sm:w-8 h-[1px] bg-editorial" />
        </div>
        <button
          onClick={onScrollToNext}
          className="group flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest hover:text-terracotta transition-colors py-0.5"
          title="Scroll to About & Projects"
        >
          <span>DISCOVER WORK</span>
          <ArrowDown className="w-3.5 h-3.5 text-terracotta animate-bounce" />
        </button>
        <div className="font-mono text-[10px] sm:text-[11px] text-muted text-center">
          BASED IN INDIA • OPEN WORLDWIDE
        </div>
      </motion.div>
    </section>
  );
};
