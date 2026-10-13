import React from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { projectsData } from '../../config/projects';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../types';

interface ProjectGalleryProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects?: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  // Show only 3 featured projects for a balanced editorial layout
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-6 md:px-14 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Gallery Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-editorial pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-terracotta font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              02 / SELECTED WORK
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-near-black dark:text-ivory uppercase">
              PROJECT SHOWCASE
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed">
              Real-world machine learning implementations, deep learning pipelines, and full-stack data applications developed with attention to architectural rigor.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-terracotta">
              <Terminal className="w-3 h-3" />
              <span>3 OF {projectsData.length} FEATURED CASE STUDIES</span>
            </div>
          </div>
        </div>

        {/* Project Cards Grid — 3 Projects (1 wide hero + 2 balanced columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${index === 0 ? 'lg:col-span-2' : 'lg:col-span-1'} flex`}
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Balanced Action Bar: See More Projects */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-editorial dark:border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-muted dark:text-[#A19D95]">
              SHOWING 3 OF {projectsData.length} FEATURED CASE STUDIES
            </p>
            <p className="text-xs text-muted/80 dark:text-[#8E8A83] font-sans">
              Explore the complete engineering archive including healthcare systems, market portals &amp; automated bots.
            </p>
          </div>

          <a
            href="#/projects"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                e.preventDefault();
                onViewAllProjects?.();
              }
            }}
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full border-2 border-terracotta bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white font-mono text-xs sm:text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-terracotta/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <span>SEE MORE PROJECTS ({projectsData.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
