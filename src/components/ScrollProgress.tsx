import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Set initial progress
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none bg-white/10 backdrop-blur-sm">
      <div 
        className="h-full bg-red-600 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
