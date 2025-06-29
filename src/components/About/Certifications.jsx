import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { createPortal } from 'react-dom';
import Socketio from "../../assets/images/certificates/Socket.io.jpg";
import JSBackend from "../../assets/images/certificates/JS Back-End - September 2022 - Certificate.jpeg";
import MySQL from "../../assets/images/certificates/MySQL - September 2022 - Certificate.jpeg";
import AWSEssentials from "../../assets/images/certificates/AWS Essentials - July 2021 - Certificate.jpeg";
import JSApplications from "../../assets/images/certificates/JS Applications - June 2021 - Certificate.jpeg";
import JSFundamentals from "../../assets/images/certificates/JS Fundamentals - September 2020 - Certificate.jpeg";

gsap.registerPlugin(SplitText);

const certifications = [
    {
        id: 0,
        title: "Socket.io",
        year: "2023",
        image: Socketio
    },
    {
        id: 1,
        title: "JS Back-End",
        year: "2022",
        image: JSBackend
    },
    {
        id: 2,
        title: "MySQL",
        year: "2022",
        image: MySQL
    },
    {
        id: 3,
        title: "AWS Essentials",
        year: "2021",
        image: AWSEssentials
    },
    {
        id: 4,
        title: "JS Applications",
        year: "2021",
        image: JSApplications
    },
    {
        id: 5,
        title: "JS Fundamentals",
        year: "2020",
        image: JSFundamentals
    }
];

export default function Certifications() {
    const [hoveredCert, setHoveredCert] = useState(null);
    const tooltipRef = useRef(null);
    const xToRef = useRef(null);
    const yToRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        // Split text using GSAP SplitText
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

        if (tooltipRef.current) {
            // Set initial position and centering
            gsap.set(tooltipRef.current, {
                xPercent: -50,
                yPercent: -50
            });

            // Create quickTo functions for smooth following
            xToRef.current = gsap.quickTo(tooltipRef.current, "x", {
                duration: 0.3,
                ease: "circ.out"
            });
            yToRef.current = gsap.quickTo(tooltipRef.current, "y", {
                duration: 0.3,
                ease: "circ.out"
            });
        }
    }, []);

    useGSAP(() => {
        const handleGlobalMouseMove = (e) => {
            if (xToRef.current && yToRef.current) {
                xToRef.current(e.clientX);
                yToRef.current(e.clientY);
            }
        };

        window.addEventListener("mousemove", handleGlobalMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove);
        };
    }, []);

    const handleHover = (cert) => {
        // console.log('Hovering cert:', cert);
        setHoveredCert(cert);
    };

    const handleMouseLeave = () => {
        // console.log('Mouse leave');
        setHoveredCert(null);
    };

    return (
        <div
            className="py-24 certifications-section"
            onMouseLeave={handleMouseLeave}
        >
            <div className="mb-16">
                <h2 ref={titleRef} className='text-black text-stretch-spaced text-left'>
                    Certifications
                </h2>
            </div>

            <div className="relative w-full">
                {certifications.map((cert) => (
                    <div
                        onMouseEnter={() => handleHover(cert)}
                        onMouseLeave={handleMouseLeave}
                        key={cert.id}
                        className="relative cursor-pointer border-b border-gray-200 py-6 px-8 overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-500 ease-out group-hover:h-full -z-10"></div>
                        <div className="relative z-10 flex justify-between items-center group-hover:text-white transition-colors duration-300">
                            <div>
                                <h3 className="text-2xl font-bold">{cert.title}</h3>
                                <p className="text-lg opacity-70">{cert.issuer}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg">{cert.year}</p>
                                <span className="text-xs opacity-70">{cert.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {createPortal(
                <div
                    ref={tooltipRef}
                    className={`fixed z-[9999] max-w-md  bg-red-500 text-white shadow-2xl border-8 border-black pointer-events-none transition-all duration-300 ${hoveredCert ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                    style={{
                        left: '100px',
                        top: '100px',
                        willChange: 'transform'
                    }}
                >
                    {hoveredCert && (
                        <div className="h-full flex flex-col justify-center items-center">
                            <img
                                src={hoveredCert.image}
                                alt={hoveredCert.title}
                                className="w-full h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
