import gsap, { SteppedEase } from 'gsap';
import { useEffect, useRef } from 'react';

export default function NoiseBackground() {
    const el = useRef(null);
    const noiseRef = useRef(null);

    useEffect(() => {
        // once the component mounts, start the infinite flicker loop
        function flicker() {
            if (!noiseRef.current) return;
            gsap.to(noiseRef.current, {
                // randomly shift the bg-position
                backgroundPosition:
                    `${Math.random() * 100}% ${Math.random() * 10}%`,
                duration: 0.03,
                ease: SteppedEase.config(1),
                onComplete: flicker,      // loop
            });
        }
        flicker();
    }, []);

    return (
        <div
            ref={el}
            className="fixed inset-0 -z-10 mix-blend-multiply bg-cover bg-noise pointer-events-none blur"
        />
    );
}
