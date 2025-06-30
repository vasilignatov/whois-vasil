import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  // const loadingText = useRef(null);
  const introRef = useRef(null);

  useGSAP(() => {
    // const splitText = new SplitText(loadingText.current, { type: "chars" });
    // const chars = splitText.chars;

    // gsap.set(chars, {
    //   color: "white",
    //   scale: 1,
    //   opacity: 1,
    // });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // tl.to(chars, {
    //   scale: 1.3,
    //   opacity: 0,
    //   duration: 2,
    //   stagger: 0.06,
    //   ease: "power2.out",
    //   onComplete: () => {
    //     loadingText.current.style.display = "none";
    //     introRef.current.style.display = "block";
    //   }
    // }, "+=0.3");

    tl
      .fromTo('#intro_name',
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo('#intro_title',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo('#intro_subtitle',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

    tl.to(containerRef.current, {
      x: "-100%",
      duration: 1,
      ease: 'power4.inOut',
    }, "-=0.3");


  }, [onComplete]);

  return (
    <div className='h-screen w-screen !overflow-hidden bg-black px-8 md:px-12 flex justify-center items-center' ref={containerRef}>
      {/* <h1 className='text-white text-4xl uppercase font-bold z-10' ref={loadingText}>
        vasiligantov.dev
      </h1> */}

      <div className="!overflow-hidden absolute inset-0 font-amiamie-light text-white bg-black px-8 md:px-12" ref={introRef}>
        {/* Larger screens*/}
        <div className="hidden xl:block h-full w-full lg:text-[10rem]">
          <div className="h-full w-full grid grid-rows-3">
            <div className="row-start-1 flex justify-start items-start">
              <span id="intro_name">
                vasil ignatov
              </span>
            </div>

            <div className="row-start-2 flex justify-center items-center">
              <span id="intro_title">
                full-stack
              </span>
            </div>

            <div className="row-start-3 flex justify-end items-end">
              <span id="intro_subtitle">
                developer
              </span>
            </div>
          </div>
        </div>

        {/* Smaller screens*/}
        <div className="xl:hidden !overflow-hidden h-full w-full flex flex-col justify-center items-center text-center space-y-8 uppercase text-4xl xs:text-5xl sm:text-6xl md:lowercase md:text-8xl lg:text-9xl">
          <span id="intro_name">
            vasil ignatov
          </span>
          <span id="intro_title">
            full-stack
          </span>
          <span id="intro_subtitle">
            developer
          </span>
        </div>
      </div >
    </div>
  );
}

export default LoadingScreen; 