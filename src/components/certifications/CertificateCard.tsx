import React from 'react';
import { motion } from 'framer-motion';
import { Certificate } from '../../types';
import { ExternalLink, Calendar, Building, Eye, Award } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  onSelect: (cert: Certificate) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  index,
  onSelect,
}) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col justify-between rounded-2xl bg-ivory dark:bg-[#141312]/90 border border-editorial dark:border-white/10 hover:border-terracotta/50 dark:hover:border-terracotta/60 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-editorial dark:hover:shadow-[0_18px_38px_-12px_rgba(224,122,95,0.22)] overflow-hidden h-full cursor-pointer focus-within:ring-2 focus-within:ring-terracotta"
      onClick={() => onSelect(certificate)}
    >
      {/* Card Top: Preview Artwork with Restrained Light Sweep */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0D14] flex items-center justify-center p-3 border-b border-editorial dark:border-white/10">
        {/* Document Artwork */}
        <img
          src={certificate.image}
          alt={`Certificate preview for ${certificate.title} by ${certificate.issuer}`}
          className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02] select-none"
          loading="lazy"
        />

        {/* Diagonal Light Sweep Effect on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] dark:via-white/[0.08] to-transparent transition-transform duration-1000 ease-in-out pointer-events-none"
        />

        {/* Hover Overlay Action Pill */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta text-white font-mono text-xs font-bold tracking-wider uppercase shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            <span>View Certificate</span>
          </span>
        </div>

        {/* Category Pill Tag (top-left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-terracotta font-bold px-2.5 py-1 rounded-full border border-terracotta/30 bg-ivory-100/90 dark:bg-[#141312]/90 backdrop-blur-md shadow-sm">
            {certificate.category}
          </span>
        </div>

        {/* Issue Date Badge (top-right) */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-mono text-muted dark:text-[#A19D95] px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm border border-white/10 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-terracotta" />
            {certificate.issueDate}
          </span>
        </div>
      </div>

      {/* Card Body: Content & Hierarchy */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="space-y-2.5">
          {/* Issuer */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted dark:text-[#A19D95]">
            <Building className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
            <span className="truncate">{certificate.issuer}</span>
          </div>

          {/* Certificate Title */}
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-near-black dark:text-[#F7F4EE] leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
            {certificate.title}
          </h3>

          {/* Short Description */}
          {certificate.description && (
            <p className="text-xs font-sans text-muted dark:text-[#A19D95] leading-relaxed line-clamp-2">
              {certificate.description}
            </p>
          )}
        </div>

        {/* Card Footer: Metadata & Action */}
        <div className="pt-3 border-t border-editorial dark:border-white/10 flex items-center justify-between text-xs font-mono">
          {certificate.credentialId ? (
            <span className="text-[11px] text-muted dark:text-[#7A766F] truncate flex items-center gap-1">
              <Award className="w-3 h-3 text-terracotta flex-shrink-0" />
              <span>{certificate.credentialId}</span>
            </span>
          ) : certificate.verificationUrl ? (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Verified Credential
            </span>
          ) : (
            <span className="text-[11px] text-muted dark:text-[#7A766F] font-medium">
              Official Record
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(certificate);
            }}
            className="inline-flex items-center gap-1 text-terracotta hover:text-terracotta-dark font-bold tracking-wider uppercase text-[11px] transition-colors focus:outline-none"
            aria-label={`View certificate details for ${certificate.title}`}
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
