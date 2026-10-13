import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Terminal, Filter, ArrowUp } from 'lucide-react';
import { projectsData } from '../../config/projects';
import { profileConfig } from '../../config/profile';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../types';
import { ThemeToggle } from '../ui/ThemeToggle';
import { FixedLightTrails } from '../ui/FixedLightTrails';

interface AllProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onBack: () => void;
}

type FilterCategory = 'all' | 'deep-learning' | 'machine-learning' | 'full-stack';

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  onSelectProject,
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    const cat = project.category.toLowerCase();
    const techs = project.technologies.map((t) => t.toLowerCase()).join(' ');

    if (activeFilter === 'deep-learning') {
      return (
        cat.includes('deep learning') ||
        cat.includes('satellite') ||
        cat.includes('cnn') ||
        cat.includes('ai') ||
        cat.includes('watson') ||
        techs.includes('cnn') ||
        techs.includes('pytorch') ||
        techs.includes('watson')
      );
    }
    if (activeFilter === 'machine-learning') {
      return (
        cat.includes('machine learning') ||
        cat.includes('regression') ||
        cat.includes('xgboost') ||
        cat.includes('scikit') ||
        techs.includes('scikit-learn') ||
        techs.includes('xgboost')
      );
    }
    if (activeFilter === 'full-stack') {
      return (
        cat.includes('web') ||
        cat.includes('full-stack') ||
        cat.includes('platform') ||
        cat.includes('e-commerce') ||
        techs.includes('flask') ||
        techs.includes('cloudant')
      );
    }
    return true;
  });

  const filterButtons: { label: string; value: FilterCategory; count: number }[] = [
    { label: 'ALL PROJECTS', value: 'all', count: projectsData.length },
    {
      label: 'DEEP LEARNING / AI',
      value: 'deep-learning',
      count: projectsData.filter((p) => {
        const cat = p.category.toLowerCase();
        const techs = p.technologies.map((t) => t.toLowerCase()).join(' ');
        return (
          cat.includes('deep learning') ||
          cat.includes('satellite') ||
          cat.includes('cnn') ||
          cat.includes('ai') ||
          cat.includes('watson') ||
          techs.includes('cnn') ||
          techs.includes('pytorch') ||
          techs.includes('watson')
        );
      }).length,
    },
    {
      label: 'MACHINE LEARNING',
      value: 'machine-learning',
      count: projectsData.filter((p) => {
        const cat = p.category.toLowerCase();
        const techs = p.technologies.map((t) => t.toLowerCase()).join(' ');
        return (
          cat.includes('machine learning') ||
          cat.includes('regression') ||
          cat.includes('xgboost') ||
          cat.includes('scikit') ||
          techs.includes('scikit-learn') ||
          techs.includes('xgboost')
        );
      }).length,
    },
    {
      label: 'FULL-STACK & APPS',
      value: 'full-stack',
      count: projectsData.filter((p) => {
        const cat = p.category.toLowerCase();
        const techs = p.technologies.map((t) => t.toLowerCase()).join(' ');
        return (
          cat.includes('web') ||
          cat.includes('full-stack') ||
          cat.includes('platform') ||
          cat.includes('e-commerce') ||
          techs.includes('flask') ||
          techs.includes('cloudant')
        );
      }).length,
    },
  ];

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
            className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] uppercase tracking-wider font-bold text-near-black dark:text-[#F7F4EE] hover:text-terracotta transition-colors"
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
              <span>COMPLETE ARCHIVE // {projectsData.length} CASE STUDIES</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-ivory uppercase">
              PROJECT ARCHIVE
            </h1>
            <p className="text-sm sm:text-base font-sans text-muted dark:text-[#C5BFB5] leading-relaxed">
              Every production-grade machine learning system, deep learning telemetry model,
              conversational agent, and full-stack web application designed and implemented by Awesh Hussain.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>
                SHOWING {filteredProjects.length} OF {projectsData.length}
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted dark:text-[#8E8A83] uppercase tracking-wider">
              Click any project card to inspect full case study
            </p>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 mr-2 font-mono text-xs uppercase tracking-wider text-muted dark:text-[#A19D95]">
            <Filter className="w-3.5 h-3.5 text-terracotta" />
            <span>FILTER:</span>
          </div>
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeFilter === btn.value
                  ? 'bg-terracotta text-white shadow-md shadow-terracotta/20 border border-terracotta'
                  : 'bg-black/[0.04] dark:bg-white/[0.05] border border-editorial dark:border-white/10 text-near-black/80 dark:text-[#D1CCC2] hover:border-terracotta hover:text-terracotta'
              }`}
            >
              <span>{btn.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeFilter === btn.value
                    ? 'bg-white/25 text-white'
                    : 'bg-black/10 dark:bg-white/10 text-muted'
                }`}
              >
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        {/* FULL PROJECT CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${
                  index === 0 && activeFilter === 'all'
                    ? 'lg:col-span-2'
                    : 'lg:col-span-1'
                } flex`}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  index={index}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM CALL TO ACTION & RETURN */}
        <div className="pt-10 sm:pt-14 border-t border-editorial dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-near-black dark:text-[#F7F4EE] hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 text-terracotta" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </button>

          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted dark:text-[#A19D95] hover:text-terracotta transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>
      </main>

      {/* FOOTER STRIP */}
      <footer className="w-full border-t border-editorial dark:border-white/10 py-6 px-4 sm:px-8 text-center relative z-10">
        <p className="font-mono text-xs text-muted dark:text-[#7A766F] uppercase tracking-wider">
          © {new Date().getFullYear()} {profileConfig.name} • ALL ARCHIVED CASE STUDIES
        </p>
      </footer>
    </div>
  );
};
