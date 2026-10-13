import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail } from 'lucide-react';
import { profileConfig } from '../../config/profile';
import { ThemeToggle } from '../ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-4/5 max-w-sm h-full bg-ivory dark:bg-charcoal-900 border-l border-editorial p-6 sm:p-8 flex flex-col justify-between z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-editorial pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                <span className="font-display text-base font-extrabold uppercase tracking-[0.04em] whitespace-nowrap text-near-black dark:text-[#F7F4EE]">
                  {profileConfig.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-editorial hover:border-terracotta text-near-black dark:text-ivory"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="py-8 space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted">
                NAVIGATION
              </span>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={onClose}
                      className={`font-editorial text-2xl sm:text-3xl font-bold uppercase transition-colors flex items-center justify-between py-1 border-b border-editorial/40 ${
                        isActive
                          ? 'text-terracotta'
                          : 'text-near-black dark:text-ivory hover:text-terracotta'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="text-xs font-mono text-terracotta tracking-widest font-normal">
                          ● ACTIVE
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="space-y-4 pt-6 border-t border-editorial">

              <div className="flex items-center justify-center gap-4 text-muted pt-2">
                <a
                  href={profileConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-terracotta transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-terracotta transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profileConfig.email}`}
                  className="p-2 hover:text-terracotta transition-colors"
                  aria-label="Email Awesh Hussain"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
