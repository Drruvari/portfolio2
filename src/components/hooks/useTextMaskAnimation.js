import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import useCursor from "../hooks/useCursor";

export default function useTextMaskAnimation() {
    const containerRef = useRef(null);
    const tlRef = useRef(null);
    const { setCursorType } = useCursor();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Quick setters for CSS vars
        const xTo = gsap.quickTo(".hidden-content", "--x", {
            duration: 0.4,
            ease: "power4.out",
        });
        const yTo = gsap.quickTo(".hidden-content", "--y", {
            duration: 0.4,
            ease: "power4.out",
        });

        // Timeline for mask size
        tlRef.current = gsap.timeline({ paused: true })
            .fromTo(
                ".hidden-content",
                { "--size": 0 },
                { "--size": 150, duration: 0.4, ease: "back.out(1.7)" }
            );

        // First move: reveal the mask and start tracking
        function onFirstMove(e) {
            window.removeEventListener("mousemove", onFirstMove);
            gsap.set(".hidden-content", {
                autoAlpha: 1,
                "--x": e.pageX,
                "--y": e.pageY,
            });
            window.addEventListener("mousemove", (e) => {
                yTo(e.pageY + 17);
                xTo(e.pageX + 15);
            });
        }
        window.addEventListener("mousemove", onFirstMove);

        // Wire up hover handlers and keep references for cleanup
        const textEls = Array.from(container.querySelectorAll(".hiden-text"));
        const handlers = textEls.map(el => {
            const enter = () => {
                setCursorType("none");
                tlRef.current.restart();
            };
            const leave = () => {
                setCursorType("default");
                tlRef.current.reverse();
            };
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);
            return { el, enter, leave };
        });

        // Cleanup everything
        return () => {
            window.removeEventListener("mousemove", onFirstMove);
            handlers.forEach(({ el, enter, leave }) => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            });
            tlRef.current?.kill();
        };
    }, [setCursorType]);

    return { containerRef };
}
