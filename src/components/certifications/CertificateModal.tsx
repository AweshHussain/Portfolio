import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '../../types';
import {
  X,
  Calendar,
  Award,
  ExternalLink,
  CheckCircle2,
  Tag,
  Copy,
  Check,
  Building,
  FileText,
} from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-ivory dark:bg-[#121110] border border-editorial dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-editorial dark:border-white/10 bg-ivory-200/50 dark:bg-black/20 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-terracotta px-2.5 py-0.5 rounded-full border border-terracotta/30 bg-terracotta/10">
                {certificate.category}
              </span>
              <span className="text-xs font-mono text-muted dark:text-[#A19D95] hidden sm:inline">
                Verified Credential
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-editorial dark:border-white/10 hover:border-terracotta text-muted dark:text-[#A19D95] hover:text-near-black dark:hover:text-[#F7F4EE] transition-colors bg-black/[0.03] dark:bg-white/[0.03]"
              title="Close (Esc)"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
            {/* Certificate Document Preview */}
            <div className="relative rounded-xl overflow-hidden border border-editorial dark:border-white/10 bg-[#0B0E14] shadow-inner flex items-center justify-center p-2 sm:p-4">
              <img
                src={certificate.image}
                alt={`${certificate.title} preview`}
                className="w-full max-h-[380px] object-contain rounded-lg select-none"
                loading="eager"
              />
            </div>

            {/* Metadata & Title Block */}
            <div className="space-y-4">
              <div>
                <h3
                  id="certificate-modal-title"
                  className="font-editorial text-2xl sm:text-3xl font-bold text-near-black dark:text-[#F7F4EE] tracking-tight leading-snug"
                >
                  {certificate.title}
                </h3>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs font-mono text-muted dark:text-[#A19D95]">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-terracotta" />
                    <span className="text-near-black dark:text-[#E8E4DC] font-medium">
                      {certificate.issuer}
                    </span>
                  </div>

                  <span className="text-editorial dark:text-white/20">•</span>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" />
                    <span>Issued {certificate.issueDate}</span>
                  </div>

                  {certificate.credentialId && (
                    <>
                      <span className="text-editorial dark:text-white/20">•</span>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-terracotta" />
                        <span className="font-mono">ID: {certificate.credentialId}</span>
                        <button
                          onClick={() => handleCopyId(certificate.credentialId!)}
                          className="p-1 hover:text-terracotta transition-colors"
                          title="Copy Credential ID"
                          aria-label="Copy Credential ID"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              {certificate.description && (
                <p className="text-sm sm:text-base font-sans text-muted dark:text-[#A19D95] leading-relaxed">
                  {certificate.description}
                </p>
              )}

              {/* Skills Acquired */}
              {certificate.skills && certificate.skills.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-editorial dark:border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted dark:text-[#A19D95]">
                    <Tag className="w-3.5 h-3.5 text-terracotta" />
                    <span>Competencies &amp; Technologies Covered</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-black/[0.04] dark:bg-white/[0.04] border border-editorial dark:border-white/10 text-near-black dark:text-[#F7F4EE]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-editorial dark:border-white/10 bg-ivory-200/50 dark:bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-muted dark:text-[#A19D95]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>
                {certificate.verificationUrl
                  ? 'Official Academic / Technical Record'
                  : 'Official Institutional Record'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
              {certificate.pdfUrl && (
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-editorial dark:border-white/10 hover:border-terracotta bg-black/[0.03] dark:bg-white/[0.03] text-near-black dark:text-[#F7F4EE] hover:text-terracotta font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <FileText className="w-3.5 h-3.5 text-terracotta" />
                  <span>View PDF</span>
                </a>
              )}

              {certificate.verificationUrl && (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-terracotta bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <span>Verify at Issuer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-editorial dark:border-white/10 hover:border-terracotta text-muted dark:text-[#A19D95] hover:text-near-black dark:hover:text-[#F7F4EE] font-mono text-xs uppercase tracking-wider transition-colors w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
