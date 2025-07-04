import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Button({ children, className, onClick, ...props }) {
    const buttonRef = useRef(null);
    const spanRef = useRef(null);
    const tlRef = useRef();

    // Combined click handler for smooth scroll and custom onClick
    const handleClick = (e) => {
        if (props.href && props.href.startsWith('#')) {
            e.preventDefault();
            
            if (props.href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(props.href);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
        
        if (onClick) {
            onClick(e);
        }
    };

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true });

        tlRef.current.to(spanRef.current, { duration: 0.1, yPercent: -150, ease: "power2.in" });
        tlRef.current.to(buttonRef.current, { duration: 0.2, color: 'white', backgroundColor: 'black' }, "<");
        tlRef.current.set(spanRef.current, { yPercent: 150 });
        tlRef.current.to(spanRef.current, { duration: 0.1, yPercent: 0 });

        // Cleanup
        return () => {
            if (tlRef.current) {
                tlRef.current.kill();
            }
        };
    }, { scope: buttonRef });

    const handleMouseEnter = () => {
        if (tlRef.current) {
            tlRef.current.play(0);
        }
    };

    const handleMouseLeave = () => {
        if (tlRef.current) {
            tlRef.current.reverse();
        }
    };

    return (
        <a
            ref={buttonRef}
            href={props.href}
            className={`relative overflow-hidden px-8 py-4 rounded-full border border-black line-clamp-1 cursor-pointer ${className || ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            {...props}
        >
            <span ref={spanRef} className="block font-medium font-amiamie text-center ">
                {children}
            </span>
        </a>
    );
}