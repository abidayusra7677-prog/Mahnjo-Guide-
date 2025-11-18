import React, { useEffect, useRef, useState } from 'react';
// We will repurpose Header.tsx as our Navbar.
import Navbar from './components/Header';

// --- ICONS ---
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
);
const GrowthIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const AIToolsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const MonetizationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v.01M12 18v-2m0-2v-2m0-2v-2m0-2V6m-7 6h14" /></svg>
);
const EditingIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);

// --- FLOATING SUBSCRIBE BUTTON ---
const FloatingSubscribe: React.FC = () => (
  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-brand-red text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300" aria-label="Subscribe to our YouTube channel">
    <YouTubeIcon className="w-8 h-8" />
  </a>
);

// --- A simple hook for scroll animations ---
const useFadeInOnScroll = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
};


// --- REUSABLE COMPONENTS ---
const Section: React.FC<{ id: string, className?: string, children: React.ReactNode }> = ({ id, className, children }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    useFadeInOnScroll(sectionRef);
    return (
        <section ref={sectionRef} id={id} className={`py-20 px-4 sm:px-6 lg:px-8 fade-in-section ${className || ''}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
};

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <h2 className={`text-4xl font-bold font-heading text-center mb-12 ${className || ''}`}>
        {children}
    </h2>
);


const App: React.FC = () => {
  return (
    <div className="bg-brand-charcoal text-brand-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-gray-900 to-black z-10"></div>
          <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
           <div className="absolute inset-0 bg-brand-charcoal opacity-60 z-0"></div>

          <div className="relative z-20 px-4">
            <h1 className="text-5xl md:text-7xl font-black font-heading mb-4 text-brand-white drop-shadow-lg animate-fade-in-down">
              Mahnjo <span className="text-brand-red">Guide</span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate-fade-in-up">
              Your Ultimate YouTube Learning Hub. Learn YouTube, Grow Faster, and Become a Successful Creator.
            </p>
            <div className="space-x-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <a href="#tutorials" className="inline-block bg-brand-red text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                Start Learning
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent border-2 border-brand-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-white hover:text-brand-charcoal transition-all duration-300 transform hover:scale-105">
                Watch Tutorials
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Section id="features" className="bg-gray-900/50">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                    { icon: <GrowthIcon className="w-10 h-10 text-brand-blue"/>, title: "YouTube Growth Tips" },
                    { icon: <AIToolsIcon className="w-10 h-10 text-brand-blue"/>, title: "AI Tools for Creators" },
                    { icon: <MonetizationIcon className="w-10 h-10 text-brand-blue"/>, title: "Monetization Guides" },
                    { icon: <EditingIcon className="w-10 h-10 text-brand-blue"/>, title: "Thumbnail & Editing" },
                ].map((feature, index) => (
                    <div key={feature.title} className="bg-gray-900 p-8 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 border border-gray-800" style={{transitionDelay: `${index * 100}ms`}}>
                        <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Tutorials Section */}
        <Section id="tutorials">
          <SectionTitle>Popular <span className="text-brand-red">Topics</span></SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['How to Start a YouTube Channel', 'How to Get 1000 Subscribers', 'Best Editing Apps', 'YouTube SEO Guide', 'Thumbnail Design Lessons', 'YouTube Monetization'].map(title => (
                <div key={title} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                    <div className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
                        <YouTubeIcon className="w-16 h-16 text-gray-700 group-hover:text-brand-red transition-all duration-300 transform group-hover:scale-125"/>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
                        <p className="text-gray-400 mb-4">A step-by-step guide to help you master this topic.</p>
                        <a href="#" className="inline-block bg-brand-blue text-brand-charcoal font-bold py-2 px-6 rounded-lg text-sm hover:opacity-90 transition-all duration-300 transform hover:scale-105 mt-auto self-start">Read More</a>
                    </div>
                </div>
            ))}
          </div>
        </Section>
        
        {/* AI Tools Section */}
        <Section id="ai-tools" className="bg-gray-900/50">
          <SectionTitle>Featured <span className="text-brand-blue">AI Tools</span></SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {['AI Script Writer', 'AI Thumbnail Designer', 'AI Video Editor', 'AI Voiceover', 'AI SEO Optimizer', 'AI Content Ideator'].map(tool => (
                 <div key={tool} className="bg-gray-900 p-6 rounded-lg flex items-center space-x-4 border border-gray-800 hover:border-brand-blue transition-colors duration-300">
                    <div className="p-3 bg-gray-800 rounded-full"><AIToolsIcon className="w-8 h-8 text-brand-blue"/></div>
                    <div>
                        <h3 className="text-lg font-bold font-heading">{tool}</h3>
                        <p className="text-gray-400 text-sm">Streamline your workflow with this tool.</p>
                        <a href="#" className="text-brand-red font-semibold text-sm hover:underline mt-1 inline-block">Try Now</a>
                    </div>
                 </div>
             ))}
          </div>
        </Section>
        
        {/* About Section */}
        <Section id="about">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop" alt="Creator workspace" className="rounded-lg shadow-2xl shadow-brand-red/10" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl font-bold font-heading mb-4">About <span className="text-brand-red">Mahnjo Guide</span></h2>
                <p className="text-xl text-gray-300 mb-6">"We teach YouTube in simple, easy language."</p>
                <p className="text-gray-400">
                    Mahnjo Guide is your one-stop hub for learning everything about being a successful YouTube creator. From your first video to your first million subscribers, we provide clear, actionable advice and tutorials to help you on your journey.
                </p>
            </div>
          </div>
        </Section>
        
        {/* Contact Section */}
        <Section id="contact" className="bg-gray-900/50">
          <SectionTitle>Get In <span className="text-brand-red">Touch</span></SectionTitle>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
                <div>
                    <input type="text" name="name" placeholder="Your Name" required className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                </div>
                <div>
                    <input type="email" name="email" placeholder="Your Email" required className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors" />
                </div>
                <div>
                    <textarea name="message" rows={4} placeholder="Your Message" required className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-brand-red text-white font-bold py-3 px-12 rounded-full text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Send Message</button>
                </div>
            </form>
          </div>
        </Section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors"><YouTubeIcon className="w-8 h-8" /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><InstagramIcon className="w-8 h-8" /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Mahnjo Guide. All Rights Reserved.</p>
        </div>
      </footer>

      <FloatingSubscribe />
    </div>
  );
};

export default App;