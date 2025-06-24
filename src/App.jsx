import './App.css';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import { useState } from 'react';
import LoadingScreen from './components/Layout/LoadingScreen';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to vasiligantov.dev
          </h1>

          {/* Main content */}
        </div>
      )}
    </main>
  );
}

export default App;
