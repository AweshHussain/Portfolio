import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  forceShow?: boolean;
}

const GREETINGS = [
  { text: 'Hello', lang: 'English', fontClass: 'font-signature' },
  { text: 'नमस्ते', lang: 'Hindi', fontClass: 'font-sans font-medium' },
  { text: 'Bonjour', lang: 'French', fontClass: 'font-editorial italic' },
  { text: 'Hola', lang: 'Spanish', fontClass: 'font-signature' },
  { text: 'こんにちは', lang: 'Japanese', fontClass: 'font-sans' },
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, forceShow = false }) => {
  const [greetingIndex, setGreetingIndex] = useState<number>(0);
  const [stage, setStage] = useState<'handwriting' | 'mask-reveal'>('handwriting');
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && !forceShow) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // 1. Cycle through the 5 handwriting greetings at a relaxed, readable pace (480ms each = ~2.4s total)
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(greetingInterval);
          // Transition smoothly into the Mask Stage
          setTimeout(() => setStage('mask-reveal'), 250);
          return prev;
        }
      });
    }, 480);

    // 2. Trigger the continuous zoom-through after a comfortable beat to appreciate the name (3.1s in)
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 3100);

    // 3. Complete intro cleanly once zoom dissolves seamlessly into the live page
    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 4200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(zoomTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(onComplete, 200);
  };

  const currentGreeting = GREETINGS[greetingIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-intro-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden bg-transparent"
        >
          {/* Top Skip Button */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 z-50 pointer-events-auto">
            <button
              onClick={handleFinish}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E988F] hover:text-[#C96D4F] transition-colors py-1.5 px-3 rounded border border-white/10 hover:border-[#C96D4F]/40 cursor-pointer bg-[#121110]/85 backdrop-blur-sm shadow-lg"
              title="Skip intro (Press ESC)"
            >
              <span>Skip</span>
              <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* SVG TEXT MASK LAYER */}
          <div className="absolute inset-0 w-full h-full">
            <svg
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full"
            >
              <defs>
                <mask id="aweshTextMask">
                  {/* Solid white = dark overlay is visible */}
                  <rect width="100%" height="100%" fill="white" />

                  {/* Black cutout text = transparent window showing the real landing page inside! */}
                  <motion.g
                    initial={{ scale: 1 }}
                    animate={
                      isZooming
                        ? {
                            scale: isMobile ? 42 : 36,
                          }
                        : {
                            scale: 1,
                          }
                    }
                    transition={
                      isZooming
                        ? { duration: 1.05, ease: [0.16, 1, 0.3, 1] }
                        : { duration: 0.25, ease: 'easeOut' }
                    }
                    style={{
                      transformOrigin: '960px 540px',
                    }}
                  >
                    {isMobile ? (
                      <>
                        <text
                          x="960"
                          y="460"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="black"
                          fontSize="155"
                          fontFamily="'Bebas Neue', Anton, sans-serif"
                          letterSpacing="8"
                          fontWeight="900"
                        >
                          AWESH
                        </text>
                        <text
                          x="960"
                          y="620"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="black"
                          fontSize="155"
                          fontFamily="'Bebas Neue', Anton, sans-serif"
                          letterSpacing="8"
                          fontWeight="900"
                        >
                          HUSSAIN
                        </text>
                      </>
                    ) : (
                      <text
                        x="960"
                        y="540"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="black"
                        fontSize="140"
                        fontFamily="'Bebas Neue', Anton, sans-serif"
                        letterSpacing="10"
                        fontWeight="900"
                      >
                        AWESH HUSSAIN
                      </text>
                    )}
                  </motion.g>

                  {/* Expanding aperture circle in the mask:
                      Punches through the center space between words so NO black box ever appears! */}
                  <motion.circle
                    cx="960"
                    cy="540"
                    fill="black"
                    initial={{ r: 0 }}
                    animate={isZooming ? { r: 2500 } : { r: 0 }}
                    transition={
                      isZooming
                        ? { duration: 1.0, delay: 0.08, ease: [0.22, 1, 0.36, 1] }
                        : { duration: 0.15 }
                    }
                  />
                </mask>
              </defs>

              {/* Dark canvas with transparent cutout & smooth opacity fadeout during zoom */}
              <motion.rect
                width="100%"
                height="100%"
                fill="#0B0B0C"
                mask="url(#aweshTextMask)"
                animate={
                  isZooming
                    ? { opacity: [1, 1, 0] }
                    : { opacity: 1 }
                }
                transition={
                  isZooming
                    ? { duration: 1.0, times: [0, 0.5, 1], ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
              />

              {/* Subtle terracotta edge outline before zoom for extra editorial definition */}
              <motion.g
                initial={{ scale: 1, opacity: 0.8 }}
                animate={
                  isZooming
                    ? { scale: isMobile ? 42 : 36, opacity: 0 }
                    : { scale: 1, opacity: 0.8 }
                }
                transition={
                  isZooming
                    ? { duration: 0.7, ease: 'easeOut' }
                    : { duration: 0.3 }
                }
                style={{
                  transformOrigin: '960px 540px',
                }}
              >
                {isMobile ? (
                  <>
                    <text
                      x="960"
                      y="460"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="none"
                      stroke="rgba(201, 109, 79, 0.35)"
                      strokeWidth="1.5"
                      fontSize="155"
                      fontFamily="'Bebas Neue', Anton, sans-serif"
                      letterSpacing="8"
                      fontWeight="900"
                    >
                      AWESH
                    </text>
                    <text
                      x="960"
                      y="620"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="none"
                      stroke="rgba(201, 109, 79, 0.35)"
                      strokeWidth="1.5"
                      fontSize="155"
                      fontFamily="'Bebas Neue', Anton, sans-serif"
                      letterSpacing="8"
                      fontWeight="900"
                    >
                      HUSSAIN
                    </text>
                  </>
                ) : (
                  <text
                    x="960"
                    y="540"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="none"
                    stroke="rgba(201, 109, 79, 0.35)"
                    strokeWidth="1.5"
                    fontSize="140"
                    fontFamily="'Bebas Neue', Anton, sans-serif"
                    letterSpacing="10"
                    fontWeight="900"
                  >
                    AWESH HUSSAIN
                  </text>
                )}
              </motion.g>
            </svg>

            {/* Editorial labels during mask reveal before zooming */}
            {stage === 'mask-reveal' && !isZooming && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-0 bottom-14 md:bottom-20 text-center flex flex-col items-center gap-2"
              >
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C96D4F] font-bold">
                  AI & DATA SCIENCE STUDENT
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736D]">
                  PORTFOLIO EXPERIENCE
                </span>
              </motion.div>
            )}
          </div>

          {/* STAGE 1: Solid Dark Handwriting Curtain */}
          <AnimatePresence>
            {stage === 'handwriting' && (
              <motion.div
                key="handwriting-curtain"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#0B0B0C] text-[#F7F4EE] flex flex-col justify-between p-8 md:p-16 pointer-events-auto"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C96D4F] animate-ping" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#9E988F]">
                    STARTUP SEQUENCE
                  </span>
                </div>

                {/* Multilingual Handwriting Greeting */}
                <div className="max-w-4xl mx-auto w-full my-auto text-center space-y-4">
                  <div className="relative inline-block px-8 py-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGreeting.text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="relative flex items-center justify-center"
                      >
                        {/* Handwriting Stroke Animation */}
                        <motion.h2
                          initial={{ clipPath: 'inset(0 100% 0 0)' }}
                          animate={{ clipPath: 'inset(0 0% 0 0)' }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className={`${currentGreeting.fontClass} text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F7F4EE] tracking-wide select-none drop-shadow-lg`}
                        >
                          {currentGreeting.text}
                        </motion.h2>

                        {/* Glowing Terracotta Ink Tip */}
                        <motion.span
                          initial={{ left: '0%', opacity: 1 }}
                          animate={{ left: '100%', opacity: [1, 1, 0] }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#C96D4F] shadow-[0_0_12px_#C96D4F] pointer-events-none"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.div
                    key={currentGreeting.lang}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C96D4F]"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{currentGreeting.lang}</span>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#77736D]">
                  <span>INTELLIGENT SYSTEMS</span>
                  <span>2026</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
