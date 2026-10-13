import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { profileConfig } from '../../config/profile';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  User,
  AtSign,
  MessageSquare,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Loader2,
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY =
  (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY ||
  (typeof window !== 'undefined'
    ? window.atob('N2QwMmU1N2YtMjNiMS00OGQwLWFkYjctMGI0OTU3MmZiZjI0')
    : '');

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const phoneRaw = '9113152295';
  const phoneFormatted = '+91 91131 52295';
  const whatsappUrl = `https://wa.me/91${phoneRaw}?text=${encodeURIComponent(
    'Hi Awesh, I came across your portfolio and would like to connect!'
  )}`;

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2200);
    } catch {
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }


    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: `${formData.name} (via Portfolio)`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(
          data.message || 'Unable to send message right now. Please use WhatsApp or email directly.'
        );
      }
    } catch {
      setErrorMessage('Network error while sending. Please use WhatsApp or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Awesh,\nMy Name: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\n\nMessage:\n${formData.message || 'I would like to connect with you!'}`
    );
    window.open(`https://wa.me/91${phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative pt-20 sm:pt-28 pb-8 sm:pb-10 px-6 md:px-12 lg:px-20 border-t border-editorial bg-transparent dark:bg-transparent transition-colors duration-500 overflow-hidden"
    >
      {/* Background subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-terracotta/5 dark:bg-terracotta/[0.07] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto space-y-14 sm:space-y-16 relative z-10">
        {/* Top Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-[0.25em] uppercase text-terracotta dark:text-[#FFA085] font-bold bg-ivory-200/70 dark:bg-black/50 border border-editorial dark:border-white/15 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            05 / GET IN TOUCH
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-near-black dark:text-white drop-shadow-md"
          >
            LET'S WORK TOGETHER
          </motion.h2>
          <p className="text-sm sm:text-base font-sans text-near-black/75 dark:text-[#F0ECE1] max-w-xl mx-auto drop-shadow-sm font-medium">
            Have a project in mind, an opportunity, or just want to discuss machine learning &amp; technology?
          </p>
        </div>

        {/* 2-Column Main Contact Block (Equal 50/50 Size) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Get In Touch & Personal Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="h-full p-7 sm:p-9 rounded-2xl border border-editorial dark:border-white/15 bg-ivory-100/90 dark:bg-[#121316]/95 shadow-2xl backdrop-blur-md flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-near-black dark:text-white">
                Get In Touch
              </h3>
              <p className="text-sm sm:text-[15px] font-sans text-near-black/75 dark:text-[#E5E0D6] leading-relaxed">
                Whether you're developing data-driven architectures, exploring machine learning
                solutions, or seeking a dedicated engineer for internship and full-time opportunities—I'm
                always eager to connect and build impactful technology.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-terracotta/10 dark:bg-terracotta/20 text-terracotta dark:text-[#FFA085] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-terracotta/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-near-black/60 dark:text-[#C5BFB5] font-semibold">
                    Email
                  </p>
                  <a
                    href={`mailto:${profileConfig.email}`}
                    className="text-sm sm:text-base font-semibold text-near-black dark:text-white hover:text-terracotta dark:hover:text-[#FFA085] transition-colors truncate block"
                  >
                    {profileConfig.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(profileConfig.email, 'email')}
                  className="p-2 rounded-lg text-near-black/50 dark:text-[#B0ABA0] hover:text-terracotta dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-terracotta/10 dark:bg-terracotta/20 text-terracotta dark:text-[#FFA085] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-terracotta/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-near-black/60 dark:text-[#C5BFB5] font-semibold">
                    Phone
                  </p>
                  <a
                    href={`tel:+91${phoneRaw}`}
                    className="text-sm sm:text-base font-semibold text-near-black dark:text-white hover:text-terracotta dark:hover:text-[#FFA085] transition-colors block"
                  >
                    {phoneFormatted}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(phoneFormatted, 'phone')}
                  className="p-2 rounded-lg text-near-black/50 dark:text-[#B0ABA0] hover:text-terracotta dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedItem === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-emerald-500/20">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-near-black/60 dark:text-[#C5BFB5] font-semibold">
                    WhatsApp
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-near-black dark:text-white hover:text-emerald-500 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{phoneFormatted}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-near-black/50 dark:text-[#B0ABA0]" />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(phoneFormatted, 'whatsapp')}
                  className="p-2 rounded-lg text-near-black/50 dark:text-[#B0ABA0] hover:text-emerald-500 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy WhatsApp number"
                  aria-label="Copy WhatsApp number"
                >
                  {copiedItem === 'whatsapp' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-terracotta/10 dark:bg-terracotta/20 text-terracotta dark:text-[#FFA085] flex items-center justify-center flex-shrink-0 border border-terracotta/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-near-black/60 dark:text-[#C5BFB5] font-semibold">
                    Location
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-near-black dark:text-white">
                    {profileConfig.location || 'Jamshedpur, India'}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-near-black/60 dark:text-[#C5BFB5] font-semibold">
                    Status
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-near-black dark:text-white">
                    Open to remote work &amp; full-time opportunities
                  </p>
                </div>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form Box (Identical size & stretch) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="h-full p-7 sm:p-9 rounded-2xl border border-editorial dark:border-white/15 bg-ivory-100/90 dark:bg-[#121316]/95 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-near-black/40 dark:text-[#A8A49C] absolute left-4 pointer-events-none" />
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-editorial dark:border-white/15 bg-black/[0.03] dark:bg-[#0A0B0E] text-sm text-near-black dark:text-white placeholder:text-near-black/45 dark:placeholder:text-[#A8A39A] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="sr-only">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <AtSign className="w-4 h-4 text-near-black/40 dark:text-[#A8A49C] absolute left-4 pointer-events-none" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-editorial dark:border-white/15 bg-black/[0.03] dark:bg-[#0A0B0E] text-sm text-near-black dark:text-white placeholder:text-near-black/45 dark:placeholder:text-[#A8A39A] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label htmlFor="contact-message" className="sr-only">
                    Your Message
                  </label>
                  <div className="relative flex-1 flex">
                    <MessageSquare className="w-4 h-4 text-near-black/40 dark:text-[#A8A49C] absolute left-4 top-4 pointer-events-none" />
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full h-full min-h-[140px] pl-11 pr-4 py-3.5 rounded-xl border border-editorial dark:border-white/15 bg-black/[0.03] dark:bg-[#0A0B0E] text-sm text-near-black dark:text-white placeholder:text-near-black/45 dark:placeholder:text-[#A8A39A] focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Error message if validation fails */}
                {errorMessage && (
                  <p className="text-xs text-rose-500 font-mono tracking-wide">{errorMessage}</p>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-white bg-gradient-to-r from-terracotta via-[#DE5B41] to-[#C84B32] hover:opacity-95 active:scale-[0.99] transition-all shadow-lg hover:shadow-terracotta/25 flex items-center justify-center gap-2.5 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                {/* Alternative Quick WhatsApp Option */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-near-black/70 dark:text-[#DDD8CE]">
                  <span>Prefer instant chat?</span>
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Success feedback state */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Thank you! Your message has been sent directly to Awesh's email inbox.
                    </span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Social Icons Row & Copyright (grounded at the bottom matching reference image) */}
        <div className="pt-16 sm:pt-20 pb-2 flex flex-col items-center justify-center text-center space-y-3.5 relative">
          <p className="font-sans text-xs sm:text-[13px] text-near-black/70 dark:text-[#D1CCC2] tracking-wide select-none font-medium">
            © {new Date().getFullYear()} {profileConfig.name}. All rights reserved.
          </p>

          {/* Clean minimal borderless social icons strip */}
          <div className="flex items-center justify-center gap-6 sm:gap-7 text-near-black/60 dark:text-[#C5BFB5]">
            {/* Email */}
            <a
              href={`mailto:${profileConfig.email}`}
              className="hover:text-near-black dark:hover:text-white hover:scale-110 transition-all duration-200"
              title="Email Awesh"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>

            {/* GitHub */}
            <a
              href={profileConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-near-black dark:hover:text-white hover:scale-110 transition-all duration-200"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-near-black dark:hover:text-white hover:scale-110 transition-all duration-200"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 hover:scale-110 transition-all duration-200"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={profileConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-near-black dark:hover:text-white hover:scale-110 transition-all duration-200"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Phone */}
            <a
              href={`tel:+91${phoneRaw}`}
              className="hover:text-near-black dark:hover:text-white hover:scale-110 transition-all duration-200"
              title="Call Awesh"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
