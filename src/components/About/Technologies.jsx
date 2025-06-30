import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useState, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const technologies = {
    0: [ // Frontend
        "TypeScript", "JavaScript", "React", "Next.js",
        "Redux", "HTML & CSS", "Tailwind CSS", "GraphQL"
    ],
    1: [ // Backend
        "Node.js", "Express", "MongoDB", "MySQL", "Socket.io"
    ],
    2: [ // CI/CD
        "Docker", "Git", "GitHub Actions", "Coolify", "Vercel"
    ]
};

const categories = ["Frontend", "Backend", "CI/CD"];

export default function Technologies() {
    const [activeCategory, setActiveCategory] = useState(0);
    const titleRef = useRef(null);

    useGSAP(() => {
        if (titleRef.current) {
            const split = new SplitText(titleRef.current, { type: "chars" });

            // Animate letters with stagger
            gsap.fromTo(split.chars,
                {
                    opacity: 0,
                    filter: "blur(10px)",
                    y: 50
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        gsap.fromTo(".tech-container",
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3,
                scrollTrigger: {
                    trigger: ".tech-container",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        categories.forEach((category, index) => {
            ScrollTrigger.create({
                trigger: `.category-${index}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveCategory(index),
                onLeaveBack: () => index > 0 && setActiveCategory(index - 1)
            });
        });
    }, { scope: "#tech-section" });

    return (
        <div className="mb-16 w-auto md:h-auto" id="tech-section">
            <div className="mb-22">
                <h1 className="text-black text-stretch-spaced text-left" ref={titleRef}>
                    Technologies
                </h1>
            </div>

            <div className="tech-container flex relative h-full flex-col md:flex-row">
                <div className="left-side flex items-center justify-center md:justify-start w-full md:w-1/2 relative">
                    <div className="categories flex flex-row md:flex-col justify-center md:justify-center h-auto md:h-full ml-0 md:ml-24 space-x-8 md:space-x-0 md:space-y-24">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`category-${index} text-2xl md:text-5xl font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeCategory === index
                                        ? 'active text-black opacity-100'
                                        : 'text-gray-400 opacity-50'
                                    }`}
                                onClick={() => setActiveCategory(index)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right-side flex items-start md:items-center justify-center md:justify-start w-full md:w-1/2 pl-0 md:pl-12">
                    <div className="tech-list">
                        <div className="text-xl md:text-2xl space-y-3">
                            {technologies[activeCategory].map((tech, index) => (
                                <div
                                    key={index}
                                    className="text-gray-600 animate-fade-in text-center md:text-left"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 