import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Award, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { LeadershipActivity } from '../../types';

interface LeadershipModalProps {
  activity: LeadershipActivity | null;
  onClose: () => void;
}

export const LeadershipModal: React.FC<LeadershipModalProps> = ({ activity, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (activity) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activity, onClose]);

  if (!activity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ivory-100 dark:bg-[#141312] border border-editorial dark:border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 z-10 text-near-black dark:text-[#F7F4EE]"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-editorial dark:border-white/10 pb-5">
            <div className="flex items-start gap-4 sm:gap-5">
              {(activity.image || activity.logo) && (
                <div
                  className={`flex items-center justify-center shadow-xl flex-shrink-0 overflow-hidden ${
                    activity.id === 'technika-fest'
                      ? 'w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#080B14] border-2 border-amber-400/40 p-1 shadow-amber-500/20'
                      : activity.id === 'hack-horizon'
                      ? 'w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#080C17] border-2 border-blue-500/40 p-1 shadow-blue-500/20'
                      : activity.id === 'code-compute-society'
                      ? 'w-24 h-14 sm:w-32 sm:h-16 rounded-2xl bg-white dark:bg-[#1E1412] border-2 border-terracotta/40 p-2 shadow-terracotta/20'
                      : 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-[#1C1B19] border border-editorial dark:border-white/10 p-1.5'
                  }`}
                >
                  <img
                    src={activity.image || activity.logo}
                    alt={activity.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-terracotta px-2.5 py-0.5 rounded-full border border-terracotta/30 bg-terracotta/10">
                    {activity.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-muted dark:text-[#A19D95]">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" />
                    {activity.period}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE] uppercase tracking-tight">
                  {activity.title}
                </h3>

                <p className="text-sm font-sans font-semibold text-terracotta">
                  {activity.role}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-editorial dark:border-white/10 hover:border-terracotta text-muted dark:text-[#A19D95] hover:text-near-black dark:hover:text-[#F7F4EE] transition-colors bg-black/[0.03] dark:bg-white/[0.03] flex-shrink-0"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted dark:text-[#A19D95] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>OVERVIEW &amp; CONTEXT</span>
            </h4>
            <p className="text-sm font-sans text-near-black/80 dark:text-[#C4BFB6] leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Key Contributions & Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted dark:text-[#A19D95] flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-terracotta" />
              <span>KEY HIGHLIGHTS &amp; RESPONSIBILITIES</span>
            </h4>
            <ul className="space-y-2.5">
              {activity.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm font-sans text-near-black/90 dark:text-[#E5E0D8] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competencies & Skills */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted dark:text-[#A19D95] flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-terracotta" />
              <span>COMPETENCIES &amp; SKILLS DEMONSTRATED</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activity.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-ivory-200 dark:bg-[#1D1B19] text-near-black/90 dark:text-[#E5E0D8] border border-editorial dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
