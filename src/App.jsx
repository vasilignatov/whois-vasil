import { ScrollTrigger, SplitText, ScrollSmoother } from 'gsap/all';
import gsap from 'gsap';
import { useState } from 'react';
import LoadingScreen from './components/Layout/LoadingScreen';
import Header from './components/Layout/Header';
import MediaQueryDebugger from './components/Layout/MediaQueryDebugger';
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <main>
        {/* Media Query Debugger - показва се винаги */}
        {/* <MediaQueryDebugger /> */}

        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        {!isLoading && (
          <>
            <Hero />
          </>
        )}

      </main>
    </>
  );
}

export default App;
