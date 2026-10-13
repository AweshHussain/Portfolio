import React from 'react';
import { motion } from 'framer-motion';
import { profileConfig } from '../../config/profile';
import { Brain, Satellite, LayoutDashboard, Activity } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const technicalPillars = [
    {
      icon: Satellite,
      title: 'Deep Learning & Satellite Telemetry',
      desc: 'Predicting cyclone intensity, barometric pressure, and landfall trajectories from ISRO INSAT-3DR feeds using hybrid CNN-GRU architectures.',
    },
    {
      icon: Brain,
      title: 'Machine Learning & Predictive Modeling',
      desc: 'Benchmarking regression engines (XGBoost, Random Forest) with log-transformation, categorical encoding, and residual diagnostics.',
    },
    {
      icon: LayoutDashboard,
      title: 'Full-Stack ML & Decision Dashboards',
      desc: 'Deploying trained models to production via Flask REST APIs, dynamic dropdowns, and interactive dashboards using Streamlit and Chart.js.',
    },
    {
      icon: Activity,
      title: 'Civic Tech & Healthcare Telemetry',
      desc: 'Architecting disease outbreak early-warning platforms and water quality tracking using geolocation intelligence and IBM Cloudant.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        {/* Section Header Meta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-editorial pb-6 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              01 / ABOUT ME
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-ivory uppercase">
              CURIOUS BY NATURE.
              <br />
              BUILT TO LEARN.
            </h2>
          </div>

          <p className="font-mono text-xs font-bold text-near-black dark:text-ivory uppercase tracking-widest sm:text-right">
            B.TECH CSE (AI/DS) • 3RD YEAR
            <br />
            ARKA JAIN UNIVERSITY (IBM COLLAB)
          </p>
        </div>

        {/* Tier 1: Core Philosophy & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Core Philosophy Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="p-8 sm:p-10 rounded-xl bg-ivory-200/95 dark:bg-[#141312]/90 border border-editorial dark:border-white/10 backdrop-blur-md space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-terracotta/10 blur-2xl pointer-events-none" />

              <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
                CORE PHILOSOPHY
              </span>

              <p className="font-editorial text-2xl sm:text-3xl leading-snug font-medium text-near-black dark:text-ivory italic">
                "Combining technical experimentation with thoughtful design to build useful, meaningful software."
              </p>

              <div className="pt-4 border-t border-editorial dark:border-white/10 flex items-center justify-between text-xs font-mono text-muted">
                <span>APPROACH</span>
                <span className="text-terracotta font-semibold">EVIDENCE-DRIVEN</span>
              </div>
            </div>
          </motion.div>

          {/* Primary Biography Copy */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 self-center"
          >
            <p className="text-lg sm:text-xl font-sans font-light leading-relaxed text-near-black/90 dark:text-ivory/90">
              {profileConfig.biography}
            </p>

            <p className="text-sm sm:text-base font-sans text-muted dark:text-[#C5BFB5] leading-relaxed">
              Whether modeling satellite telemetry for cyclone forecasting in Chakravat Manthan or building regression pipelines for market valuation, I take pride in understanding data behavior and deploying models that provide clear, demonstrable value.
            </p>
          </motion.div>
        </div>

        {/* Tier 2: Portrait & Technical Pillars (Symmetrically Aligned) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Authentic Secondary Portrait with Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="h-full rounded-xl overflow-hidden border border-editorial dark:border-white/10 bg-ivory-200/95 dark:bg-[#141312]/90 backdrop-blur-md p-3.5 shadow-editorial flex flex-col justify-between">
              <div className="flex-1 min-h-[300px] rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 relative">
                <img
                  src="/assets/portrait.png"
                  alt="Awesh Hussain"
                  className="w-full h-full object-cover object-top filter contrast-[1.02]"
                />
              </div>
              <div className="flex items-center justify-between px-2 pt-3 text-[11px] font-mono text-muted uppercase">
                <span>{profileConfig.name}</span>
                <span className="text-terracotta">● VERIFIED PROFILE</span>
              </div>
            </div>
          </motion.div>

          {/* Areas of Active Exploration Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
              AREAS OF ACTIVE EXPLORATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {technicalPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="p-5 rounded-xl border border-editorial dark:border-white/10 bg-ivory-100/90 dark:bg-[#141312]/90 backdrop-blur-md hover:border-terracotta/40 transition-colors group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-sans text-sm font-semibold text-near-black dark:text-ivory mb-1">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-xs text-muted dark:text-[#C5BFB5] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Tier 3: How I Approach Problems (Full-Width Symmetrical Anchor Card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-xl bg-ivory-100/90 dark:bg-[#141312]/90 border border-editorial dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8">
            <div className="space-y-1.5 md:max-w-xs flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-terracotta uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                METHODOLOGY
              </div>
              <h3 className="font-sans text-base sm:text-lg uppercase tracking-wide font-bold text-near-black dark:text-ivory">
                HOW I APPROACH PROBLEMS
              </h3>
            </div>
            <p className="text-sm sm:text-base text-near-black/80 dark:text-ivory/80 leading-relaxed font-sans max-w-3xl">
              I believe that effective machine learning starts with honest data appraisal rather than complex black boxes. I value clear metric formulation, robust baselines, and building transparent tools that communicate uncertainty honestly.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
