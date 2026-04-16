"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const ICONS_ROW1 = [
  "https://cdn-icons-png.flaticon.com/512/5968/5968854.png", // Webflow
  "https://cdn-icons-png.flaticon.com/512/732/732221.png", // JS
  "https://cdn-icons-png.flaticon.com/512/733/733609.png", // GitHub
  "https://cdn-icons-png.flaticon.com/512/732/732084.png", // HTML
  "https://cdn-icons-png.flaticon.com/512/733/733585.png", // Slack
  "https://cdn-icons-png.flaticon.com/512/281/281763.png", // Gmail
  "https://cdn-icons-png.flaticon.com/512/888/888879.png", // Photoshop
];

const ICONS_ROW2 = [
  "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
  "https://cdn-icons-png.flaticon.com/512/906/906324.png", // Discord
  "https://cdn-icons-png.flaticon.com/512/888/888841.png", // Chrome
  "https://cdn-icons-png.flaticon.com/512/5968/5968875.png", // Notion
  "https://cdn-icons-png.flaticon.com/512/906/906361.png", // Figma
  "https://cdn-icons-png.flaticon.com/512/732/732190.png", // CSS
  "https://cdn-icons-png.flaticon.com/512/888/888847.png", // Dropbox
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
          <div className="flex gap-8 whitespace-nowrap animate-scroll-left py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW1, 8).map((src, i) => (
              <div 
                key={i} 
                className="h-20 w-20 flex-shrink-0 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 shadow-2xl flex items-center justify-center grayscale hover:grayscale-0 hover:bg-zinc-800 transition-all duration-500"
              >
                <img 
                  src={src} 
                  alt="tool-icon" 
                  className="h-10 w-10 object-contain opacity-60 hover:opacity-100 transition-opacity" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>

          {/* Row 2: Moving Right */}
          <div className="flex gap-8 whitespace-nowrap mt-8 animate-scroll-right py-4 hover:[animation-play-state:paused] cursor-pointer">
            {repeatedIcons(ICONS_ROW2, 8).map((src, i) => (
              <div 
                key={i} 
                className="h-20 w-20 flex-shrink-0 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 shadow-2xl flex items-center justify-center grayscale hover:grayscale-0 hover:bg-zinc-800 transition-all duration-500"
              >
                <img 
                  src={src} 
                  alt="tool-icon" 
                  className="h-10 w-10 object-contain opacity-60 hover:opacity-100 transition-opacity" 
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
