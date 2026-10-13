import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { X, Github, ExternalLink, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-ivory dark:bg-charcoal-900 border border-editorial rounded-2xl shadow-2xl flex flex-col overflow-hidden text-near-black dark:text-ivory z-10 select-text"
        >
          {/* Modal Header */}
          <div className="p-6 md:p-8 border-b border-editorial flex items-start justify-between gap-4 bg-ivory-100 dark:bg-charcoal-800">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-terracotta">
                  {project.number}
                </span>
                <Badge
                  variant={project.status.includes('Progress') ? 'neutral' : 'terracotta'}
                  dot={project.status.includes('Active')}
                >
                  {project.status}
                </Badge>
                <span className="text-xs font-mono tracking-widest uppercase text-muted hidden sm:inline">
                  CASE STUDY
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs font-mono tracking-wider uppercase text-terracotta font-semibold">
                {project.category}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-editorial hover:border-terracotta hover:bg-terracotta/10 text-near-black dark:text-ivory transition-colors"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Visual Header Image / Live Preview */}
            <div className="rounded-xl overflow-hidden border border-editorial/40 aspect-[16/9] max-h-80 bg-black/20 relative group/modalimg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover/modalimg:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs uppercase tracking-widest"
                >
                  <ExternalLink className="w-4 h-4 text-terracotta" />
                  <span>Launch Live Platform ↗</span>
                </a>
              )}
            </div>

            {/* Overview & Problem Statement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.overview && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono tracking-widest uppercase text-muted font-bold">
                    Project Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-near-black/85 dark:text-ivory/85 font-sans">
                    {project.overview}
                  </p>
                </div>
              )}

              {project.problemStatement && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono tracking-widest uppercase text-muted font-bold">
                    Problem Statement
                  </h3>
                  <p className="text-sm leading-relaxed text-near-black/85 dark:text-ivory/85 font-sans">
                    {project.problemStatement}
                  </p>
                </div>
              )}
            </div>

            {/* Technical Approach */}
            {project.approach && (
              <div className="p-6 rounded-xl bg-ivory-200/70 dark:bg-charcoal-800 border border-editorial space-y-3">
                <h3 className="text-xs font-mono tracking-widest uppercase text-terracotta font-bold">
                  Technical Approach & Methodology
                </h3>
                <p className="text-sm leading-relaxed text-near-black/90 dark:text-ivory/90 font-sans">
                  {project.approach}
                </p>
              </div>
            )}

            {/* Technical Workflow */}
            {project.technicalWorkflow && project.technicalWorkflow.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono tracking-widest uppercase text-muted font-bold">
                  System Architecture & Pipeline Workflow
                </h3>
                <div className="space-y-2.5">
                  {project.technicalWorkflow.map((step, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-lg border border-editorial bg-ivory-100 dark:bg-charcoal-800/50 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-sans text-near-black/80 dark:text-ivory/80">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Demonstrated Capabilities */}
            {project.implementedCapabilities && project.implementedCapabilities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono tracking-widest uppercase text-terracotta font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-terracotta" />
                  Demonstrated Implementation Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.implementedCapabilities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-editorial text-xs font-sans flex items-center gap-2 bg-ivory-100/50 dark:bg-charcoal-800/40"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Limitations & Constraints (Guarantees Honesty) */}
            {project.limitations && project.limitations.length > 0 && (
              <div className="p-6 rounded-xl border border-amber-600/30 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  Verified Scope & Research Constraints
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-near-black/75 dark:text-ivory/75 list-disc list-inside">
                  {project.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono tracking-widest uppercase text-muted font-bold">
                Technologies & Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono rounded bg-ivory-200 dark:bg-charcoal-700 border border-editorial text-near-black/80 dark:text-ivory/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 border-t border-editorial bg-ivory-100 dark:bg-charcoal-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <Button
                  asLink
                  href={project.githubUrl}
                  target="_blank"
                  variant="outline"
                  size="md"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub Repository</span>
                </Button>
              )}
              {project.liveDemoUrl && (
                <Button
                  asLink
                  href={project.liveDemoUrl}
                  target="_blank"
                  variant="primary"
                  size="md"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span>Launch Live Platform</span>
                </Button>
              )}
            </div>

            <Button
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              <span>Return to Portfolio</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
