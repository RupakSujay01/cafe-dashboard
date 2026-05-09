'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Features = () => {
  // Card 1: Global Tapas Fusion (Morphing Slider)
  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavors = [
    { 
      name: 'Umami', 
      color: 'bg-[#4A3B32]', 
      note: 'Truffle & aged soy reduction',
      image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800'
    },
    { 
      name: 'Acidic', 
      color: 'bg-[#5C3A21]', 
      note: 'Yuzu & charred citrus',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800'
    },
    { 
      name: 'Smoke', 
      color: 'bg-[#2A2A35]', 
      note: 'Applewood smoked wagyu',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="features" className="py-32 px-6 md:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-20 text-center">
        <h2 className="font-sans font-bold text-champagne uppercase tracking-[0.3em] text-xs mb-4">Functional Artifacts</h2>
        <p className="font-drama italic text-4xl md:text-6xl text-ivory">Sensory Immersion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Global Tapas Fusion */}
        <div className={`glass-card p-8 h-[400px] flex flex-col justify-between relative overflow-hidden transition-colors duration-1000 ${flavors[flavorIndex].color}`}>
          <div className="relative z-10">
            <h3 className="font-sans font-bold text-ivory tracking-widest uppercase text-xs mb-2">Global Tapas Fusion</h3>
            <p className="font-mono text-ivory/60 text-xs">Flavor Profile Matrix</p>
          </div>
          
          <div className="relative z-10 flex gap-6 items-end h-full mt-10">
            {/* Vertical Slider implementation */}
            <div className="w-1.5 h-full bg-obsidian/40 rounded-full relative">
              <div 
                className="absolute w-full bg-champagne rounded-full transition-all duration-500"
                style={{ 
                  height: '33%', 
                  top: `${flavorIndex * 33.33}%` 
                }}
              />
            </div>
            
            <div className="flex-1 space-y-6 flex flex-col justify-between h-full py-4">
              {flavors.map((f, i) => (
                <div 
                  key={f.name} 
                  className={`cursor-pointer transition-all duration-300 ${i === flavorIndex ? 'opacity-100 scale-105 ml-2' : 'opacity-40 hover:opacity-70'}`}
                  onClick={() => setFlavorIndex(i)}
                >
                  <p className="font-drama italic text-2xl text-ivory">{f.name}</p>
                  {i === flavorIndex && (
                    <p className="font-mono text-[10px] text-ivory/80 mt-1 uppercase tracking-wider animate-pulse">
                      &gt; {f.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Architectural Immersion */}
        <div className="glass-card p-8 h-[400px] bg-obsidian/80 flex flex-col relative overflow-hidden group">
          {/* Dynamic Background Image based on flavorIndex */}
          {flavors.map((f, i) => (
            <div 
              key={f.name}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === flavorIndex ? 'opacity-70' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${f.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'luminosity'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent z-[1]" />
          
          <div className="relative z-10 mt-auto">
            <h3 className="font-sans font-bold text-ivory tracking-widest uppercase text-xs mb-2">Architectural Immersion</h3>
            <p className="font-mono text-champagne text-xs">Sensory Environment</p>
          </div>
        </div>

        {/* Card 3: Intimate Subterranean Beats */}
        <div className="glass-card p-8 h-[400px] bg-slate/10 overflow-hidden relative group">
          <div className="relative z-10">
            <h3 className="font-sans font-bold text-ivory tracking-widest uppercase text-xs mb-2">Intimate Subterranean Beats</h3>
            <p className="font-mono text-ivory/60 text-xs">Acoustic Coordinates</p>
          </div>
          
          {/* Interactive Grid Map */}
          <div className="absolute inset-0 top-20 flex items-center justify-center p-8">
            <div className="w-full h-full border border-champagne/10 relative"
                 style={{
                   backgroundImage: 'linear-gradient(rgba(201, 168, 76, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.05) 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }}
            >
              <div className="absolute w-full h-[1px] bg-champagne/20 top-1/2 -translate-y-1/2"></div>
              <div className="absolute h-full w-[1px] bg-champagne/20 left-1/2 -translate-x-1/2"></div>
              
              {/* Pulsing Dot */}
              <div className="absolute top-[60%] left-[70%] w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-champagne group-hover:scale-150 transition-transform duration-700">
                <div className="absolute inset-0 rounded-full bg-champagne animate-ping opacity-75"></div>
              </div>
              
              {/* Coordinates */}
              <div className="absolute top-[65%] left-[45%] font-mono text-[10px] text-champagne/80 border border-champagne/30 bg-obsidian/80 px-2 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                BPM: 118 | SECTOR: DEEP
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
