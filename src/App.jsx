import { ScrollTrigger, SplitText, ScrollSmoother } from 'gsap/all';
import gsap from 'gsap';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import LoadingScreen from './components/Layout/LoadingScreen';
import Header from './components/Layout/Header';
import MediaQueryDebugger from './components/Layout/MediaQueryDebugger';
// Pages
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Projects from './components/Projects';
import Contacts from './components/Contacts';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useGSAP(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const panels = gsap.utils.toArray(".panel");

      if (panels.length === 0) {
        return;
      }

      const animatePanels = panels.slice(0, -1);

      animatePanels.forEach((panel) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            snap: true,
            start: "bottom bottom",
            end: "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: 1,
            onRefresh: () => gsap.set(panel, {
              transformOrigin: "center " + (panel.offsetHeight - window.innerHeight / 2) + "px"
            })
          }
        });

        tl.fromTo(panel,
          { scale: 1, opacity: 1 },
          { scale: 0.5, opacity: 0.5, duration: 1 }
        );
      });
    }, 100);

    return () => clearTimeout(timer);
  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <>
      <main ref={containerRef}>
        {/* <MediaQueryDebugger /> */}

        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        {!isLoading && (
          <>
            <Header />
            <div className="slides-wrapper">
              <Hero />
              <About />
              <Work />
              <Projects />
              <Contacts />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
