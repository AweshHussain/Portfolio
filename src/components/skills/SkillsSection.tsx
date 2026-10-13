import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../config/skills';
import { Sparkles, Terminal } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-editorial pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              03 / TECHNICAL PROFICIENCY
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-ivory uppercase">
              TOOLS FOR THINKING.
              <br />
              TECHNOLOGY FOR BUILDING.
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed">
              A curated overview of methodologies, frameworks, and engineering tools applied across research experiments and software prototypes.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-terracotta">
              <Terminal className="w-3 h-3" />
              <span>TRANSPARENT REPERTOIRE • ZERO SYNTHETIC SCORES</span>
            </div>
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-editorial bg-ivory-100/70 dark:bg-charcoal-800/60 hover:border-terracotta/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-editorial"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-terracotta font-semibold">
                    0{catIdx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 group-hover:bg-terracotta transition-colors" />
                </div>

                <h3 className="font-editorial text-2xl font-bold tracking-tight text-near-black dark:text-ivory">
                  {category.title}
                </h3>

                <div className="pt-2 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-sans rounded-lg bg-ivory-200 dark:bg-charcoal-700/80 border border-editorial text-near-black/85 dark:text-ivory/85 hover:border-terracotta/50 hover:text-terracotta transition-all cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-editorial/40 flex items-center justify-between text-[11px] font-mono text-muted">
                <span>{category.skills.length} VERIFIED SKILLS</span>
                <span className="text-terracotta group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
