import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useRef } from 'react';
import { svgVariants } from './svgVariants';

gsap.registerPlugin(DrawSVGPlugin);

const DrawRandomUnderlineButton = ({ text, onClick, className = '' }) => {
    const boxRef = useRef(null);
    const textRef = useRef(null);
    const nextIndex = useRef(Math.floor(Math.random() * svgVariants.length));

    const handleMouseEnter = () => {
        const box = boxRef.current;
        const txt = textRef.current;
        if (!box || !txt) return;
        // size and position underline to text
        const { offsetWidth: w, offsetLeft: x } = txt;
        box.style.width = `${w}px`;
        box.style.left = `${x}px`;

        // insert SVG
        box.innerHTML = svgVariants[nextIndex.current];
        const svg = box.querySelector('svg');
        const path = svg?.querySelector('path');

        // ensure SVG scales to container size
        if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('preserveAspectRatio', 'none');
        }

        if (path) {
            gsap.set(path, { drawSVG: '0%' });
            gsap.to(path, {
                drawSVG: '100%',
                duration: 0.5,
                ease: 'power2.inOut',
            });
        }

        nextIndex.current = (nextIndex.current + 1) % svgVariants.length;
    };

    const handleMouseLeave = () => {
        const box = boxRef.current;
        const path = box?.querySelector('path');
        if (!box || !path) return;
        gsap.to(path, {
            drawSVG: '100% 100%',
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                box.innerHTML = '';
            },
        });
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative inline-block overflow-visible px-6 py-3 uppercase font-semibold ${className}`}
        >
            <span ref={textRef} className="relative z-10 inline-block">
                {text}
            </span>
            <span
                ref={boxRef}
                className="absolute bottom-[-6px] h-[20px] pointer-events-none overflow-visible"
                aria-hidden
            />
        </button>
    );
};

export default DrawRandomUnderlineButton;
