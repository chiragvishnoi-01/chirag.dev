import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { 
    title: 'Mastering the Web Shooters', 
    category: 'WebSockets',
    date: 'Oct 14, 2026',
    excerpt: 'A deep dive into building real-time targeting systems with ultra-low latency.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Swinging Through the DOM', 
    category: 'React Performance',
    date: 'Sep 28, 2026',
    excerpt: 'How to optimize your React applications to be as agile as a spider.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Spider-Sense: Error Handling', 
    category: 'Node.js',
    date: 'Aug 12, 2026',
    excerpt: 'Catching bugs before they crash your production environment.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
  },
];

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 md:px-20" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm uppercase tracking-widest mb-4 rounded-full">
            Daily Bugle Digital
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter">
            LATEST <span className="text-red-500">HEADLINES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover-target cursor-pointer shadow-lg hover:shadow-red-500/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Content */}
              <div className="p-8 relative z-20 -mt-6">
                {/* Decorative line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-red-500 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-center mb-4 pt-2">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-1 rounded">{article.category}</span>
                  <span className="text-xs text-gray-500 font-mono">{article.date}</span>
                </div>
                
                <h3 className="text-2xl font-black font-display text-white mb-3 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-white group-hover:text-red-500 transition-colors uppercase tracking-wider">
                  Read Article
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
