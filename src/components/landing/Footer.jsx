'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const [roastTimeElapsed, setRoastTimeElapsed] = useState({ hours: 4, minutes: 12 });

  useEffect(() => {
    // Simulate roasting time increasing
    const interval = setInterval(() => {
      setRoastTimeElapsed(prev => {
        let newMins = prev.minutes + 1;
        let newHours = prev.hours;
        if (newMins >= 60) {
          newMins = 0;
          newHours += 1;
        }
        return { hours: newHours, minutes: newMins };
      });
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#050508] border-t border-champagne/10 pt-6 overflow-hidden rounded-t-[1.5rem] -mt-5 z-10 w-full">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-6 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left Side: Brand and Status */}
        <div className="space-y-8 max-w-md">
          <div>
            <h2 className="font-sans font-bold uppercase tracking-widest text-ivory text-xl mb-2">Arcane</h2>
            <p className="font-drama italic text-champagne text-2xl">The after-hours atelier.</p>
          </div>
          
          <div className="bg-slate/10 backdrop-blur-md p-4 rounded-xl border border-slate/30 inline-block">
            <p className="font-sans text-[10px] uppercase tracking-widest text-slate-300 mb-2">System Status</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-champagne animate-ping"></div>
              <p className="font-mono text-sm text-ivory">
                Current Batch: Roasted {roastTimeElapsed.hours}h {roastTimeElapsed.minutes}m ago
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Links and Action */}
        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Protocol</p>
              <a href="#" className="font-sans text-sm text-ivory/90 hover:text-champagne transition-colors">Manifesto</a>
              <a href="#" className="font-sans text-sm text-ivory/90 hover:text-champagne transition-colors">Origins</a>
              <a href="#" className="font-sans text-sm text-ivory/90 hover:text-champagne transition-colors">Extraction</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Connect</p>
              <a href="#" className="font-sans text-sm text-ivory/90 hover:text-champagne transition-colors flex items-center gap-1">Instagram <ArrowUpRight size={12} /></a>
              <a href="#" className="font-sans text-sm text-ivory/90 hover:text-champagne transition-colors flex items-center gap-1">Reservations <ArrowUpRight size={12} /></a>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate/20 w-full md:text-right">
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Arcane Roastery. All precision reserved.
            </p>
          </div>
        </div>

      </div>
      
      {/* Heavy bottom gradient to anchor the page */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-0"></div>
    </footer>
  );
};

export default Footer;
