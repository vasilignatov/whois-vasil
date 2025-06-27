import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import me1 from '../../assets/images/IMG_0631.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
    useGSAP(() => {
        // Анимация за About секцията (ако има нужда)
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
            <div className="max-h-[80vh] grid grid-cols-2 gap-12 w-full">
                <div className="h-auto">
                    <h1 className="text-black text-stretch text-left">
                        ABOUT
                    </h1>
                    <div className="flex-center">
                        <p>
                            I am a software engineer with a passion for building scalable and efficient web applications. I am a quick learner and I am always looking to improve my skills. I am a team player and I am always looking to learn new things. I am a problem solver and I am always looking to find the best solution for the problem. I am a creative thinker and I am always looking to find the best solution for the problem. I am a detail-oriented and I am always looking to find the best solution for the problem. I am a self-motivated and I am always looking to find the best solution for the problem. I am a self-driven and I am always looking to find the best solution for the problem. I am a self-disciplined and I am always looking to find the best solution for the problem. I am a self-confident and I am always looking to find the best solution for the problem. I am a self-confident and I am always looking to find the best solution for the problem. I am a self-confident and I am always looking to find the best solution for the problem.
                        </p>
                    </div>
                </div>
                <div className='h-full w-full flex items-center justify-center'>
                    <img src={me1} alt="me" className='w-auto max-h-[80vh] grayscale object-cover object-center' />
                </div>
            </div>
        </div>
    );
} 