import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Philosophy from "@/components/landing/Philosophy";
import Protocol from "@/components/landing/Protocol";
import Footer from "@/components/landing/Footer";
import "./landing.css"; // We will create this file for scoped styles

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair"
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export default function Home() {
  return (
    <div className={`landing-page ${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans relative bg-[#0D0D12] text-[#FAF8F5] min-h-screen selection:bg-[#C9A84C] selection:text-[#0D0D12]`}>
      {/* Global Noise Overlay */}
      <div className="noise-overlay pointer-events-none z-[9999]"></div>
      
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
      </main>
      <Footer />
    </div>
  );
}
