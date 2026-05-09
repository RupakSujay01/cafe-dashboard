'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinning each card sequentially
      cardsRef.current.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "+=100%", // Keeps it pinned for 1 viewport height
          scrub: true,
          // Optional: slight fade out of previous cards as new ones come in
          animation: index > 0 ? gsap.fromTo(cardsRef.current[index - 1], { opacity: 1 }, { opacity: 0.3 }) : null,
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-obsidian">
      
      {/* Card 1: Geometric Motif */}
      <div 
        ref={el => cardsRef.current[0] = el}
        className="w-full h-[100dvh] flex flex-col md:flex-row items-center justify-center p-8 bg-obsidian border-t border-slate/20 absolute top-0 left-0 z-[1]"
      >
        <div className="flex-1 max-w-lg md:pr-12 z-10">
          <p className="font-mono text-champagne text-xs uppercase tracking-widest mb-4">Phase 01</p>
          <h2 className="font-drama italic text-5xl md:text-7xl text-ivory mb-6">The Raw Geometry</h2>
          <p className="font-sans text-slate-400 font-light text-sm md:text-base leading-relaxed">
            Every bean is a perfect architectural structure containing hundreds of volatile aromatic compounds. We respect the geometry of the raw material before applying thermal pressure.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center h-64 md:h-full relative opacity-80 mt-12 md:mt-0">
          {/* Slowly rotating geometric motif */}
          <div className="w-64 h-64 border border-champagne/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="w-48 h-48 border border-champagne/50 rotate-45 flex items-center justify-center">
               <div className="w-32 h-32 border border-champagne rotate-45 flex items-center justify-center">
                 <div className="w-4 h-4 bg-champagne rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Roast Curve */}
      <div 
        ref={el => cardsRef.current[1] = el}
        className="w-full h-[100dvh] flex flex-col md:flex-row items-center justify-center p-8 bg-[#0a0a0f] border-t border-slate/30 absolute top-[100dvh] left-0 z-[2]"
      >
        <div className="flex-1 max-w-lg md:pr-12 z-10">
          <p className="font-mono text-champagne text-xs uppercase tracking-widest mb-4">Phase 02</p>
          <h2 className="font-drama italic text-5xl md:text-7xl text-ivory mb-6">Thermal Precision</h2>
          <p className="font-sans text-slate-400 font-light text-sm md:text-base leading-relaxed">
            Heat is not applied; it is sculpted. Our roasting curves are mapped with industrial precision, tracking the exact moment of structural change to unlock the hidden matrix of flavor.
          </p>
        </div>
        <div className="flex-1 w-full max-w-md h-64 relative mt-12 md:mt-0 bg-obsidian/50 border border-slate/50 p-4 rounded-xl overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Simulated Curve using SVG */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 100 50" preserveAspectRatio="none">
            <path d="M 0 45 Q 30 45 50 25 T 100 5" fill="none" stroke="#C9A84C" strokeWidth="1" />
          </svg>
          
          {/* Scanning Laser Line */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20 animate-[scan_4s_ease-in-out_infinite_alternate]" style={{ animationName: 'scan' }}></div>
          
          <style>{`
            @keyframes scan {
              0% { left: 0%; }
              100% { left: 100%; }
            }
          `}</style>
        </div>
      </div>

      {/* Card 3: Extraction Waveform */}
      <div 
        ref={el => cardsRef.current[2] = el}
        className="w-full h-[100dvh] flex flex-col md:flex-row items-center justify-center p-8 bg-[#111116] border-t border-slate/40 absolute top-[200dvh] left-0 z-[3]"
      >
        <div className="flex-1 max-w-lg md:pr-12 z-10">
          <p className="font-mono text-champagne text-xs uppercase tracking-widest mb-4">Phase 03</p>
          <h2 className="font-drama italic text-5xl md:text-7xl text-ivory mb-6">Liquid Architecture</h2>
          <p className="font-sans text-slate-400 font-light text-sm md:text-base leading-relaxed">
            The final extraction under 9 bars of pressure. We measure the heartbeat of the espresso, monitoring the flow rate down to the millisecond to ensure a flawless crema.
          </p>
        </div>
        <div className="flex-1 w-full flex justify-center items-center h-64 mt-12 md:mt-0 relative overflow-hidden">
          {/* Pulsing Waveform */}
          <div className="flex items-center gap-1 h-32">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-2 bg-champagne rounded-full"
                style={{
                  height: `${Math.random() * 100}%`,
                  animation: `pulseHeight ${1 + Math.random()}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          <style>{`
            @keyframes pulseHeight {
              0% { transform: scaleY(0.3); opacity: 0.4; }
              100% { transform: scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      </div>

      {/* Spacer to allow scrolling through the pinned absolute cards */}
      <div className="h-[300dvh] w-full"></div>

    </section>
  );
};

export default Protocol;
