import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import me1 from '../../assets/images/IMG_0631.jpg';
import Button from '../UI/Button';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {

    useGSAP(() => {

        gsap.fromTo("#about-intro",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1, ease: 'power2.out',
                scrollTrigger: {
                    trigger: "#about-intro",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <div className="h-screen" id="about-intro">

            <div className="max-h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-12 w-full relative">
                <div className="h-auto">
                    <h1 className="text-black text-stretch text-left">
                        ABOUT
                    </h1>
                    <p className='semibold w-full md:w-4/5 md:text-lg font-light font-dm-sans leading-relaxed'>
                        Full-Stack Developer focused on building scalable, high-performance web applications with React, Next.js, and
                        modern tooling. Specialized in headless eCommerce with Shopify and Magento integrations, with a strong emphasis
                        on clean code, modular architecture, and high performance. Delivers production-ready solutions through clear
                        communication and strong collaboration.
                    </p>


                </div>
                <div className='h-full w-full flex items-center justify-center'>
                    <img src={me1} alt="me" className='w-auto max-h-[80vh] grayscale object-cover object-center' />
                </div>
            </div>
        </div>
    );
} 