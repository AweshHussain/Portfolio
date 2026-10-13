import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../../config/timeline';
import { Calendar, Milestone, Compass } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  return (
    <section
      id="journey"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-editorial pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <Compass className="w-3.5 h-3.5" />
              04 / PATHWAY &amp; MILESTONES
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-ivory uppercase">
              JOURNEY &amp; MILESTONES
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm font-sans text-muted leading-relaxed">
            Key milestones in applied research, prototype development, and technical growth.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-10 border-l border-editorial space-y-12 my-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-ivory dark:bg-charcoal-900 border-2 border-terracotta flex items-center justify-center transition-transform group-hover:scale-125">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
              </div>

              {/* Entry Card */}
              <div className="p-6 sm:p-8 rounded-xl bg-ivory dark:bg-charcoal-800 border border-editorial hover:border-terracotta/40 transition-colors space-y-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-terracotta font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted px-2.5 py-0.5 rounded border border-editorial">
                    {item.organization}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-near-black dark:text-ivory flex items-center gap-2">
                  <Milestone className="w-4 h-4 text-terracotta" />
                  {item.title}
                </h3>

                <p className="text-sm font-sans text-near-black/80 dark:text-ivory/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
