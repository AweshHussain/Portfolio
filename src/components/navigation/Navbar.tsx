import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { profileConfig } from '../../config/profile';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scrollspy & Scrolled State
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'certificates', 'skills', 'leadership', 'journey', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 240;
      for (const id of sectionIds) {
        const elem = document.getElementById(id);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Expertise', href: '#skills', id: 'skills' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory-100/95 dark:bg-[#0E0D0C]/90 backdrop-blur-md border-b border-editorial dark:border-white/10 py-4 sm:py-5 shadow-sm dark:shadow-2xl'
            : 'bg-transparent py-5 sm:py-6 lg:py-7'
        }`}
      >
        {/* Sleek Scroll Progress Bar at very top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-terracotta origin-left z-50 pointer-events-none"
          style={{ scaleX }}
        />

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
          {/* Brand Name (Geometric Studio Style — strictly single line) */}
          <a
            href="#hero"
            className="flex items-center flex-shrink-0 whitespace-nowrap select-none group focus-visible:outline-none mr-6 lg:mr-10 xl:mr-14"
          >
            <span className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-[0.04em] uppercase whitespace-nowrap inline-block text-near-black dark:text-[#F7F4EE] group-hover:text-terracotta transition-colors">
              {profileConfig.name}
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-7 text-xs lg:text-[13px] font-mono uppercase tracking-[0.12em] text-muted dark:text-[#A19D95] ml-3 lg:ml-6 xl:ml-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1.5 transition-colors ${
                    isActive
                      ? 'text-terracotta font-bold'
                      : 'hover:text-terracotta'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-terracotta rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Controls (Generous gap from Contact nav link) */}
          <div className="flex items-center gap-3.5 sm:gap-5 ml-8 lg:ml-14 xl:ml-20 flex-shrink-0">
            {/* Available for opportunities badge */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-muted dark:text-[#A19D95] hover:text-terracotta transition-colors py-2 px-3.5 xl:px-4 rounded-full border border-editorial dark:border-white/10 hover:border-terracotta/40 bg-black/[0.03] dark:bg-white/[0.03] group whitespace-nowrap"
              title="Available for opportunities"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="hidden xl:inline">Available for opportunities</span>
              <span className="inline xl:hidden">Available for opportunities</span>
              <span className="text-terracotta transition-transform group-hover:translate-x-0.5">→</span>
            </a>

            <ThemeToggle className="p-2.5" />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl border border-editorial dark:border-white/15 text-near-black dark:text-[#F7F4EE] hover:border-terracotta transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
};
