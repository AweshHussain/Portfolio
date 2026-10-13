import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  ArrowUp,
} from 'lucide-react';
import { certificatesData, certificateCategories } from '../../config/certifications';
import { Certificate, CertificateCategory } from '../../types';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import { profileConfig } from '../../config/profile';
import { ThemeToggle } from '../ui/ThemeToggle';
import { FixedLightTrails } from '../ui/FixedLightTrails';

interface AllCertificatesPageProps {
  onBack: () => void;
}

export const AllCertificatesPage: React.FC<AllCertificatesPageProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  const filteredCertificates = useMemo(() => {
    if (activeCategory === 'All') {
      return certificatesData;
    }
    return certificatesData.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  const totalCertificates = certificatesData.length;
  const uniqueCategories = new Set(certificatesData.map((c) => c.category)).size;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ivory-100 dark:bg-[#0C0B0A] text-near-black dark:text-[#F7F4EE] transition-colors duration-500 relative flex flex-col justify-between selection:bg-terracotta selection:text-white">
      {/* Fixed Static Light Trails Background */}
      <FixedLightTrails forceVisible={true} />

      {/* TOP DEDICATED HEADER */}
      <header className="sticky top-0 left-0 w-full z-40 bg-ivory-100/90 dark:bg-[#0E0D0C]/90 backdrop-blur-md border-b border-editorial dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          {/* Back button to home */}
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] uppercase tracking-wider font-bold text-near-black dark:text-[#F7F4EE] hover:text-terracotta transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-terracotta" />
            <span>RETURN TO PORTFOLIO</span>
          </button>

          {/* Center Brand Name */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta" />
            <span className="font-display text-sm lg:text-base font-extrabold uppercase tracking-[0.04em] text-near-black dark:text-[#F7F4EE]">
              {profileConfig.name}
            </span>
          </div>

          {/* Right Action: Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10 space-y-12 sm:space-y-16">
        {/* ARCHIVE HERO HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-editorial dark:border-white/10 pb-8 sm:pb-10 gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPLETE ARCHIVE // {totalCertificates} CREDENTIALS &amp; AWARDS</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-[#F7F4EE] uppercase">
              CREDENTIALS &amp; ACHIEVEMENTS
            </h1>
            <p className="text-sm sm:text-base font-sans text-muted dark:text-[#C5BFB5] leading-relaxed">
              Complete catalogue of academic specializations, enterprise cloud credentials, hackathon volunteering certificates,
              and data science milestones earned by Awesh Hussain.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>
                SHOWING {filteredCertificates.length} OF {totalCertificates}
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg border border-editorial dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-terracotta text-white font-bold shadow-sm'
                    : 'text-muted hover:text-near-black dark:hover:text-[#F7F4EE]'
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-terracotta text-white font-bold shadow-sm'
                    : 'text-muted hover:text-near-black dark:hover:text-[#F7F4EE]'
                }`}
                title="Carousel layout"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth -mx-2 px-2">
          <div className="flex items-center gap-1.5 mr-2 font-mono text-xs uppercase tracking-wider text-muted dark:text-[#A19D95] flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-terracotta" />
            <span>DOMAIN:</span>
          </div>
          {certificateCategories.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All'
                ? certificatesData.length
                : certificatesData.filter((c) => c.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex-shrink-0 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-terracotta text-white shadow-md shadow-terracotta/20 border border-terracotta'
                    : 'bg-black/[0.04] dark:bg-white/[0.05] border border-editorial dark:border-white/10 text-near-black/80 dark:text-[#D1CCC2] hover:border-terracotta hover:text-terracotta'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-black/10 dark:bg-white/10 text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FULL CERTIFICATES GRID */}
        <AnimatePresence mode="wait">
          {filteredCertificates.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-editorial dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <p className="font-mono text-sm text-muted">No certificates found in this category.</p>
            </div>
          ) : (
            <motion.div
              key={`${activeCategory}-${viewMode}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            >
              {filteredCertificates.map((cert, index) => (
                <div key={cert.id} className="flex flex-col h-full">
                  <CertificateCard
                    certificate={cert}
                    index={index}
                    onSelect={(c) => setSelectedCertificate(c)}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACHIEVEMENT SUMMARY METRIC STRIP */}
        <div className="p-6 sm:p-8 rounded-2xl border border-editorial dark:border-white/10 bg-ivory dark:bg-[#121110]/80 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-editorial dark:divide-white/10">
            {/* Stat 1: Total Certificates */}
            <div className="space-y-1.5 text-center md:text-left pt-3 md:pt-0">
              <div className="flex items-center justify-center md:justify-start gap-2 text-terracotta">
                <Award className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Credentials
                </span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE]">
                {totalCertificates} Completed
              </p>
              <p className="font-mono text-[11px] text-muted dark:text-[#7A766F]">
                Verified Technical Records
              </p>
            </div>

            {/* Stat 2: Core Disciplines */}
            <div className="space-y-1.5 text-center md:text-left pt-3 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-terracotta">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Domains
                </span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE]">
                {uniqueCategories} Disciplines
              </p>
              <p className="font-mono text-[11px] text-muted dark:text-[#7A766F]">
                AI, ML, Data, CS &amp; Cloud
              </p>
            </div>

            {/* Stat 3: Partner Authority */}
            <div className="space-y-1.5 text-center md:text-left pt-3 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-terracotta">
                <GraduationCap className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Issuing Partners
                </span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE]">
                IBM &amp; Coursera
              </p>
              <p className="font-mono text-[11px] text-muted dark:text-[#7A766F]">
                Global University &amp; Industry Alliances
              </p>
            </div>

            {/* Stat 4: Commitment */}
            <div className="space-y-1.5 text-center md:text-left pt-3 md:pt-0 md:pl-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-500">
                <CheckCircle className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  Learning Ethos
                </span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE]">
                Continuous
              </p>
              <p className="font-mono text-[11px] text-muted dark:text-[#7A766F]">
                Active Research &amp; Projects
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION & RETURN */}
        <div className="pt-10 sm:pt-14 border-t border-editorial dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-near-black dark:text-[#F7F4EE] hover:text-terracotta transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 text-terracotta" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </button>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted dark:text-[#A19D95] hover:text-terracotta transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>
      </main>

      {/* FOOTER STRIP */}
      <footer className="w-full border-t border-editorial dark:border-white/10 py-6 px-4 sm:px-8 text-center relative z-10">
        <p className="font-mono text-xs text-muted dark:text-[#7A766F] uppercase tracking-wider">
          © {new Date().getFullYear()} {profileConfig.name} • ALL ARCHIVED CERTIFICATES &amp; CREDENTIALS
        </p>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
};
