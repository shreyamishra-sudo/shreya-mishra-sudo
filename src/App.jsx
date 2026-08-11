import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import OpeningHero from './components/OpeningHero';
import AboutNarrative from './components/AboutNarrative';
import FeaturedCaseStudy from './components/FeaturedCaseStudy';
import AdditionalWork from './components/AdditionalWork';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsReference from './components/SkillsReference';
import Credentials from './components/Credentials';
import MapSkeleton from './components/MapSkeleton';
import ContactFooter from './components/ContactFooter';
import NotFound from './components/NotFound';
import Mascot from './components/Mascot';

// Lazy-load ProjectMap to maintain high performance
const ProjectMap = lazy(() => import('./components/ProjectMap'));

export default function App() {
  // Simple check for any route other than the root
  if (window.location.pathname !== '/') {
    return (
      <ThemeProvider>
        <NotFound />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bgPrimary text-textPrimary transition-colors duration-300 selection:bg-accent selection:text-white relative overflow-x-hidden font-sans">
        {/* Paper Grain overlay to replicate material quality */}
        <div className="bg-grain" />

        {/* Trail dot cursor */}
        <CustomCursor />

        {/* Top Scroll Indicator */}
        <ScrollProgress />

        {/* Minimal Navigation */}
        <Navbar />

        {/* Narrative Flow */}
        <main className="relative">
          {/* 1. Opening Hero */}
          <OpeningHero />
          
          {/* 2. Intro / Narrative Bio */}
          <AboutNarrative />
          
          {/* 3. Featured Case Study (Churn Prediction centerpiece) */}
          <FeaturedCaseStudy />
          
          {/* 4. Additional Work asymmetric listing */}
          <AdditionalWork />
          
          {/* 5. Experience Timeline in prose */}
          <ExperienceTimeline />
          
          {/* 6. Technical reference directory */}
          <SkillsReference />
          
          {/* 7. Certifications & Achievements index list */}
          <Credentials />
          
          {/* 8. Geospatial Work map (re-added before Contact) */}
          <Suspense fallback={<MapSkeleton />}>
            <ProjectMap />
          </Suspense>
          
          {/* 9. Contact form & links footer */}
          <ContactFooter />
        </main>

        <Mascot />
      </div>
    </ThemeProvider>
  );
}
