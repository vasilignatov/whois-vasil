import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutIntro from './About/AboutIntro';
import Technologies from './About/Technologies';
import Certifications from './About/Certifications';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {

    useGSAP(() => {
        const splitText = new SplitText("#coding-since", {
            type: 'words'
        });
        const words = splitText.words;
        
        // Set initial state - very large scale
        gsap.set(words, { 
            scale: 15,
            transformOrigin: "center center"
        });

        // Direct animation with ScrollTrigger
        gsap.fromTo(words,
            { scale: 15 },
            {
                scale: 1,
                duration: 2,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: "#about",
                    start: "center center",
                    once: true
                }
            }
        );
    });

    return (
        <section
            className="panel mt-4 bg-white px-4 md:px-8 lg:px-12 pt-12"
            id="about"
        >
            {/* First section - General */}
            <AboutIntro />

            {/* Second section - Technologies */}
            <Technologies />

            {/* Third section - Certifications */}
            <Certifications />

            {/* Fourth section - Coding since */}
            <div className="h-screen flex items-start justify-center pt-32" id="coding-since-section">
                <h2 className='text-stretch-spaced uppercase' id="coding-since">
                    CODING
                    SINCE
                    2020
                </h2>
            </div>
        </section>
    );
}
