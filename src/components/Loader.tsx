import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<SVGSVGElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Spider dropping animation
    tl.fromTo(
      spiderRef.current,
      { y: -200, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'bounce.out' }
    );

    // Web drawing animation
    if (webRef.current) {
      const paths = webRef.current.querySelectorAll('path');
      tl.fromTo(
        paths,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, stagger: 0.1, ease: 'power2.inOut' },
        '-=0.5'
      );
    }

    // Tear open effect
    tl.to(webRef.current, {
      scale: 5,
      opacity: 0,
      duration: 1,
      ease: 'power4.in',
    });
    tl.to(spiderRef.current, {
      scale: 5,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in',
    }, '<');
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
    >
      <div ref={spiderRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-red-600 drop-shadow-[0_0_20px_rgba(237,29,36,0.8)]">
        <svg className="w-20 h-20" viewBox="0 0 100 100" fill="currentColor">
          {/* Abdomen */}
          <path d="M50 45 C 30 45, 25 70, 35 90 C 45 100, 55 100, 65 90 C 75 70, 70 45, 50 45 Z" />
          {/* Cephalothorax */}
          <path d="M50 15 C 40 15, 35 25, 35 35 C 35 45, 40 50, 50 50 C 60 50, 65 45, 65 35 C 65 25, 60 15, 50 15 Z" />
          {/* Mandibles */}
          <path d="M45 15 L40 5 L45 10 Z" />
          <path d="M55 15 L60 5 L55 10 Z" />
          {/* Legs Left */}
          <path d="M 38 30 Q 15 10 5 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 35 38 Q 10 30 5 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 35 45 Q 5 55 10 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 38 52 Q 15 80 20 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          {/* Legs Right */}
          <path d="M 62 30 Q 85 10 95 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 65 38 Q 90 30 95 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 65 45 Q 95 55 90 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M 62 52 Q 85 80 80 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <svg
        ref={webRef}
        className="w-full h-full max-w-2xl max-h-2xl stroke-blue-500/30 stroke-[1.5] fill-transparent"
        viewBox="0 0 100 100"
      >
        <path d="M50 50 L50 0 M50 50 L100 50 M50 50 L50 100 M50 50 L0 50 M50 50 L15 15 M50 50 L85 15 M50 50 L85 85 M50 50 L15 85" />
        <path d="M25 50 A 25 25 0 0 1 50 25 A 25 25 0 0 1 75 50 A 25 25 0 0 1 50 75 A 25 25 0 0 1 25 50" />
        <path d="M10 50 A 40 40 0 0 1 50 10 A 40 40 0 0 1 90 50 A 40 40 0 0 1 50 90 A 40 40 0 0 1 10 50" />
        <path d="M37 50 A 13 13 0 0 1 50 37 A 13 13 0 0 1 63 50 A 13 13 0 0 1 50 63 A 13 13 0 0 1 37 50" />
      </svg>
    </div>
  );
}
