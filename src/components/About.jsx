import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutIntro from './About/AboutIntro';
import Technologies from './About/Technologies';
import Certifications from './About/Certifications';

gsap.registerPlugin(ScrollTrigger);

export default function About() {

    useGSAP(() => {
        const words = gsap.utils.toArray("#coding-since span");
        gsap.set(words, { opacity: 0, scale: 0.5 });

        ScrollTrigger.create({
            trigger: "#coding-since-section",
            start: "center 80%",
            end: "bottom 80%",
            animation: gsap.to(words, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)",
                stagger: 0.2
            })
        });
    }, []);

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
