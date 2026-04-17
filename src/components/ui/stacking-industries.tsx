'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface Industry {
  id: string;
  title: string;
  desc: string;
  stats: { val: string; label: string }[];
  img: string;
}

interface StackingIndustriesProps {
  industries: Industry[];
}

const StackingIndustries = forwardRef<HTMLElement, StackingIndustriesProps>(({ industries }, ref) => {
  return (
    <ReactLenis root>
      <main className="bg-transparent" ref={ref}>
        <section className="text-white w-full py-16 md:py-0">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            
            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden mb-12">
              <p className="text-xs font-['Inter'] font-semibold uppercase tracking-[0.14em] text-[#F23030] mb-2">Core Focus</p>
              <h2 className="text-4xl font-['Inter'] font-black text-cream leading-tight uppercase tracking-tighter">
                WHO WE <span className="text-[#F23030]">BUILD</span> FOR
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20 relative">
              
              {/* Left side: Fixed Header/Text (Desktop Only) */}
              <div className="hidden md:block md:w-[40%] sticky top-32 h-[75vh] flex flex-col justify-center">
                <div className="text-left">
                  <p className="text-xs font-['Inter'] font-semibold uppercase tracking-[0.14em] text-[#F23030] mb-4">Core Focus</p>
                  <h2 className="text-4xl lg:text-5xl font-['Inter'] font-black text-cream leading-[1.1] uppercase tracking-tighter whitespace-nowrap">
                    WHO WE <span className="text-[#F23030]">BUILD</span> FOR
                  </h2>
                  <div className="mt-8 h-1 w-12 bg-[#F23030]" />
                  <p className="mt-8 text-zinc-400 text-sm lg:text-base font-['Inter'] font-medium leading-relaxed max-w-[320px]">
                    We specialize in industries where digital presence defines market authority. Our systems are built for dominance.
                  </p>
                </div>
              </div>

              {/* Right side: Stacking Cards */}
              <div className="flex-1 py-10 md:py-20">
                <div className="grid gap-16 md:gap-32">
                  {industries.map((industry, i) => (
                    <figure 
                      key={industry.id} 
                      className="sticky top-32 md:top-40 h-[450px] md:h-[500px] flex items-center justify-center"
                    >
                      <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="relative flex flex-col h-full w-full max-w-[500px] rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden group hover:border-[#F23030]/50 transition-colors duration-500"
                      >
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 z-0">
                           <img 
                              src={industry.img} 
                              alt={industry.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Radial/Linear gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40" />
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
                          <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                        </div>

                        {/* Foreground Content */}
                        <div className="relative z-10 flex flex-col h-full p-8 md:p-8">
                          <p className="text-[#F23030] text-[10px] font-['Inter'] font-bold uppercase tracking-[0.3em] mb-3">Industry 0{i + 1}</p>
                          <h3 className="text-3xl md:text-4xl font-['Inter'] font-black uppercase tracking-tighter text-white mb-4 group-hover:text-[#F23030] transition-colors duration-300 leading-none">
                            {industry.title}
                          </h3>
                          <p className="text-zinc-300 text-xs md:text-sm font-['Inter'] leading-relaxed mb-6 max-w-sm">
                            {industry.desc}
                          </p>

                          <div className="flex gap-12 mt-auto border-l-2 border-[#F23030] pl-6">
                            {industry.stats.map((stat, idx) => (
                              <div key={idx}>
                                <p className="text-2xl font-['Inter'] font-black text-white leading-none">{stat.val}</p>
                                <p className="text-[10px] font-['Inter'] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-2">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Space at the bottom to allow last card to be viewed */}
        <div className="h-[20vh]" />
      </main>
    </ReactLenis>
  );
});

StackingIndustries.displayName = 'StackingIndustries';

export default StackingIndustries;
