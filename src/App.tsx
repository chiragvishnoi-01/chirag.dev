import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden selection:bg-red-600 selection:text-white font-sans">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 mix-blend-difference pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="font-black font-display text-2xl tracking-tighter uppercase text-white">
            chirag.dev
          </div>
          <div className="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest text-white">
            <a href="#home" className="hover:text-red-500 transition-colors hover-target">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors hover-target">Origin</a>
            <a href="#projects" className="hover:text-red-500 transition-colors hover-target">Missions</a>
            <a href="#contact" className="hover:text-red-500 transition-colors hover-target">Comms</a>
          </div>
          <div className="md:hidden text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </div>
        </div>
      </nav>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Background3D />
        </Canvas>
      </div>

      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              Copyright © {new Date().getFullYear()} | Made by <span className="text-white hover:text-red-500 transition-colors cursor-pointer">chirag.dev</span>
            </div>
            <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              <a href="#home" className="hover:text-white transition-colors">Back to Top</a>
              <a href="#contact" className="hover:text-white transition-colors">Get in Touch</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
