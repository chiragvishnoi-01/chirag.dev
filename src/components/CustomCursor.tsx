import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
      setIsDesktop(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { scale: 0.5, duration: 0.2 });
      gsap.to(followerRef.current, { scale: 2, borderColor: '#ed1d24', backgroundColor: 'rgba(237,29,36,0.1)', duration: 0.2 });
      
      // Spider-Sense Ripple Effect
      const ripple = document.createElement('div');
      ripple.className = 'fixed rounded-full border-2 border-red-500 pointer-events-none z-[101]';
      document.body.appendChild(ripple);
      
      gsap.fromTo(ripple, 
        { width: 0, height: 0, top: e.clientY, left: e.clientX, xPercent: -50, yPercent: -50, opacity: 1 },
        { width: 150, height: 150, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    const onMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      gsap.to(followerRef.current, { scale: 1, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'transparent', duration: 0.2 });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursorRef.current, { scale: 2, backgroundColor: 'rgba(220, 38, 38, 0.5)', duration: 0.3 });
      gsap.to(followerRef.current, { scale: 1.5, borderColor: 'rgba(37, 99, 235, 0.8)', duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'white', duration: 0.3 });
      gsap.to(followerRef.current, { scale: 1, borderColor: 'rgba(220, 38, 38, 0.5)', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const links = document.querySelectorAll('a, button, .hover-target, input, textarea');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="hidden md:block">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      ></div>
    </div>
  );
}
