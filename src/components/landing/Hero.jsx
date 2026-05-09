'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.hero-text', 
        { 
          y: 100, 
          opacity: 0, 
          filter: 'blur(20px)' 
        },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.5, 
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Background Image with fetchpriority="high" */}
      <img 
        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000" 
        alt="Dark moody espresso crema" 
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      {/* Heavy primary-to-black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/80 to-obsidian" />
      <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 mt-20 md:mt-0 flex flex-col justify-center">
        <h1 className="flex flex-col">
          <span className="hero-text text-champagne font-sans font-bold uppercase tracking-[0.2em] text-sm md:text-lg lg:text-xl mb-4 md:mb-6 pl-1 md:pl-2">
            Architectural shadows meet
          </span>
          <span className="hero-text font-drama italic text-ivory text-5xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tight">
            Industrial <br className="hidden md:block"/> precision.
          </span>
        </h1>
        
        <div className="hero-text mt-12 md:mt-24">
          <p className="font-mono text-slate-300 text-xs md:text-sm max-w-sm leading-relaxed border-l border-champagne/50 pl-4">
            A sanctuary dedicated to the art of the perfect pour. Descend into the craft.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="hero-text absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-champagne/60">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-champagne/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
