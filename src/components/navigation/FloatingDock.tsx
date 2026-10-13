import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Layers, Cpu, Compass, Mail, Award } from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'skills', label: 'Expertise', icon: Cpu },
  { id: 'journey', label: 'Journey', icon: Compass },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const FloatingDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scrollspy to detect currently active section
  useEffect(() => {
    const sectionIds = DOCK_ITEMS.map((item) => item.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const elem = document.getElementById(id);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      // Update browser hash cleanly without page jump
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  return (
    <nav
      aria-label="Floating navigation dock"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Dock Glass Pill */}
        <div className="relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full
          bg-[#121110]/85 dark:bg-[#0E0D0C]/90
          backdrop-blur-xl border border-white/10 dark:border-white/12
          shadow-[0_16px_40px_rgba(0,0,0,0.7),0_2px_10px_rgba(0,0,0,0.4)]
          transition-colors duration-300">

          {DOCK_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setHoveredItem(item.id)}
                onBlur={() => setHoveredItem(null)}
                className="relative flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-terracotta group"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Micro Tooltip Above Dock on Hover (Desktop) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="hidden sm:block absolute -top-9 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase
                        bg-[#1A1817]/95 text-[#F7F4EE] border border-white/10 shadow-lg pointer-events-none whitespace-nowrap z-50"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Subtle Active Pill Glow inside Dock */}
                {isActive && (
                  <motion.div
                    layoutId="dockActivePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-terracotta/20 dark:bg-terracotta/25 border border-terracotta/30"
                  />
                )}

                {/* Icon with Smooth Scale & Color State */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.12 : isHovered ? 1.08 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative z-10"
                >
                  <Icon
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-200 ${
                      isActive
                        ? 'text-terracotta drop-shadow-[0_0_8px_rgba(201,85,50,0.65)]'
                        : 'text-[#A19D95] hover:text-[#F7F4EE]'
                    }`}
                  />
                </motion.div>

                {/* ANIMATED ACTIVE INDICATOR BELOW THE DOCK (aligned with selected icon) */}
                {isActive && (
                  <motion.div
                    layoutId="dockActiveIndicatorBelow"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-30"
                  >
                    {/* Glowing Circular Highlight */}
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-terracotta to-[#DF6944]
                      shadow-[0_0_12px_#C95532,0_0_24px_rgba(201,85,50,0.7)]" />
                    {/* Subtle micro connector glow */}
                    <div className="w-1 h-1.5 bg-gradient-to-t from-terracotta to-transparent rounded-full -mt-0.5 opacity-80" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
