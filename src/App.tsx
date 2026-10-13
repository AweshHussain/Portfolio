import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { Navbar } from './components/navigation/Navbar';
import { EditorialHero } from './components/hero/EditorialHero';
import { AboutSection } from './components/about/AboutSection';
import { ProjectGallery } from './components/projects/ProjectGallery';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { AllProjectsPage } from './components/projects/AllProjectsPage';
import { AllCertificatesPage } from './components/certifications/AllCertificatesPage';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { LeadershipSection } from './components/leadership/LeadershipSection';
import { JourneyTimeline } from './components/journey/JourneyTimeline';
import { ContactSection } from './components/contact/ContactSection';
import { FixedLightTrails } from './components/ui/FixedLightTrails';
import { Project } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hasIntroCompleted, setHasIntroCompleted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (
        hash === '#/projects' ||
        hash === '#/all-projects' ||
        hash === '#/certificates' ||
        hash === '#/all-certificates' ||
        path === '/projects' ||
        path === '/certificates'
      ) {
        return true;
      }
    }
    return false;
  });

  const [currentView, setCurrentView] = useState<'home' | 'all-projects' | 'all-certificates'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#/projects' || hash === '#/all-projects' || path === '/projects') {
        return 'all-projects';
      }
      if (hash === '#/certificates' || hash === '#/all-certificates' || path === '/certificates') {
        return 'all-certificates';
      }
    }
    return 'home';
  });

  // Ensure page always starts at top (Home) on initial load or refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Clear hash like #contact on reload so user always starts at Home
    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#/projects' || hash === '#/all-projects' || path === '/projects') {
        setHasIntroCompleted(true);
        setCurrentView('all-projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/certificates' || hash === '#/all-certificates' || path === '/certificates') {
        setHasIntroCompleted(true);
        setCurrentView('all-certificates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleOpenAllProjects = () => {
    setHasIntroCompleted(true);
    window.location.hash = '#/projects';
    setCurrentView('all-projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAllCertificates = () => {
    setHasIntroCompleted(true);
    window.location.hash = '#/certificates';
    setCurrentView('all-certificates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setHasIntroCompleted(true);
    setCurrentView('home');
    window.location.hash = '#projects';
    setTimeout(() => {
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleBackToCertificates = () => {
    setHasIntroCompleted(true);
    setCurrentView('home');
    window.location.hash = '#certificates';
    setTimeout(() => {
      const certElem = document.getElementById('certificates');
      if (certElem) {
        certElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleScrollToNext = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIntroComplete = () => {
    setHasIntroCompleted(true);
    document.body.classList.remove('bg-[#121110]');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  if (currentView === 'all-projects') {
    return (
      <>
        <AllProjectsPage
          onSelectProject={(p) => setSelectedProject(p)}
          onBack={handleBackToHome}
        />
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </>
    );
  }

  if (currentView === 'all-certificates') {
    return (
      <AllCertificatesPage onBack={handleBackToCertificates} />
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 dark:bg-[#0C0B0A] text-near-black dark:text-[#F7F4EE] transition-colors duration-500 flex flex-col justify-between selection:bg-terracotta selection:text-white relative">
      {/* Cinematic Opening Intro — plays once on initial visit, never when returning from AllProjectsPage */}
      {!hasIntroCompleted && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Top Fixed Navbar with Active Scrollspy & Mobile Drawer */}
      <Navbar />

      {/* Fixed Static Light-Trail Background across all non-hero sections */}
      <FixedLightTrails />

      {/* Main Editorial Experience */}
      <main className="flex-1 w-full relative z-10">
        {/* Hero Section */}
        <EditorialHero onScrollToNext={handleScrollToNext} />

        {/* Phase 3: About Section */}
        <AboutSection />

        {/* Phase 3: Project Gallery (3 Featured Projects + See More button) */}
        <ProjectGallery
          onSelectProject={(p) => setSelectedProject(p)}
          onViewAllProjects={handleOpenAllProjects}
        />

        {/* Credentials & Milestones Section (3 Featured Certificates + See More button) */}
        <CertificationsSection onViewAllCertificates={handleOpenAllCertificates} />

        {/* Phase 4: Skills Section */}
        <SkillsSection />

        {/* Leadership & Volunteering Section */}
        <LeadershipSection />

        {/* Phase 4: Journey Timeline */}
        <JourneyTimeline />

        {/* Phase 5: Contact Section */}
        <ContactSection />
      </main>

      {/* Phase 4: Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default App;
