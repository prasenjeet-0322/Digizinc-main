"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const ICONS_ROW1 = [
  "/logos/partners/ALC (2).png",
  "/logos/partners/Asset 1RTS-fav.png",
  "/logos/partners/Asset 1glen white.png",
  "/logos/partners/Asset 1onegrasp1.png",
  "/logos/partners/Asset 2magnus.png",
  "/logos/partners/Aura white.png",
  "/logos/partners/Celebrity-Secrets white.png",
  "/logos/partners/Ebisu_90 White.png",
  "/logos/partners/Logo Lite.png",
  "/logos/partners/STOTAA white.png",
];

const ICONS_ROW2 = [
  "/logos/partners/ReWiser Logo 1.png",
  "/logos/partners/Skinnfit Logo.png",
  "/logos/partners/Sobha-Town-Park-Logo-1.png",
  "/logos/partners/aspire.png",
  "/logos/partners/ghu.png",
  "/logos/partners/jayanthi-logo-2.webp",
  "/logos/partners/logo 1.png",
  "/logos/partners/myra-logo.png",
  "/logos/partners/theja-infracon-logo white.png",
  "/logos/partners/zephhtmblack (1) white.png",
];

// Utility to repeat icons enough times
const repeatedIcons = (icons: string[], repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,48,48,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F23030] mb-4">Partners</p>
        <h2 className="font-['Inter'] text-3xl font-bold md:text-5xl lg:text-6xl tracking-tight text-white mb-6 uppercase">
          OUR DIGITAL PARTNERS
        </h2>

        {/* Carousel Container */}
        <div className="mt-20 overflow-hidden relative group">
          {/* Row 1: Moving Left */}
          <div className="flex gap-4 whitespace-nowrap animate-scroll-left [animation-duration:5s] md:[animation-duration:40s] py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW1, 8).map((src, i) => (
              <div 
                key={i} 
                className="h-20 w-64 flex-shrink-0 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500"
              >
                <img 
                  src={src} 
                  alt="partner-logo" 
                  className="h-14 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>

          {/* Row 2: Moving Right */}
          <div className="flex gap-4 whitespace-nowrap mt-4 animate-scroll-right [animation-duration:5s] md:[animation-duration:40s] py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW2, 8).map((src, i) => (
              <div 
                key={i} 
                className="h-20 w-64 flex-shrink-0 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500"
              >
                <img 
                  src={src} 
                  alt="partner-logo" 
                  className="h-14 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
