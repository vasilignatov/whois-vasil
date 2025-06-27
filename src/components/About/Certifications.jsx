import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

const certifications = [
    {
        id: 0,
        title: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023",
        status: "Active",
        image: "https://via.placeholder.com/400x300/333/fff?text=AWS+Certificate"
    },
    {
        id: 1,
        title: "React Developer Certification",
        issuer: "Meta",
        year: "2022",
        status: "Active",
        image: "https://via.placeholder.com/400x300/0066cc/fff?text=React+Certificate"
    },
    {
        id: 2,
        title: "MongoDB Developer",
        issuer: "MongoDB University",
        year: "2023",
        status: "Active",
        image: "https://via.placeholder.com/400x300/4CAF50/fff?text=MongoDB+Certificate"
    },
    {
        id: 3,
        title: "Docker Certified Associate",
        issuer: "Docker Inc.",
        year: "2022",
        status: "Active",
        image: "https://via.placeholder.com/400x300/2196F3/fff?text=Docker+Certificate"
    }
];

export default function Certifications() {
    const [hoveredId, setHoveredId] = useState(null);
    const tooltipRef = useRef(null);

    useGSAP(() => {
        // Initialize tooltip - hidden by default
        gsap.fromTo("#cert-title",
            { opacity: 0, y: 100 },
            {
                opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: "#cert-title",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        if (tooltipRef.current) {
            gsap.set(tooltipRef.current, {
                scale: 0,
                opacity: 0,
                transformOrigin: "center center",
                display: "none"
            });
        }
    }, []);

    useGSAP(() => {
        if (hoveredId !== null && tooltipRef.current) {
            // Show tooltip with cool animation
            gsap.to(tooltipRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
                display: "block"
            });
        } else if (tooltipRef.current) {
            // Hide tooltip with smooth animation
            gsap.to(tooltipRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                display: "none"
            });
        }
    }, [hoveredId]);

    const handleHover = (id) => {
        setHoveredId(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    const handleMouseMove = (e) => {
        const newX = e.clientX + 20;
        const newY = e.clientY + 20;

        // Smooth tooltip following with GSAP
        if (tooltipRef.current && hoveredId !== null) {
            gsap.to(tooltipRef.current, {
                x: newX,
                y: newY,
                duration: 0.15,
                ease: "power2.out"
            });
        }
    };

    return (
        <div className="py-24">
            <div className="mb-16">
                <h2 id="cert-title" className='text-black text-8xl font-semibold text-left'>
                    Certifications
                </h2>
            </div>

            <div className="relative w-full">
                {certifications.map((cert) => (
                    <div
                        onMouseEnter={() => handleHover(cert.id)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
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

            {/* Tooltip чрез Portal - рендерира в document.body */}
            {createPortal(
                <div
                    ref={tooltipRef}
                    className="fixed z-[9999] w-[350px] h-[400px] bg-white text-black rounded-xl shadow-2xl border border-gray-200 pointer-events-none"
                    style={{ left: 0, top: 0 }}
                >
                    {hoveredId !== null && (
                        <div className="p-6 h-full flex flex-col justify-center items-center gap-6">
                            <img
                                src={certifications[hoveredId].image}
                                alt={certifications[hoveredId].title}
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                                    {certifications[hoveredId].title}
                                </h1>
                                <p className="text-gray-600 leading-relaxed">
                                    {certifications[hoveredId].description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
