import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import sampleVideo from '../assets/videos/sample.mp4';
import resumePDF from '../assets/pdf/Vasil_Ignatov_Resume.pdf';
import Button from './UI/Button';

export default function Hero() {
    const textRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const splitText = new SplitText(textRef.current, {
            type: 'chars,words,lines'
        });
        const chars = splitText.chars;

        // Задаваме начално състояние
        gsap.set(chars, {
            x: 150,
            opacity: 0
        });

        gsap.set(contentRef.current, {
            y: 50,
            opacity: 0
        });

        // Анимираме
        const tl = gsap.timeline();
        tl.to(chars, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.02,
        })
            .to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.3");

        // Cleanup function
        return () => {
            splitText.revert();
        };
    }, { scope: [textRef, contentRef] });

    return (
        <section id="hero" className="panel bg-white">
            {/* Hero Title */}
            <div className="flex-center">
                <h1 className="text-black text-stretch" ref={textRef}>
                    VASIL IGNATOV
                </h1>
            </div>

            {/* Content Section */}
            <div className="w-full mx-auto px-4 md:px-8 lg:px-12 mt-4" ref={contentRef}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Side - Video */}
                    <div className="aspect-auto overflow-hidden self-center">
                        <video
                            src={sampleVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="max-h-[75vh] h-full grayscale object-cover"
                        />
                    </div>

                    {/* Right Side - Description */}
                    <div className="self-end mx-auto xl:max-w-[50%]">
                        <div className="mb-4">
                            <p className="text-md md:text-lg font-light font-dm-sans leading-relaxed">
                                I'm a passionate front-end developer from Bulgaria who cares about design.
                                My focus is on precise integration and crafting innovative user experiences
                                with modern web technologies.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">

                            <Button href={resumePDF} download className='w-full md:w-fit'>
                                Download CV
                            </Button>
                            <Button className="" >
                                Contact me
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}