import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'JavaScript', x: 50, y: 20 },
  { name: 'TypeScript', x: 20, y: 40 },
  { name: 'React', x: 80, y: 40 },
  { name: 'Three.js', x: 35, y: 70 },
  { name: 'Node.js', x: 65, y: 70 },
  { name: 'GSAP', x: 50, y: 90 },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      if (linesRef.current) {
        const paths = linesRef.current.querySelectorAll('line');
        tl.fromTo(
          paths,
          { strokeDasharray: 500, strokeDashoffset: 500 },
          { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: 'power2.inOut' }
        );
      }

      tl.fromTo(
        nodesRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
        '-=1'
      );

      // Floating animation
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.to(node, {
          y: '+=15',
          x: '+=10',
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });

        // Magnetic Effect on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distX = e.clientX - centerX;
          const distY = e.clientY - centerY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < 150) {
            gsap.to(node, {
              x: distX * 0.3,
              y: distY * 0.3,
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            gsap.to(node, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)'
            });
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] py-32 px-4 overflow-hidden" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-20 justify-end">
          <div className="h-[2px] flex-grow bg-gradient-to-l from-blue-500 to-transparent"></div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter">
            TECH <span className="text-blue-500">ARSENAL</span>
          </h2>
          <div className="h-[2px] w-20 bg-blue-500"></div>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[500px]">
          <svg ref={linesRef} className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connect nodes */}
            <line x1="50%" y1="20%" x2="20%" y2="40%" stroke="rgba(220,38,38,0.4)" strokeWidth="2" />
            <line x1="50%" y1="20%" x2="80%" y2="40%" stroke="rgba(37,99,235,0.4)" strokeWidth="2" />
            <line x1="20%" y1="40%" x2="35%" y2="70%" stroke="rgba(220,38,38,0.4)" strokeWidth="2" />
            <line x1="80%" y1="40%" x2="65%" y2="70%" stroke="rgba(37,99,235,0.4)" strokeWidth="2" />
            <line x1="35%" y1="70%" x2="50%" y2="90%" stroke="rgba(168,85,247,0.4)" strokeWidth="2" />
            <line x1="65%" y1="70%" x2="50%" y2="90%" stroke="rgba(168,85,247,0.4)" strokeWidth="2" />
            <line x1="20%" y1="40%" x2="80%" y2="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="35%" y1="70%" x2="65%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
          </svg>

          {skills.map((skill, i) => (
            <div
              key={i}
              ref={(el) => { nodesRef.current[i] = el; }}
              className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-black/80 border-2 border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.4)] backdrop-blur-sm hover-target cursor-pointer group z-10"
              style={{ left: `calc(${skill.x}% - 3rem)`, top: `calc(${skill.y}% - 3rem)` }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-sm font-bold text-white font-mono text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
