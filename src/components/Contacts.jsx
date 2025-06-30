import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const socialLinks = [
    {
        name: "Email",
        url: "mailto:vasilignatow@gmail.com"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vasil-ignatov-ignatov/"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/vasil.ignatov/"
    }
];

export default function Contacts() {
    const socialRefs = useRef([]);
    const socialContainerRef = useRef(null);

    useGSAP(() => {
        // Social links animation
        gsap.fromTo(".social-item",
            { opacity: 0, x: 100 },
            {
                opacity: 1, x: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
                scrollTrigger: { trigger: ".social-container", start: "top 80%" }
            }
        );

        // Hover effects
        const container = socialContainerRef.current;
        container?.addEventListener('mouseleave', () => {
            gsap.to(socialRefs.current, { opacity: 1, duration: 0.3 });
        });

        socialRefs.current.forEach((item, index) => {
            item?.addEventListener('mouseenter', () => {
                socialRefs.current.forEach((other, i) => {
                    gsap.to(other, { opacity: i === index ? 1 : 0.3, duration: 0.3 });
                });
            });
        });
    }, []);

    return (
        <section id="contact" className="panel max-h-screen bg-black text-white flex flex-col justify-center items-end px-4 relative">
            <div className="absolute top-16 left-8 md:top-20 md:left-12 lg:top-24 lg:left-16">
                <h1 className="title-contact text-stretch absolute top-0 left-0">
                    Contact
                </h1>
            </div>

            {/* Social Links */}
            <div className="w-full max-w-md mt-4 mr-8 md:mr-16 lg:mr-24">
                <div className="mb-8 text-right">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">(Social)</span>
                </div>
                <div
                    ref={socialContainerRef}
                    className="social-container space-y-6 md:space-y-8 text-right"
                >
                    {socialLinks.map((social, index) => (
                        <div key={social.name} ref={el => socialRefs.current[index] = el} className="social-item">
                            <a href={social.url} target="_blank" rel="noopener noreferrer"
                                className="block py-4 md:py-6">
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                                    {social.name}
                                </h3>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}