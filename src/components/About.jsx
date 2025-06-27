import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import AboutIntro from './About/AboutIntro';
import Technologies from './About/Technologies';
import Certifications from './About/Certifications';

gsap.registerPlugin(ScrollTrigger);

export default function About() {

    return (
        <section className="panel mt-4 bg-white px-4 md:px-8 lg:px-12 pt-12">
            {/* First section - General */}
            <AboutIntro />

            {/* Second section - Technologies */}
            <Technologies />

            {/* Third section - Certifications */}
            <Certifications />

            {/* Fourth section - Coding since */}
            <div className="h-screen flex-center" id="coding-since-section">
                <h2 className='text-stretch-small ' id="coding-since">
                    coding since 2020
                </h2>
            </div>
        </section>
    );
}
