import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // For Spidey eyes
  const [leftEye, setLeftEye] = useState({ x: 32, y: 55 });
  const [rightEye, setRightEye] = useState({ x: 68, y: 55 });

  useEffect(() => {
    // Canvas Particle Network
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 - dist / 150 * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dxMouse = p.x - mousePos.x;
        const dyMouse = p.y - mousePos.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(237, 29, 36, ${0.2 - distMouse / 200 * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resize);
    resize();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = (e.clientX - centerX) * 0.02;
        const distY = (e.clientY - centerY) * 0.02;

        gsap.to(logoRef.current, {
          x: distX,
          y: distY,
          rotationY: distX * 0.5,
          rotationX: -distY * 0.5,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      // Spidey Eyes Logic
      const spideyCenterX = window.innerWidth / 2;
      const spideyCenterY = window.innerHeight - 40;

      const angle = Math.atan2(e.clientY - spideyCenterY, e.clientX - spideyCenterX);
      const distance = Math.min(8, Math.sqrt(Math.pow(e.clientX - spideyCenterX, 2) + Math.pow(e.clientY - spideyCenterY, 2)) * 0.015);

      const eyeOffsetX = Math.cos(angle) * distance;
      const eyeOffsetY = Math.sin(angle) * distance;

      setLeftEye({ x: 32 + eyeOffsetX, y: 55 + eyeOffsetY });
      setRightEye({ x: 68 + eyeOffsetX, y: 55 + eyeOffsetY });
    };

    const handleMouseLeave = () => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          x: 0, y: 0, rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1, 0.3)'
        });
      }
      setLeftEye({ x: 32, y: 55 });
      setRightEye({ x: 68, y: 55 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]" id="home">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(250%) skewX(-45deg); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>

      {/* Particle Network Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Marvel Style Logo */}
      <div className="z-10 flex flex-col items-center justify-center w-full px-4" style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={logoRef}
          className="relative group cursor-pointer"
        >
          {/* Glowing shadow */}
          <div className="absolute inset-0 bg-[#ed1d24] blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

          <div className="bg-[#ed1d24] px-4 py-1 md:px-6 md:py-2 inline-block relative overflow-hidden shadow-[0_10px_30px_rgba(237,29,36,0.4)]">
            {/* Halftone texture overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

            {/* Shine effect */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-45deg] animate-shimmer pointer-events-none"></div>

            <h1
              className="text-6xl md:text-[9rem] leading-[0.9] font-black font-display text-white tracking-[-0.04em] relative z-10 uppercase"
              style={{ transform: 'scaleY(1.1)' }}
            >
              chirag.dev
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mt-12 md:mt-16 flex items-center gap-3 md:gap-6 text-xs md:text-sm font-bold tracking-[0.4em] uppercase z-10 drop-shadow-md">
          <span className="text-[#ed1d24]">Full Stack</span>
          <span className="text-white">Developer</span>
          <span className="text-blue-500">&</span>
          <span className="text-white">WordPress Wizard</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-12 z-10 px-4">
          {[
            { name: 'Instagram', url: 'https://instagram.com/chiragvishnoi01', color: 'text-pink-500' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chiragvishnoi01/', color: 'text-blue-500' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-display text-xl md:text-2xl uppercase tracking-tighter transition-all duration-300 ${social.color} hover:brightness-125 hover:scale-110 cursor-pointer`}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>

      {/* Cute Spidey at bottom */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 z-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(237,29,36,0.5)]">
          {/* Web line connecting to top */}
          <line x1="50" y1="0" x2="50" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 2" />

          {/* Head */}
          <path d="M50 20 C 20 20, 15 50, 25 75 C 35 95, 45 100, 50 100 C 55 100, 65 95, 75 75 C 85 50, 80 20, 50 20 Z" fill="#ed1d24" />

          {/* Web Pattern on Head (simplified) */}
          <path d="M50 20 L50 100 M25 75 L75 75 M30 50 L70 50 M35 35 L65 35" stroke="#880000" strokeWidth="1.5" opacity="0.6" fill="none" />
          <path d="M50 20 Q 35 50 25 75 M50 20 Q 65 50 75 75" stroke="#880000" strokeWidth="1.5" opacity="0.6" fill="none" />

          {/* Left Eye */}
          <path d="M46 45 C 46 45, 25 35, 18 55 C 18 55, 25 70, 46 65 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Right Eye */}
          <path d="M54 45 C 54 45, 75 35, 82 55 C 82 55, 75 70, 54 65 Z" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Left Pupil */}
          <circle cx={leftEye.x} cy={leftEye.y} r="3.5" fill="black" />
          {/* Right Pupil */}
          <circle cx={rightEye.x} cy={rightEye.y} r="3.5" fill="black" />
        </svg>
      </div>
    </section>
  );
}
