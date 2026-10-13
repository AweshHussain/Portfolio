import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowUpRight, Github, ExternalLink, Layers, CheckCircle2, Lock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const isAtmospheric = project.id === 'chakravat-manthan';
  const isAutomotive = project.id === 'used-car-price-prediction';

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl overflow-hidden border transition-all duration-300 group flex flex-col justify-between ${
        isAtmospheric
          ? 'bg-[#0E1722] text-[#F5F0E7] border-[#1E3A52]/50 shadow-xl'
          : isAutomotive
          ? 'bg-ivory-200/80 dark:bg-charcoal-800 border-editorial hover:border-terracotta/40 shadow-editorial'
          : 'bg-ivory-100 dark:bg-charcoal-700/60 border-editorial hover:border-terracotta/40 shadow-editorial'
      }`}
    >
      {/* Top Header Information Bar */}
      <div className="p-6 sm:p-8 pb-4 flex items-center justify-between border-b border-editorial/40">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider text-terracotta">
            {project.number}
          </span>
          <span className="text-xs uppercase tracking-widest font-mono text-muted">
            {project.status}
          </span>
        </div>

        <Badge
          variant={project.status.includes('Progress') ? 'neutral' : 'terracotta'}
          dot={project.status.includes('Active')}
        >
          {project.status}
        </Badge>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Category */}
          <p className="text-xs font-mono tracking-widest uppercase text-terracotta font-semibold">
            {project.category}
          </p>

          {/* Title */}
          <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm sm:text-[15px] leading-relaxed ${
              isAtmospheric ? 'text-[#D0D6DC]' : 'text-near-black/80 dark:text-ivory/80'
            }`}
          >
            {project.description}
          </p>

          {/* Demonstrated Implemented Capabilities */}
          {project.implementedCapabilities && project.implementedCapabilities.length > 0 && (
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-terracotta" />
                Demonstrated Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {project.implementedCapabilities.slice(0, 4).map((cap) => (
                  <div key={cap} className="flex items-center gap-1.5 text-xs opacity-90">
                    <span className="text-terracotta">▪</span>
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Visual Showcase: Interactive Live Browser Window or Visual Graphic */}
        {project.liveDemoUrl ? (
          <div className="my-4 rounded-xl overflow-hidden border border-editorial/40 bg-black/40 shadow-2xl relative group/live">
            {/* Browser Top Navigation Chrome */}
            <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between gap-2 text-xs font-mono select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-muted flex items-center justify-center gap-1.5 truncate">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-gray-300 truncate">
                  Live Production System • Click to Launch
                </span>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Clickable Live Preview Container (Redirects to live app on click) */}
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
              title="Click to launch live platform in a new tab"
            >
              {/* Scaled Live Iframe Preview */}
              <iframe
                src={project.liveDemoUrl}
                title={`${project.title} Live Preview`}
                loading="lazy"
                className="w-[200%] h-[200%] origin-top-left transform scale-50 pointer-events-none border-0"
              />

              {/* Hover Launch Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/live:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-6 text-center select-none">
                <div className="w-12 h-12 rounded-full bg-terracotta text-white flex items-center justify-center shadow-lg transform group-hover/live:scale-110 transition-transform">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <span className="font-editorial text-xl font-bold text-white tracking-wide">
                  Open Live Application
                </span>
                <span className="font-mono text-xs text-terracotta uppercase tracking-widest font-semibold">
                  Launch Live Platform ↗
                </span>
              </div>
            </a>
          </div>
        ) : (
          /* Standard Visual Graphic for projects without live URL yet */
          <div className="my-4 overflow-hidden rounded-xl border border-editorial/40 bg-black/20 aspect-[16/10] relative group/img">
            <img
              src={project.image}
              alt={`${project.title} visualization`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
              loading="lazy"
            />

            {/* Subtle Overlay Badge on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-xs font-mono text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-terracotta" />
                Click to view architecture details
              </span>
            </div>
          </div>
        )}

        {/* Technologies Chips */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-editorial text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-editorial/40 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onSelect(project)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-terracotta hover:text-terracotta-dark font-bold group/btn py-1"
            >
              <span>Explore Technical Case</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <Button
                  asLink
                  href={project.githubUrl}
                  target="_blank"
                  variant="outline"
                  size="sm"
                  title="View GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5 mr-1" />
                  <span>Code</span>
                </Button>
              )}

              {project.liveDemoUrl && (
                <Button
                  asLink
                  href={project.liveDemoUrl}
                  target="_blank"
                  variant="primary"
                  size="sm"
                  title="Launch Live Prototype in New Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  <span>Launch Live App</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
