'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.philosophy-text', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
      
      // Parallax effect on background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 overflow-hidden bg-black flex items-center justify-center border-y border-slate/20">
      {/* Parallax texture overlay */}
      <div 
        className="parallax-bg absolute inset-0 w-full h-[130%] -top-[15%] opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.5) grayscale(1)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian opacity-90" />
      
      <div ref={textRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 text-center space-y-16">
        <div className="philosophy-text">
          <p className="font-mono text-champagne/80 text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
            The Manifesto
          </p>
          <div className="w-[1px] h-12 bg-champagne/30 mx-auto" />
        </div>
        
        <div className="space-y-8">
          <h2 className="philosophy-text font-drama italic text-ivory text-4xl md:text-6xl lg:text-8xl leading-tight">
            We focus on: <br />
            <span className="text-champagne">The perfect pour.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
