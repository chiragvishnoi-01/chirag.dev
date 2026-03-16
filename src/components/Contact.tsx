import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const spiderRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isFocused) {
      gsap.to(spiderRef.current, { y: 180, duration: 1.5, ease: 'elastic.out(1, 0.3)' });
      gsap.to(threadRef.current, { height: 180, duration: 1.5, ease: 'elastic.out(1, 0.3)' });
    } else {
      gsap.to(spiderRef.current, { y: 0, duration: 1, ease: 'power2.inOut' });
      gsap.to(threadRef.current, { height: 0, duration: 1, ease: 'power2.inOut' });
    }
  }, [isFocused]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/chiragvishnoi96@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 px-4 flex flex-col items-center justify-center min-h-screen overflow-hidden" id="contact">
      {/* High-Tech Web Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 70%)'
      }}></div>
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <path d="M50 50 L0 0 M50 50 L50 0 M50 50 L100 0 M50 50 L100 50 M50 50 L100 100 M50 50 L50 100 M50 50 L0 100 M50 50 L0 50" stroke="#2563eb" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="10" stroke="#2563eb" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="25" stroke="#2563eb" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="40" stroke="#2563eb" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
      </svg>

      {/* Hanging Spider */}
      <div className="absolute top-0 left-[15%] md:left-[25%] z-50 flex flex-col items-center pointer-events-none">
        <div ref={threadRef} className="w-[1px] bg-gradient-to-b from-transparent to-red-500 h-0"></div>
        <div ref={spiderRef} className="w-10 h-10 text-red-500 transform rotate-180 -mt-2 drop-shadow-[0_0_10px_rgba(237,29,36,0.8)]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 45 C 30 45, 25 70, 35 90 C 45 100, 55 100, 65 90 C 75 70, 70 45, 50 45 Z" />
            <path d="M50 15 C 40 15, 35 25, 35 35 C 35 45, 40 50, 50 50 C 60 50, 65 45, 65 35 C 65 25, 60 15, 50 15 Z" />
            <path d="M45 15 L40 5 L45 10 Z" />
            <path d="M55 15 L60 5 L55 10 Z" />
            <path d="M 38 30 Q 15 10 5 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 35 38 Q 10 30 5 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 35 45 Q 5 55 10 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 38 52 Q 15 80 20 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 62 30 Q 85 10 95 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 65 38 Q 90 30 95 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 65 45 Q 95 55 90 75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 62 52 Q 85 80 80 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      
      <div className="z-10 flex flex-col items-center mb-12">
        <div className="inline-block px-4 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 rounded-full">
          Secure Channel
        </div>
        <h2 className="text-5xl md:text-7xl font-black font-display text-white text-center uppercase tracking-tighter">
          SEND A <span className="text-red-500">SIGNAL</span>
        </h2>
        <p className="text-gray-400 mt-4 text-center max-w-md font-mono text-sm leading-relaxed">
          Ready to build something legendary? Reach out via the form below or at <a href="mailto:chiragvishnoi96@gmail.com" className="text-red-500 hover:underline">chiragvishnoi96@gmail.com</a>
        </p>
      </div>

      <form ref={formRef} className="w-full max-w-lg space-y-6 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]" onSubmit={handleSubmit}>
        <div className="relative group">
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-black/50 border border-white/20 rounded-lg py-4 px-5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all peer hover-target"
            placeholder=" "
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label htmlFor="name" className="absolute left-5 top-4 text-gray-500 font-mono transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-red-500 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-red-500 bg-[#0a0a0a] px-2 rounded">
            Your Identity
          </label>
        </div>

        <div className="relative group">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-black/50 border border-white/20 rounded-lg py-4 px-5 text-white font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer hover-target"
            placeholder=" "
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label htmlFor="email" className="absolute left-5 top-4 text-gray-500 font-mono transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500 bg-[#0a0a0a] px-2 rounded">
            Comms Frequency (Email)
          </label>
        </div>

        <div className="relative group">
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full bg-black/50 border border-white/20 rounded-lg py-4 px-5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all peer hover-target resize-none mt-2"
            placeholder=" "
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
          <label htmlFor="message" className="absolute left-5 top-6 text-gray-500 font-mono transition-all peer-focus:-top-1 peer-focus:text-xs peer-focus:text-red-500 peer-valid:-top-1 peer-valid:text-xs peer-valid:text-red-500 bg-[#0a0a0a] px-2 rounded">
            The Mission Details
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-4 ${status === 'success' ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'} text-white font-black uppercase tracking-widest rounded-lg transition-all hover-target relative overflow-hidden group shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-50`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {status === 'sending' ? 'Sending Signal...' : status === 'success' ? 'Signal Received!' : 'Thwip! (Send)'}
            {status === 'idle' && (
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </span>
          {status === 'idle' && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0 opacity-80"></div>}
        </button>
        
        {status === 'error' && (
          <p className="text-red-500 text-center font-mono text-xs mt-2">Error sending signal. Please try again or email directly.</p>
        )}
      </form>

      {/* Social Links */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 z-10 px-4">
        {[
          { name: 'GitHub', url: 'https://github.com/chiragvishnoi-01', color: 'hover:text-white' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chiragvishnoi01/', color: 'hover:text-blue-500' },
          { name: 'Instagram', url: 'https://instagram.com/chiragvishnoi01', color: 'hover:text-pink-500' },
        ].map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-500 font-display text-2xl md:text-3xl uppercase tracking-tighter transition-all duration-300 ${social.color} hover:scale-110 hover-target`}
          >
            {social.name}
          </a>
        ))}
      </div>
    </section>
  );
}
