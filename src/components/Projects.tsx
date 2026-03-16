import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: 'Web Shooter App', 
    desc: 'A real-time targeting system built with WebSockets and Three.js for spatial tracking.', 
    img: 'https://picsum.photos/seed/spidertech/800/600',
    tags: ['React', 'Three.js', 'WebSockets']
  },
  { 
    title: 'Daily Bugle Portal', 
    desc: 'High-traffic news platform with Next.js and ISR. Handles millions of concurrent readers.', 
    img: 'https://picsum.photos/seed/newspaper/800/600',
    tags: ['Next.js', 'Tailwind', 'GraphQL']
  },
  { 
    title: 'Oscorp Dashboard', 
    desc: 'Complex data visualization for enterprise metrics. Secure and highly performant.', 
    img: 'https://picsum.photos/seed/dashboard/800/600',
    tags: ['Vue', 'D3.js', 'Node.js']
  },
  { 
    title: 'Stark Integration', 
    desc: 'API gateway connecting various microservices across the Avengers network.', 
    img: 'https://picsum.photos/seed/stark/800/600',
    tags: ['TypeScript', 'Express', 'Redis']
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // 3D Tilt Effect on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          gsap.to(card.querySelector('.tilt-content'), {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: 'power1.out',
            duration: 0.3
          });
          
          // Move the glow effect
          gsap.to(card.querySelector('.glow-effect'), {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            opacity: 1,
            duration: 0.3
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card.querySelector('.tilt-content'), {
            rotationX: 0,
            rotationY: 0,
            ease: 'power3.out',
            duration: 0.8
          });
          gsap.to(card.querySelector('.glow-effect'), {
            opacity: 0,
            duration: 0.8
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-4 md:px-20" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <div className="h-[2px] w-20 bg-red-500"></div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter">
            FEATURED <span className="text-red-500">MISSIONS</span>
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-red-500 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative h-[400px] rounded-2xl cursor-pointer hover-target"
              style={{ perspective: '1000px' }}
            >
              <div className="tilt-content w-full h-full relative transform-style-3d transition-transform duration-200 ease-out rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
                
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-80 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                  style={{ backgroundImage: `url(${project.img})` }}
                ></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                {/* Mouse Follow Glow */}
                <div className="glow-effect absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none"></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-z-10">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-black font-display text-white mb-3 uppercase tracking-tight drop-shadow-lg">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-mono text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spider Web Corner Decoration */}
                <svg className="absolute top-0 right-0 w-24 h-24 stroke-white/20 stroke-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 -translate-y-4" viewBox="0 0 100 100">
                  <path d="M100 0 L0 0 M100 0 L100 100 M100 0 L50 100 M100 0 L0 50" fill="none" />
                  <path d="M80 0 A 80 80 0 0 0 100 20" fill="none" />
                  <path d="M60 0 A 60 60 0 0 0 100 40" fill="none" />
                  <path d="M40 0 A 40 40 0 0 0 100 60" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
