import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navigation() {
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navigationItems = [
    { name: 'Home', href: '#', sectionId: 'hero' },
    { name: 'About', href: '#about', sectionId: 'about' },
    { name: 'Work', href: '#work', sectionId: 'work' },
    { name: 'Projects', href: '#projects', sectionId: 'projects' },
    { name: 'Contact', href: '#contact', sectionId: 'contact' }
  ];

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const bottomThreshold = windowHeight * 0.8; // Show nav when mouse is in bottom 20%
      
      setShowNav(e.clientY > bottomThreshold);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track active section with scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => {
        const element = document.getElementById(item.sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.sectionId,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section that takes up most of the viewport
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;

      let currentSection = 'hero'; // default

      sections.forEach(section => {
        // If section is visible and center of viewport is within section
        if (section.top <= centerY && section.bottom >= centerY) {
          currentSection = section.id;
        }
        // If we're at the top, always show hero
        else if (window.scrollY < 100) {
          currentSection = 'hero';
        }
      });

      setActiveSection(currentSection);
    };

    // Add scroll listener with throttling
    let timeoutId;
    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 50);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useGSAP(() => {
    // Animate scroll icon
    gsap.to(".scroll-icon", {
      y: 10,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // Animate scroll icon opacity
    gsap.to(".scroll-icon", {
      opacity: showNav ? 0 : 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Animate navigation
    gsap.to(".bottom-nav", {
      y: showNav ? 0 : 100,
      opacity: showNav ? 1 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [showNav]);

  return (
    <>
      {/* Animated Scroll Icon */}
      <div className="scroll-icon fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/95 backdrop-blur-md border border-gray-300 rounded-full shadow-2xl">
          <div className="flex items-center ">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`px-4 py-2 text-sm font-medium font-dm-sans transition-all duration-300 relative group rounded-full ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-gray-900 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-black group-hover:w-3/4 transition-all duration-300"></span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
