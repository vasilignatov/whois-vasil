import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const loadingText = useRef(null);

  useGSAP(() => {
    const splitText = new SplitText(loadingText.current, { type: "chars" });
    const chars = splitText.chars;

    gsap.set(chars, {
      color: "white",
      scale: 1,
      opacity: 1
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });


    tl.to(chars, {
      scale: 1.3,
      opacity: 0,
      duration: 2,
      stagger: 0.06,
      ease: "power2.out"
    }, "+=0.3");

    tl
      .to('.loading_half.upper', {
        y: '-100%',
        duration: 1.5,
        ease: 'power4.inOut',
      })
      .to('.loading_half.lower', {
        y: '100%',
        duration: 1.5,
        ease: 'power4.inOut',
      }, '<');

  }, [onComplete]);

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center' id='loading_screen'>
      <h1 className='text-white text-4xl uppercase font-bold z-10' ref={loadingText}>
        vasiligantov.dev
      </h1>

      <div className="loading_half upper" />
      <div className="loading_half lower" />
    </div>
  );
}

export default LoadingScreen; 