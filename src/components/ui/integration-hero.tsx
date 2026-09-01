"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const ICONS_ROW1: { src: string; name: string }[] = [
  { src: "/logos/partners/Asset_1broken.png", name: "Broken Partner" },
  { src: "/logos/partners/Asset_1onegrasp1.png", name: "OneGrasp" },
  { src: "/logos/partners/Asset_2magnus.png", name: "Magnus" },
  { src: "/logos/partners/Asset_3.png", name: "Partner Brand" },
  { src: "/logos/partners/Aura_white.png", name: "Aura" },
  { src: "/logos/partners/Ebisu_90_White.png", name: "Ebisu 90" },
  { src: "/logos/partners/Group_58.png", name: "Partner Brand" },
  { src: "/logos/partners/Logo.jpg", name: "Partner Brand" },
  { src: "/logos/partners/Logo_Lite.png", name: "Partner Brand" },
  { src: "/logos/partners/ReWiser_Logo_1.png", name: "ReWiser" },
];

const ICONS_ROW2: { src: string; name: string }[] = [
  { src: "/logos/partners/Sobha-Town-Park-Logo-1.png", name: "Sobha Town Park" },
  { src: "/logos/partners/Updated-logo-CMPS1.png", name: "CMPS" },
  { src: "/logos/partners/aspire.png", name: "Aspire" },
  { src: "/logos/partners/asset.png", name: "Partner Brand" },
  { src: "/logos/partners/footer-logo_white.png", name: "Partner Brand" },
  { src: "/logos/partners/jayanthi-logo-2.webp", name: "Jayanthi" },
  { src: "/logos/partners/logo.png", name: "Partner Brand" },
  { src: "/logos/partners/logo_skyven_updated-02(1)_copy.png", name: "Skyven" },
  { src: "/logos/partners/theja-infracon-logo_white.png", name: "Theja Infracon" },
];

// Utility to repeat icons enough times
const repeatedIcons = (icons: { src: string; name: string }[], repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

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
          <div className="flex gap-4 whitespace-nowrap animate-scroll-left [animation-duration:4.5s] md:[animation-duration:36s] py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW1, 8).map((icon, i) => (
              <div 
                key={i} 
                className="h-20 w-64 flex-shrink-0 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500"
              >
                <img 
                  src={icon.src} 
                  alt={icon.name}
                  className="h-14 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-all duration-500 invert brightness-0 grayscale hover:invert-0 hover:brightness-100 hover:grayscale-0" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>

          {/* Row 2: Moving Right */}
          <div className="flex gap-4 whitespace-nowrap mt-4 animate-scroll-right [animation-duration:4.5s] md:[animation-duration:36s] py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW2, 8).map((icon, i) => (
              <div 
                key={i} 
                className="h-20 w-64 flex-shrink-0 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500"
              >
                <img 
                  src={icon.src} 
                  alt={icon.name}
                  className="h-14 w-auto max-w-full object-contain opacity-70 hover:opacity-100 transition-all duration-500 invert brightness-0 grayscale hover:invert-0 hover:brightness-100 hover:grayscale-0" 
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
