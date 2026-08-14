"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div className="w-full">
      <div className="mb-2 mt-4 md:mt-6">
        <div className="px-2">
          <div className="relative w-full h-full">
            <h1 className="font-sofia tracking-tighter flex select-none px-3 py-2 flex-col text-center text-[64px] font-black leading-[1.0] sm:text-[68px] md:flex-col lg:flex-row lg:text-[80px] uppercase">

              <span
                data-content="DESIGN."
                className="before:animate-gradient-background-1 relative before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                  DESIGN.
                </span>
              </span>
              <span
                data-content="STRATEGY."
                className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                  STRATEGY.
                </span>
              </span>
              <span
                data-content="RESULTS."
                className="before:animate-gradient-background-3 relative before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0"
              >
                <span className="animate-mesh-gradient animate-gradient-foreground-3 bg-clip-text px-2 text-transparent sm:px-5">
                  RESULTS.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
