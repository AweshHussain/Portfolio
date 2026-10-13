import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificatesData } from '../../config/certifications';
import { Certificate } from '../../types';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import {
  Award,
  Sparkles,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface CertificationsSectionProps {
  onViewAllCertificates?: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onViewAllCertificates,
}) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Show only 3 featured certificates for a balanced editorial home layout
  const featuredCertificates = certificatesData.slice(0, 3);
  const totalCertificates = certificatesData.length;
  const uniqueCategories = new Set(certificatesData.map((c) => c.category)).size;

  return (
    <section
      id="certificates"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-terracotta/[0.04] dark:bg-terracotta/[0.05] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-editorial dark:border-white/10 pb-8 gap-6">
          <div className="space-y-3.5 max-w-2xl">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>CREDENTIALS &amp; MILESTONES</span>
            </motion.div>

            {/* Main Editorial Heading with distinctive Terracotta Accent */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-[#F7F4EE] uppercase leading-[1.08]"
            >
              A LOOK AT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-[#E0674C] to-[#C95B40]">
                MY ACHIEVEMENTS
              </span>
            </motion.h2>

            {/* Thin Terracotta Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-24 h-[2px] bg-terracotta origin-left"
            />
          </div>

          {/* Supporting Text & Counter */}
          <div className="max-w-md space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm font-sans text-muted dark:text-[#A19D95] leading-relaxed italic"
            >
              "Every certificate represents a skill explored, a concept mastered, and another step forward in my journey."
            </motion.p>

            <div className="flex items-center gap-1.5 text-xs font-mono text-terracotta">
              <Award className="w-3.5 h-3.5" />
              <span>3 OF {totalCertificates} FEATURED CREDENTIALS</span>
            </div>
          </div>
        </div>

        {/* 3 Featured Certificates Grid (Balanced 3-column composition) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {featuredCertificates.map((cert, index) => (
            <div key={cert.id} className="flex flex-col h-full">
              <CertificateCard
                certificate={cert}
                index={index}
                onSelect={(c) => setSelectedCertificate(c)}
              />
            </div>
          ))}
        </div>

        {/* Balanced Action Bar: See More Certificates */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-editorial dark:border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-muted dark:text-[#A19D95]">
              SHOWING 3 OF {totalCertificates} FEATURED CREDENTIALS
            </p>
            <p className="text-xs text-muted/80 dark:text-[#8E8A83] font-sans">
              Explore the complete credentials catalogue across Deep Learning, Cloud Architecture, and Hackathon sprint awards.
            </p>
          </div>

          <a
            href="#/certificates"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                e.preventDefault();
                onViewAllCertificates?.();
              }
            }}
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full border-2 border-terracotta bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white font-mono text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-terracotta/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>SEE MORE CERTIFICATES ({totalCertificates})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>

        {/* ─── ACHIEVEMENT SUMMARY STRIP ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-7 rounded-2xl border border-editorial dark:border-white/10 bg-ivory dark:bg-[#121110]/80 shadow-sm backdrop-blur-sm"
        >
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
                Data Science, CS, AI &amp; Tools
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
        </motion.div>
      </div>

      {/* Accessible Detail Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
