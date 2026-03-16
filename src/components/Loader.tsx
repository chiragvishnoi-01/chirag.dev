import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    // Text Reveal Animation
    tl.fromTo(
      textRef.current,
      { 
        opacity: 0, 
        y: 20, 
        scale: 0.9,
        letterSpacing: '0.5em',
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        letterSpacing: '0.1em',
        filter: 'blur(0px)',
        duration: 1.5, 
        ease: 'expo.out' 
      }
    );

    // Glowing/Shimmer Effect
    tl.to(textRef.current, {
      textShadow: '0 0 20px rgba(237,29,36,0.8), 0 0 40px rgba(237,29,36,0.4)',
      duration: 0.8,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut'
    });

    // Exit Animation
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(20px)',
      duration: 0.8,
      ease: 'expo.in'
    });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="relative overflow-hidden">
        <h1 
          ref={textRef}
          className="text-5xl md:text-8xl font-black font-display text-white tracking-widest uppercase selection:bg-none pointer-events-none"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
        >
          chirag<span className="text-[#ed1d24]">.</span>dev
        </h1>
        
        {/* Animated Line underneath */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ed1d24] origin-left scale-x-0 animate-[shimmer_2s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.1% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
}
