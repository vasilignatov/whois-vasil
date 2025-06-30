import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Button from "./UI/Button";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Work() {
    const containerRef = useRef();
    const timelineLineRef = useRef();

    // Work experience data
    const workExperience = [
        {
            id: 1,
            year: "2020 - 2022",
            title: "Learning & Building",
            period: "2020 - 2022",
            responsibilities: [
                "Learning new technologies and building projects to improve my skills",
                "Built full-stack applications using <span class='font-bold'>React, Node.js, and Express</span>",
                "Developed e-commerce solution with modern web technologies",
                "Created <span class='font-bold'>responsive designs</span> and improved coding practices"
            ],
            projects: [
                { title: "Chatbook", url: "https://sensational-kangaroo-59d175.netlify.app/" },
                { title: "E-commerce React", url: "https://playful-daifuku-0487b1.netlify.app/" },
                { title: "Portfolio Website", url: "https://vasilignatov.netlify.app/" },
                { title: "Express Boilerplate", url: "https://www.npmjs.com/package/@vasilignatov/express-boilerplate" }
            ]
        },
        {
            id: 2,
            year: "2023",
            title: "Front-End Developer (Contract)",
            company: "Habitat – Shopify & eCommerce Agency",
            period: "02/2023 - 11/2023",
            description: "Joined Habitat as a contract Frontend Developer to support a headless eCommerce project for a German retail furniture business.",
            responsibilities: [
                "Implemented new features and UI components using <span class='font-bold'>Next.js</span> and <span class='font-bold'>React</span>",
                "Translated designs from <span class='font-bold'>Figma</span> and <span class='font-bold'>Adobe XD</span> into responsive, accessible, and modular components",
                "Worked on frontend performance improvements with a focus on <span class='font-bold'>Core Web Vitals</span> and modern best practices"
            ],
            projects: [{ title: "Opti-wohnwelt.de", url: "https://opti-wohnwelt.de" }],
        },
        {
            id: 3,
            year: "2023-2025",
            title: "Front-End Developer",
            company: "Habitat - Shopify & eCommerce Agency",
            period: "11/2023 - 06/2025",
            description: "After a successful contract period, I transitioned to a long-term role where I contributed to the development of multiple headless eCommerce storefronts.",
            responsibilities: [
                "Implemented the architecture for a headless eCommerce storefront using <span class='font-bold'>React, Next.js, Redux</span> and <span class='font-bold'>Shopify Storefront</span>",
                "Worked closely with project managers to define, estimate, and deliver critical features on schedule",
                "Developed reusable components and layouts with consistent design patterns",
                "Ensured accessibility compliance based on <span class='font-bold'>WCAG</span> standards",
                "Refactored <span class='font-bold'>outdated code</span> to align with modern best practices and migrated a legacy projects from Next.js <span class='font-bold'>Page Router</span> to the <span class='font-bold'>App Router</span>"
            ],
            projects: [
                { title: "Opti-wohnwelt.de", url: "https://opti-wohnwelt.de" },
                { title: "Opti-Megastore.de", url: "https://opti-megastore.de" },
                { title: "Seeger24.de", url: "https://seeger24.de" },
                { title: "Funkelhaus.de", url: "https://funkelhaus.de" },
                { title: "Unikomodels.com", url: "https://unikomodels.com" }
            ]
        }
    ];

    useGSAP(() => {
        // Timeline line drawing animation (only on desktop)
        const timelineLine = timelineLineRef.current;
        if (timelineLine && window.innerWidth >= 768) {
            gsap.fromTo(timelineLine,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: timelineLine,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1
                    }
                }
            );
        }

        // Animate timeline dots (only on desktop)
        if (window.innerWidth >= 768) {
            gsap.utils.toArray(".timeline-dot").forEach((dot) => {
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: dot,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }

        // Animate work sections
        workExperience.forEach((work) => {
            const selector = `[data-work-id="${work.id}"]`;

            // Animate year from left
            const year = document.querySelector(`${selector} .work-year`);
            if (year) {
                gsap.fromTo(year,
                    { x: -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: year,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // SplitText animation for title (like in Certifications.jsx)
            const title = document.querySelector(`${selector} .work-title`);
            if (title) {
                const titleSplit = new SplitText(title, { type: "chars" });
                gsap.fromTo(titleSplit.chars,
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
                            trigger: title,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // SplitText animation for company
            const company = document.querySelector(`${selector} .work-company`);
            if (company) {
                const companySplit = new SplitText(company, { type: "chars" });
                gsap.fromTo(companySplit.chars,
                    {
                        opacity: 0,
                        filter: "blur(8px)",
                        y: 30
                    },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        stagger: 0.03,
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: company,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Animate period
            const period = document.querySelector(`${selector} .work-period`);
            if (period) {
                gsap.fromTo(period,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: period,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Animate description
            const description = document.querySelector(`${selector} .work-description`);
            if (description) {
                gsap.fromTo(description,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: description,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Animate bullet points with enhanced stagger
            const bullets = document.querySelectorAll(`${selector} .bullet-point`);
            gsap.fromTo(bullets,
                { x: 30, y: 20, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: {
                        amount: 0.6,
                        from: "start"
                    },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bullets[0] || document.querySelector(`${selector}`),
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate project buttons with bounce effect
            const projects = document.querySelectorAll(`${selector} .project-tag`);
            gsap.fromTo(projects,
                { scale: 0, y: 30, opacity: 0 },
                {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: {
                        amount: 0.4,
                        from: "start"
                    },
                    ease: "back.out(2.5)",
                    scrollTrigger: {
                        trigger: projects[0] || document.querySelector(`${selector}`),
                        start: "bottom bottom",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section id="work" className="panel bg-white relative">
            <div ref={containerRef} className="min-h-screen py-16 px-4 md:px-8">
                {/* Section Title */}
                <div className="mb-16">
                    <h1 className="text-black text-stretch text-left mb-4">
                        Work
                    </h1>
                    <p className="w-full text-lg md:text-xl lg:text-2xl my-4 md:mb-6 font-amiamie">
                        My professional journey and key milestones in web development
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-full mx-auto">
                    {/* Central Timeline Line - Hidden on mobile */}
                    <div
                        ref={timelineLineRef}
                        className="hidden md:block absolute left-20 lg:left-1/4 w-1 bg-black h-full origin-top"
                        style={{ zIndex: 1 }}
                    ></div>

                    {/* Timeline Items */}
                    <div className="space-y-16 md:space-y-24 lg:space-y-32">
                        {workExperience.map((work) => (
                            <div
                                key={work.id}
                                data-work-id={work.id}
                                className="relative flex flex-col md:flex-row items-start"
                            >
                                {/* Year - Left Side */}
                                <div className="w-full md:w-16 lg:w-1/4 xl:w-1/4 flex-shrink-0 mb-6 md:mb-0 md:pr-4">
                                    <div className="work-year text-left text-2xl md:text-3xl lg:text-4xl font-semibold text-black leading-none font-dm-sans">
                                        {work.year}
                                    </div>
                                </div>

                                {/* Timeline Dot - Hidden on mobile */}
                                <div className="timeline-dot hidden md:flex absolute left-19 lg:left-[calc(25%-4px)] w-6 h-6 bg-black rounded-full border-4 border-white z-10 items-center justify-center mt-4">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>

                                {/* Work Content - No padding on mobile, responsive spacing on larger screens */}
                                <div className="flex-1 md:pl-4 lg:pl-8 xl:pl-12">
                                    {/* Job Title */}
                                    <h3 className="work-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 md:mb-4 leading-tight font-dm-sans">
                                        {work.title}
                                    </h3>

                                    {/* Company */}
                                    {work.company && (
                                        <h4 className="work-company text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-700 mb-3 md:mb-4 font-dm-sans">
                                            {work.company}
                                        </h4>
                                    )}

                                    {/* Period */}
                                    <p className="work-period text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-6 font-light font-dm-sans">
                                        {work.period}
                                    </p>

                                    {/* Description */}
                                    {work.description && (
                                        <p className="work-description text-md md:text-lg lg:text-xl text-gray-800 mb-6 md:mb-10 leading-relaxed font-light font-dm-sans italic">
                                            {work.description}
                                        </p>
                                    )}

                                    {/* Responsibilities */}
                                    <div className="mb-6 md:mb-10">
                                        <h5 className="text-lg md:text-xl lg:text-2xl font-semibold text-black mb-4 md:mb-6 font-dm-sans">Key Responsibilities:</h5>
                                        <ul className="space-y-3 md:space-y-4">
                                            {work.responsibilities.map((responsibility, idx) => (
                                                <li key={idx} className="bullet-point text-md md:text-lg lg:text-xl text-gray-700 leading-relaxed flex items-start font-light font-dm-sans">
                                                    <span className="inline-block w-3 h-3 md:w-4 md:h-4 bg-black rounded-full mt-2 md:mt-3 mr-4 md:mr-6 flex-shrink-0"></span>
                                                    <span dangerouslySetInnerHTML={{ __html: responsibility }}></span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Projects */}
                                    <div>
                                        <h5 className="text-lg md:text-xl lg:text-2xl font-semibold text-black mb-4 md:mb-6 font-dm-sans">Projects:</h5>
                                        <div className="flex flex-wrap gap-3 md:gap-4">
                                            {work.projects.map((project, idx) => (
                                                <Button
                                                    key={idx}
                                                    href={project.url ? project.url : "#"}
                                                    target={project.url ? "_blank" : "_self"}
                                                    rel={project.url ? "noopener noreferrer" : ""}
                                                    className="project-tag px-4 md:px-6 py-2 md:py-3 text-sm md:text-base lg:text-lg font-medium"
                                                >
                                                    {project.title}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div className="text-center mt-16">
                    <div className="inline-block w-12 h-1 bg-black"></div>
                </div>
            </div>
        </section>
    );
}