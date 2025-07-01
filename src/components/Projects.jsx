import Button from "./UI/Button"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Import video files
import chatbookVideo from "../assets/videos/chatbook.mp4";
import oldCvVideo from "../assets/videos/old_cv.mp4";
import newCvVideo from "../assets/videos/new-cv.mp4";
import expressBoilerplateVideo from "../assets/videos/express-boilerplate.mp4";

// Import project images
import newPortfolioImg from "../assets/images/projects/new-portfolio.jpg";
import oldPortfolioImg from "../assets/images/projects/old_portfolio.jpg";
import chatbookImg from "../assets/images/projects/chatbook.jpg";
import ecomImg from "../assets/images/projects/e-com.jpg";
import expressBoilerplateImg from "../assets/images/projects/express-boilerplate.jpg";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Projects() {
    const containerRef = useRef();
    const moreToComeRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Real projects data from vasilignatov.dev
    const projects = [
        {
            name: "Animated Portfolio",
            year: "2025",
            description: "Modern animated portfolio website built with React and GSAP. Features smooth scroll animations, interactive project cards, split-text effects, horizontal scrolling sections, and responsive design with Tailwind CSS. Showcases advanced animation techniques and modern web development skills.",
            technologies: ["React", "GSAP", "ScrollTrigger", "SplitText", "Tailwind CSS", "Vite"],
            image: newPortfolioImg,
            video: newCvVideo,
            bgColor: "bg-indigo-500",
            githubUrl: "https://github.com/vasilignatov/whois-vasil",
            liveUrl: "https://vasilignatov.dev/"
        },
        {
            name: "Old Portfolio",
            year: "2023",
            description: "Classic portfolio website built with vanilla JavaScript, HTML and CSS. Features clean design, responsive layout, and showcases previous web development projects and skills.",
            technologies: ["JavaScript", "HTML", "CSS", "Bootstrap"],
            image: oldPortfolioImg,
            video: oldCvVideo,
            bgColor: "bg-gray-600",
            githubUrl: "https://github.com/vasilignatov/vasilignatov.dev",
            liveUrl: "https://vasilignatov.netlify.app/"
        },
        {
            name: "Chatbook",
            year: "2023",
            description: "Chatbook is Messenger clone application created with MERN stack and socket.io for real time chatting. Features include real-time messaging, user authentication, and modern chat interface.",
            technologies: ["ReactJS", "React-Bootstrap", "Express", "Node.js", "Socket.io", "Mongoose"],
            image: chatbookImg,
            video: chatbookVideo,
            bgColor: "bg-yellow-400",
            githubUrl: "https://github.com/vasilignatov/chatbook",
            liveUrl: "https://sensational-kangaroo-59d175.netlify.app/"
        },
        {
            name: "E-commerce React",
            year: "2022",
            description: "E-commerce project created with MERN stack. The application is rich in functionalities including shopping cart, user authentication, product management, and payment processing.",
            technologies: ["ReactJS", "Node.js", "Express", "MongoDB", "Stripe"],
            image: ecomImg,
            video: '',
            bgColor: "bg-purple-500",
            githubUrl: "https://github.com/vasilignatov/e-commerce-app",
            liveUrl: "https://playful-daifuku-0487b1.netlify.app/"
        },
        {
            name: "Express Boilerplate",
            year: "2023",
            description: "New versison coming soon... A comprehensive boilerplate for quickly building secure RESTful APIs using Express and Mongoose. Features authentication with Passport, JWT tokens with refresh functionality, global error handling, MongoDB integration, security with Helmet, CORS support, gzip compression, and XSS protection. Includes pre-built auth and user management endpoints with role-based authorization.",
            technologies: ["Express", "Node.js", "Mongoose", "MongoDB", "Passport", "JWT", "Helmet", "dotenv"],
            image: expressBoilerplateImg,
            video: expressBoilerplateVideo,
            bgColor: "bg-green-500",
            githubUrl: "https://github.com/vasilignatov/express-boilerplate",
            liveUrl: "https://www.npmjs.com/package/@vasilignatov/express-boilerplate"
        }
    ];

    useGSAP(() => {
        // Animate intro section elements on load
        const tl = gsap.timeline();

        tl.fromTo(".projects-main-title",
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }
        ).fromTo(".projects-description", {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
            .fromTo(".contact-button", {
                y: 40,
                opacity: 0
            }, {
                y: 0,
                pacity: 1,
                duration: 0.8,
                ease: "power.inOut"
            }, "-=0.6");

        // Animate cards with stagger effect
        gsap.fromTo(".project-card",
            {
                opacity: 0,
                scale: 0.4,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: 0.2,
                stagger: {
                    each: 1,
                    from: "start",
                    to: "end",
                    grid: "auto",
                    axis: 'x'
                },
                scrollTrigger: {
                    scrub: true,
                    trigger: ".projects-grid",
                    markers: true,
                    start: "top 60%",
                    end: "center center",
                    toggleActions: "play pause none reverse"
                }
            }
        );

        // Animate "more to come" text with SplitText
        if (moreToComeRef.current) {
            const split = new SplitText(moreToComeRef.current, { type: "chars" });

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
                        trigger: "#more-to-come",
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Intersection Observer for lazy loading videos
        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const videoObserver = new IntersectionObserver((entries) => {
            console.log("entries", entries);
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.load();
                        video.removeAttribute('data-src');
                        videoObserver.unobserve(video);
                    }
                }
            });
        }, observerOptions);

        // Set up lazy loading for videos
        const cards = gsap.utils.toArray(".project-card");

        cards.forEach(card => {
            const video = card.querySelector(".card-video");
            const hasVideo = video !== null;

            // Set up lazy loading for video if it exists
            if (hasVideo && video.dataset.src) {
                videoObserver.observe(video);
            }
        });

        // Cleanup observer on component unmount/re-render
        return () => {
            if (videoObserver) {
                videoObserver.disconnect();
            }
        };

    }, { scope: containerRef, dependencies: [isModalOpen] });

    return (
        <section id="projects" className="panel relative">
            {/* Main intro section */}
            <div className="bg-white flex flex-col justify-between relative p-8 z-10">
                <h1 className="projects-main-title text-black text-stretch">
                    Projects
                </h1>

                <div className="w-full flex flex-col gap-8 pt-4">
                    <div className="projects-description w-full text-lg md:text-xl lg:text-2xl my-4 md:mb-6 font-amiamie">
                        Browse through my projects and see the work I've done.
                    </div>

                    <Button
                        href="#contact"
                        className="contact-button h-fit w-fit">
                        Contact me
                    </Button>
                </div>
            </div>

            {/* Projects Grid Section */}
            <div ref={containerRef} className="projects-grid-section min-h-screen bg-white py-8 px-8">

                {/* Projects Grid */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card h-auto cursor-pointer transition-all duration-300 hover:shadow-xl"
                            onClick={() => {
                                setSelectedProject(project);
                                setIsModalOpen(true);
                            }}
                            onMouseEnter={() => {
                                
                            }}
                        >
                            {/* Card Container */}
                            <div className="bg-white h-full p-6 border border-black shadow-sm">
                                {/* Card Media Container */}
                                <div className="mb-3 overflow-hidden relative bg-gray-100">
                                    {/* Static Image (default visible) */}
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="card-image w-full aspect-square object-cover transition-opacity duration-300"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* Video (hidden by default, shown on hover) - only if video exists */}
                                    {project.video && (
                                        <video
                                            className="card-video w-full aspect-square object-contain absolute inset-0 opacity-0 transition-opacity duration-300 bg-black"
                                            data-src={project.video}
                                            loop
                                            muted
                                            playsInline
                                            preload="none"
                                            loading="lazy"
                                            aria-label={`${project.name} project demo video`}
                                        />
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="card-content mt-3">
                                    <h3 className="text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-black mb-1 leading-tight">
                                        {project.name}
                                    </h3>
                                    <p className="text-xl text-gray-600 font-normal line-clamp-1">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[80vh] flex flex-col justify-center items-center">
                <div ref={moreToComeRef} className="w-full text-stretch-spaced text-center text-black" id="more-to-come">
                    and more to come...
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedProject && createPortal(
                <div className="modal-overlay fixed inset-0 bg-[#00000080] flex items-center justify-center z-50 p-2 md:p-4">
                    <div className="modal-content bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-gray-500 hover:text-gray-700 text-2xl md:text-3xl font-light bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Content */}
                        <div className="flex flex-col lg:grid lg:grid-cols-2 h-full max-h-[95vh]">
                            {/* Top/Left: Media (Video or Image) */}
                            <div className="h-64 md:h-80 lg:h-full lg:min-h-[500px] relative bg-black">
                                {selectedProject.video ? (
                                    <video
                                        src={selectedProject.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-contain"
                                        aria-label={`${selectedProject.name} project demo video`}
                                    />
                                ) : (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.name}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            {/* Bottom/Right: Content */}
                            <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 overflow-y-auto flex-1">
                                <div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2 font-dm-sans">
                                        {selectedProject.name}
                                    </h3>
                                    <p className="text-base md:text-lg text-gray-500 mb-4 font-dm-sans">
                                        {selectedProject.year}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-base md:text-lg font-semibold text-black mb-3 font-dm-sans">About this project</h4>
                                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-dm-sans font-light">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-base md:text-lg font-semibold text-black mb-3 font-dm-sans">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm font-medium font-dm-sans"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                                    <Button href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base">
                                        View on GitHub
                                    </Button>
                                    <Button href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base">
                                        Live Demo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}