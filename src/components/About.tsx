import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 50, rotationY: 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // 3D Tilt Effect on the ID Card
      if (cardRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = cardRef.current!.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -15;
          const rotateY = ((x - centerX) / centerX) * 15;

          gsap.to(cardRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: 'power1.out',
            duration: 0.3
          });
          
          // Move the holographic glare
          const glare = cardRef.current!.querySelector('.glare');
          if (glare) {
            gsap.to(glare, {
              x: x - rect.width / 2,
              y: y - rect.height / 2,
              opacity: 0.8,
              duration: 0.3
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            ease: 'power3.out',
            duration: 0.8
          });
          const glare = cardRef.current!.querySelector('.glare');
          if (glare) {
            gsap.to(glare, {
              opacity: 0,
              duration: 0.8
            });
          }
        };

        cardRef.current.addEventListener('mousemove', handleMouseMove);
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-4 md:px-20 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div ref={textRef} className="z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-red-500"></div>
            <h2 className="text-sm md:text-base font-mono text-red-500 uppercase tracking-[0.3em]">
              Origin Story
            </h2>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter mb-8">
            Bitten by a <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">Radioactive Bug</span>
          </h3>
          
          <div className="space-y-6 text-gray-400 font-mono text-sm md:text-base leading-relaxed">
            <p>
              I'm a B.Tech 2nd-year student with a deep passion for web development. I love exploring and mastering all modern frameworks and technologies to build scalable digital solutions.
            </p>
            <p>
              As an AI-ready web developer, I integrate cutting-edge artificial intelligence capabilities into my projects, weaving complex digital webs with React, Three.js, and WordPress.
            </p>
            <p className="text-white border-l-2 border-red-500 pl-4 italic">
              "Building the future of the web, one mission at a time, with all modern tech stacks."
            </p>
          </div>

          <div className="mt-12 flex gap-4">
            <a href="/myresume.docx" download className="px-8 py-3 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-700 transition-colors hover-target skew-x-[-10deg]">
              <span className="block skew-x-[10deg]">View Resume</span>
            </a>
          </div>
        </div>

        {/* 3D ID Card */}
        <div className="relative z-10 flex justify-center perspective-1000">
          <div 
            ref={cardRef}
            className="relative w-full max-w-md aspect-[2/3] rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden transform-style-3d shadow-[0_0_50px_rgba(237,29,36,0.2)]"
          >
            {/* Holographic Glare */}
            <div className="glare absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none mix-blend-overlay z-50"></div>
            
            {/* Card Header */}
            <div className="h-24 bg-gradient-to-r from-red-600 to-red-900 flex items-center justify-between px-6 border-b border-white/20">
              <div className="font-black font-display text-white text-2xl tracking-tighter">STARK IND.</div>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="opacity-50">
                <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" strokeDasharray="5 5"/>
                <circle cx="50" cy="50" r="20" fill="white"/>
              </svg>
            </div>

            {/* Profile Image Placeholder */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-black bg-zinc-800 overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-[url('https://github.com/chiragvishnoi-01.png')] bg-cover bg-center mix-blend-luminosity opacity-80"></div>
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            </div>

            {/* Card Body */}
            <div className="pt-28 px-8 pb-8 flex flex-col items-center text-center">
              <h4 className="text-3xl font-black font-display text-white uppercase tracking-tighter mb-1">chirag.DEv</h4>
              <p className="text-red-500 font-mono text-xs tracking-widest mb-6">ID: SPDR-001</p>
              
              <div className="w-full space-y-4 text-left">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-500 font-mono text-xs uppercase">Clearance</span>
                  <span className="text-white font-mono text-xs font-bold">Level 8 (Avenger)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-500 font-mono text-xs uppercase">Specialty</span>
                  <span className="text-white font-mono text-xs font-bold">Full Stack & WordPress</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-500 font-mono text-xs uppercase">Status</span>
                  <span className="text-emerald-500 font-mono text-xs font-bold animate-pulse">Active</span>
                </div>
              </div>

              {/* Barcode */}
              <div className="mt-auto pt-8 w-full flex justify-center opacity-50">
                <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,white,white_2px,transparent_2px,transparent_4px,white_4px,white_5px,transparent_5px,transparent_8px)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
