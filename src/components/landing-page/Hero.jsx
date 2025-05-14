import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import { useRef, useState } from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";
import LogoWrap from "./LogoWrap";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [hoveredText, setHoveredText] = useState(null);

    const { setCursorType, setCursorLabel } = useCursor();
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();

    const textRef = useRef();

    const handleMouseEnter = (label, id) => {
        setCursorType("hovered");
        setCursorLabel(label);
        setHoveredText(id);
        const el =
            id === "text1"
                ? textRef.current
                : null;
        if (el) {
            gsap.to(el, {
                skewX: 2,
                rotation: 0.5,
                y: -5,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    };

    const handleMouseLeave = () => {
        setCursorType("default");
        setCursorLabel("");
        if (hoveredText) {
            const el = hoveredText === "text1" ? textRef.current : null;
            if (el) {
                gsap.to(el, {
                    skewX: 0,
                    rotation: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                });
            }
        }
        setHoveredText(null);
    };

    useGSAP(
        () => {
            if (!textRef.current) return;
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            gsap.from([textRef.current], {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out",
            });
            gsap
                .timeline()
                .to(textRef.current, {
                    ease: "none",
                    duration: 0.8,
                })
            if (document.querySelector(".visual")) {
                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: ".visual",
                            start: "100% 100%",
                            end: "100% 0%",
                            scrub: 1,
                        },
                    })
                    .to(
                        ".logoWrap #c",
                        { x: -150, y: 250, rotate: 20, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #o",
                        { x: -30, y: 150, rotate: -10, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #d",
                        { x: 0, y: 400, rotate: -10, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #e",
                        { x: 50, y: 300, rotate: 10, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #v",
                        { x: 100, y: 100, rotate: -10, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #i",
                        { x: 50, y: 450, rotate: 20, ease: "none", duration: 5 },
                        0
                    )
                    .to(
                        ".logoWrap #r",
                        { x: 50, y: 450, rotate: 20, ease: "none", duration: 5 },
                        0
                    );
            }
        },
        { dependencies: [textRef] }
    );

    return (
        <section className="relative w-full h-[100dvh] lg:h-screen flex flex-col items-start lg:items-center justify-center
      px-4 md:px-8 lg:px-desktop-h">

            <div
                className="absolute"
                style={{ left: deviceWidth > 1023 ? navlinksLeft : 20 }}
            >
                <ScrollOpacity>
                    <SlideIn>
                        <h1
                            className="font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl"
                            ref={textRef}
                        >
                            <span className="block mb-4">
                                For every complex problem, <br />
                                we provide a simple, elegant solution - <br />
                                crafting intelligent technology <br />
                                that drives your vision forward.
                            </span>
                            <span className="block text-lg sm:text-xl font-semibold text-gray-600">
                                Empowering innovation, accelerating success.
                            </span>
                        </h1>
                        <p
                            className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl max-w-md"
                            onMouseEnter={() => handleMouseEnter("Web & Mobile Apps")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Custom-built web and mobile applications — fast, reliable, and built to grow.
                        </p>
                    </SlideIn>
                </ScrollOpacity>
            </div>

            {/* Logo wrap at bottom */}
            <div className="absolute bottom-0 left-0 w-full">
                <LogoWrap />
            </div>
        </section>
    );
};

export default Hero;
