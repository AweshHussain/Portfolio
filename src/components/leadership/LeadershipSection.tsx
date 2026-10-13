import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { leadershipData } from '../../config/leadership';
import { LeadershipActivity } from '../../types';
import { LeadershipModal } from './LeadershipModal';
import {
  Users,
  Trophy,
  Code2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Briefcase,
  Terminal,
  Flag,
} from 'lucide-react';

interface LeadershipSectionProps {
  onSelectActivity?: (activity: LeadershipActivity) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onSelectActivity }) => {
  const [selectedActivity, setSelectedActivity] = useState<LeadershipActivity | null>(null);

  const handleCardClick = (activity: LeadershipActivity) => {
    setSelectedActivity(activity);
    if (onSelectActivity) {
      onSelectActivity(activity);
    }
  };

  const renderBadgeIcon = (type: string) => {
    switch (type) {
      case 'gdg':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#1C1B19] border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover:border-terracotta/40 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <path
                d="M7.5 7L3 12l4.5 5"
                stroke="#4285F4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 7L21 12l-4.5 5"
                stroke="#EA4335"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      case 'hackathon':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center justify-center p-2 text-blue-400 group-hover:border-blue-400/50 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
        );
      case 'sih':
        return (
          <div className="w-10 h-10 rounded-xl bg-orange-950/40 border border-orange-500/20 flex items-center justify-center p-2 text-orange-400 group-hover:border-orange-400/50 transition-colors">
            <Flag className="w-5 h-5" />
          </div>
        );
      case 'fest':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center p-2 text-emerald-400 group-hover:border-emerald-400/50 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
        );
      case 'career':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center p-2 text-amber-400 group-hover:border-amber-400/50 transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
        );
      case 'trophy':
        return (
          <div className="w-10 h-10 rounded-xl bg-yellow-950/40 border border-yellow-500/20 flex items-center justify-center p-2 text-yellow-400 group-hover:border-yellow-400/50 transition-colors">
            <Trophy className="w-5 h-5" />
          </div>
        );
      case 'club':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#1C1B19] border border-white/10 flex items-center justify-center p-2 text-terracotta group-hover:border-terracotta/40 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
        );
    }
  };

  const renderBadge = (activity: LeadershipActivity) => {
    if (activity.id === 'hack-horizon' || activity.id === 'technika-fest') {
      const isTechnika = activity.id === 'technika-fest';
      return (
        <div
          className={`relative w-12 h-12 rounded-full p-0.5 shadow-md flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-105 ${
            isTechnika
              ? 'bg-[#080B14] border-2 border-amber-400/40 shadow-amber-500/20 group-hover:border-amber-400 group-hover:shadow-[0_0_18px_rgba(251,191,36,0.35)]'
              : 'bg-[#080C17] border-2 border-blue-500/40 shadow-blue-500/20 group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]'
          }`}
        >
          <img
            src={activity.logo || activity.image}
            alt={activity.title}
            className="w-full h-full object-contain rounded-full"
            loading="lazy"
          />
        </div>
      );
    }
    if (activity.id === 'code-compute-society') {
      return (
        <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-[#1E1412] border-2 border-terracotta/30 p-1.5 shadow-md shadow-terracotta/15 group-hover:border-terracotta group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(224,122,95,0.35)] transition-all duration-300 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src={activity.logo || activity.image}
            alt={activity.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      );
    }
    if (activity.logo || activity.image) {
      return (
        <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-[#1C1B19] border border-editorial dark:border-white/10 p-1 shadow-md group-hover:scale-105 transition-all duration-300 flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src={activity.logo || activity.image}
            alt={activity.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      );
    }
    return renderBadgeIcon(activity.iconType);
  };

  return (
    <section
      id="leadership"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial dark:border-white/10 bg-transparent dark:bg-transparent text-near-black dark:text-[#F7F4EE] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header Meta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-editorial dark:border-white/10 pb-8 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>05 / LEADERSHIP &amp; COMMUNITY</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-[#F7F4EE] uppercase">
              LEADERSHIP &amp; VOLUNTEERING
            </h2>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <p className="font-mono text-xs text-muted dark:text-[#A19D95] tracking-wider uppercase">
              Click on any card to see details.
            </p>
            <span className="text-[11px] font-mono text-terracotta/80">
              COMMUNITY IMPACT • HACKATHONS • TECH FESTS
            </span>
          </div>
        </div>

        {/* Balanced 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipData.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => handleCardClick(activity)}
              className="group relative p-6 sm:p-7 rounded-2xl bg-ivory dark:bg-[#141312]/90 border border-editorial dark:border-white/10 hover:border-terracotta/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-editorial dark:hover:shadow-[0_16px_36px_-12px_rgba(224,122,95,0.18)] cursor-pointer flex flex-col justify-between gap-6 overflow-hidden"
            >
              {/* Card Top: Icon & Category Tag */}
              <div className="flex items-start justify-between gap-4 relative z-10">
                {renderBadge(activity)}

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted dark:text-[#A19D95] px-2.5 py-0.5 rounded-full border border-editorial dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03]">
                    {activity.category}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-editorial dark:border-white/10 flex items-center justify-center text-muted dark:text-[#A19D95] group-hover:text-terracotta group-hover:border-terracotta/40 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body: Title & Role */}
              <div className="space-y-2 relative z-10">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-near-black dark:text-[#F7F4EE] group-hover:text-terracotta transition-colors leading-tight">
                  {activity.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans font-medium text-muted dark:text-[#A19D95] line-clamp-2">
                  {activity.role}
                </p>
              </div>

              {/* Card Footer: Timeline & Micro-interaction indicator */}
              <div className="pt-3 border-t border-editorial dark:border-white/5 flex items-center justify-between text-xs font-mono text-muted dark:text-[#7E7A73] relative z-10">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-terracotta" />
                  <span>{activity.period}</span>
                </div>
                <span className="text-[11px] text-terracotta font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <LeadershipModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </section>
  );
};
