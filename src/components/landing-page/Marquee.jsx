import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Marquee = ({ children }) => {
    const containerRef = useRef();
    const marqueeRef = useRef();
    const velocitySliderRef = useRef();
    let direction = -1;
    let xPercent = 0;

    useGSAP(() => {
        if (window.matchMedia("prefers-reduced-motion: reduce").matches) return;

        const con = containerRef.current;

        gsap.to(velocitySliderRef.current, {
            x: "-300px",
            scrollTrigger: {
                trigger: con,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.25,
                onUpdate: (self) => (direction = self.direction * -1),
            },
        });

        // Skew + Hue Shift
        gsap.to(marqueeRef.current.querySelectorAll("span"), {
            y: (i) => Math.sin(i) * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 0.6,
            stagger: 0.05,
          });

          gsap.fromTo(
            marqueeRef.current.querySelectorAll("span"),
            { filter: "hue-rotate(0deg)" },
            {
              filter: "hue-rotate(360deg)",
              repeat: -1,
              yoyo: true,
              ease: "none",
              duration: 5,
              stagger: 0.05,
            }
          );

        requestAnimationFrame(animation);
    });

    useGSAP(() => {
        const spans = marqueeRef.current.querySelectorAll("span");

        const handleMove = (e) => {
          spans.forEach((span) => {
            const rect = span.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              gsap.to(span, {
                x: dx * 0.1,
                y: dy * 0.1,
                duration: 0.3,
                ease: "power3.out",
              });
            } else {
              gsap.to(span, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              });
            }
          });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
      });

    const animation = () => {
        if (xPercent <= -33.33 || (direction > 0 && xPercent >= 33.33)) {
            xPercent = 0;
        }

        gsap.set(marqueeRef.current, { xPercent });
        requestAnimationFrame(animation);

        xPercent += 0.009 * direction;
    };

    return (
        <div
            ref={containerRef}
            className="overflow-hidden flex justify-center pointer-events-none"
        >
            <div ref={velocitySliderRef}>
                <div ref={marqueeRef} className="flex w-max">
                    {children}
                    {children}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
