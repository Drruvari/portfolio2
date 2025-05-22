import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function MagneticGSAP({ children, move }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", {
            duration: move ? 0.5 : 1, // Faster duration when 'move' is true
            ease: "elastic.out(1, 0.5)", // Adjusted for a more spring-like effect
        });

        const yTo = gsap.quickTo(magnetic.current, "y", {
            duration: move ? 0.5 : 1, // Faster duration when 'move' is true
            ease: "elastic.out(1, 0.5)", // Adjusted for a more spring-like effect
        });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } =
                magnetic.current.getBoundingClientRect();

            // Define the multiplier for speed and distance when move is true
            const multiplier = move ? 1.5 : 1; // Increase this value for more speed and distance

            let x = (clientX - (left + width / 2)) * multiplier;
            let y = (clientY - (top + height / 2)) * multiplier;

            xTo(x);
            yTo(y);
        };

        const mouseLeave = () => {
            gsap.to(magnetic.current, {
                x: 0,
                y: 0,
                duration: 1, // Duration of the animation
                ease: "elastic.out(1, 0.5)", // Spring-like easing function
            });

            // Alternatively, if you want to keep using quickTo:
            xTo(0);
            yTo(0);
        };

        const element = magnetic.current; // Store the current value in a variable
        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseleave", mouseLeave);

        return () => {
            element?.removeEventListener("mousemove", mouseMove);
            element?.removeEventListener("mouseleave", mouseLeave);
        };
    }, [move]);

    return React.cloneElement(children, { ref: magnetic });
}
