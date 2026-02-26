"use client";

import IntroOverlay from "../sections/introSection/IntroOverlay";
import PreHeroSection from "../sections/introSection/PreHeroSection";
import DesktopHeroSection from "../sections/preHeroSections/DesktopHeroSection";
import MobileHeroSection from "../sections/preHeroSections/MobileHeroSection";
import Header from "../components/header/Header";

import { useMediaQuery } from "../hooks/useMediaQuery";
import { useRef, useEffect } from "react";

export default function Home() {

  const headerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight(); // on mount
    window.addEventListener('resize', updateHeaderHeight); // on resize
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <main className="bg-base-bg">

      {/* Navbar — fixed at z-50, always present */}
      <div ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <Header />
      </div>

      {/* These two cover the navbar */}
      <div className="relative z-60 isolate">
        <IntroOverlay />
      </div>

      <div className="relative z-60 isolate">
        <PreHeroSection />
      </div>

      {/* From here navbar becomes visible */}
      {isDesktop ? <DesktopHeroSection /> : <MobileHeroSection />}
      
      <section className="w-screen h-screen mt-(--header-height) ">
        <h1>Section 2</h1>
      </section>

    </main>
  );
};
