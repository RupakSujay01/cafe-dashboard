'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentHour = new Date().getHours();
  // Let's assume hours are 8 AM to 10 PM (22:00)
  const isCafeOpen = currentHour >= 8 && currentHour < 22;

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl rounded-full ${isScrolled ? 'bg-obsidian/60 backdrop-blur-xl border border-slate/50 shadow-2xl py-3' : 'bg-transparent py-4 border border-transparent'}`}>
      <div className="flex items-center justify-between px-6 md:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-champagne/20 to-transparent border border-champagne/30 group-hover:border-champagne/80 group-hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all duration-500 overflow-hidden" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <div className="absolute inset-0 bg-obsidian/50 mix-blend-multiply"></div>
            <span className="relative z-10 font-drama italic text-3xl text-champagne font-light drop-shadow-md group-hover:scale-110 transition-transform duration-500">
              A
            </span>
          </div>
          <span className="font-sans font-bold tracking-widest uppercase text-sm hidden sm:block text-ivory">
            Arcane
          </span>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {['Reserve a Table', 'Explore the Gallery', 'View Menu'].map((item) => (
            <a key={item} href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} className="text-xs uppercase tracking-widest font-sans text-ivory/70 hover:text-champagne transition-all duration-300 hover:scale-[1.03] inline-block" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              {item}
            </a>
          ))}
          <a href="/login" className="text-xs uppercase tracking-widest font-sans bg-champagne text-obsidian px-5 py-2.5 rounded-full hover:bg-ivory hover:text-obsidian transition-all duration-300 hover:scale-[1.05] font-bold inline-block shadow-[0_0_15px_rgba(201,168,76,0.2)] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            Sign In
          </a>
        </div>

        {/* Status Indicator & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate/30 border border-slate/50">
            <div className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-[10px] font-mono uppercase tracking-widest text-ivory/80">
              {isCafeOpen ? 'Live / Open' : 'Offline / Closed'}
            </span>
          </div>
          
          <button 
            className="md:hidden text-ivory p-2 hover:bg-slate/50 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-full bg-obsidian/90 backdrop-blur-2xl border border-slate/50 rounded-[2rem] p-6 flex flex-col gap-6 md:hidden">
          {['Reserve a Table', 'Explore the Gallery', 'View Menu'].map((item) => (
            <a key={item} href={`#${item.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm uppercase tracking-widest font-sans text-ivory hover:text-champagne transition-colors" onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
          <a href="/login" className="text-sm uppercase tracking-widest font-sans bg-champagne text-obsidian px-5 py-2.5 rounded-full hover:bg-ivory hover:text-obsidian transition-all duration-300 font-bold inline-block text-center" onClick={() => setIsOpen(false)}>
            Sign In
          </a>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate/30 border border-slate/50 self-start">
            <div className={`w-2 h-2 rounded-full ${isCafeOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs font-mono uppercase tracking-widest text-ivory/80">
              {isCafeOpen ? 'Live / Open' : 'Offline / Closed'}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
