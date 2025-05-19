import gsap from "gsap";
import { useEffect, useRef } from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";
import { myEase1, myEase2 } from "../utility/constants";
import Marquee from "./Marquee";
import Squares from "./Squares";

const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const prefixRef = useRef(null);
    const heroRef = useRef(null);
    const { setCursorType, setCursorContext, setCursorLabel } = useCursor();

    useEffect(() => {
        const words = ["Pro", "Di", "Code"];
        const el = prefixRef.current;
        if (!el) return;

        gsap.set(el, { y: "0%", autoAlpha: 1 });
        el.innerText = words[0];

        const sequence = [...words.slice(1), words[0]];

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
        sequence.forEach((word) => {
            tl
                // slide the current word up & fade
                .to(el, {
                    y: "-100%",
                    autoAlpha: 0,
                    ease: myEase1,
                    duration: 0.6,
                })
                // swap the text
                .add(() => {
                    el.innerText = word;
                })
                // jump it in from below
                .set(el, { y: "100%" })
                // slide it up & fade in
                .to(el, {
                    y: "0%",
                    autoAlpha: 1,
                    ease: myEase2,
                    duration: 0.6,
                });
        });
    }, []);

    // —— parallax tilt (mouse + touch) —— //
    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        gsap.set(el, { transformStyle: "preserve-3d", transformOrigin: "center center" });

        const handleMove = (e) => {
            const clientX = e.touches?.[0]?.clientX ?? e.clientX;
            const clientY = e.touches?.[0]?.clientY ?? e.clientY;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            const maxTilt = deviceWidth > 768 ? 20 : 10;

            gsap.to(el, {
                rotationY: x * maxTilt,
                rotationX: -y * maxTilt,
                ease: "power3.out",
                duration: 0.5,
            });
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("touchmove", handleMove, { passive: true });
        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("touchmove", handleMove);
        };
    }, [deviceWidth]);

    return (
        <section
            ref={heroRef}
            onMouseEnter={() => {
                setCursorType("hovered");
                setCursorContext("hero");
                setCursorLabel("Explore");
            }}
            onMouseLeave={() => {
                setCursorType("default");
                setCursorContext("");
                setCursorLabel("");
            }}
            className="overflow-hidden w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h relative will-change-transform"
            style={{ backfaceVisibility: "hidden" }}
        >
            <div className="absolute inset-0 z-0">
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal"
                    borderColor="#222"
                    hoverFillColor="#FDFDFD"
                />
            </div>

            <div
                className="flex flex-col gap-y-[20px] absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 text-myWhite"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            >
                <ScrollOpacity>
                    <SlideIn>
                        <h1 className="text-45-title md:text-60-title flex gap-1 items-center">
                            <div className="relative inline-block overflow-hidden">
                                <span
                                    ref={prefixRef}
                                    className="inline-block px-3 py-2 font-bold bg-myAccent text-myBlack"
                                />
                            </div>
                            <span>vider</span>
                        </h1>
                        <h1 className="text-45-title md:text-60-title font-bold">
                            Innovating Through Code
                        </h1>
                    </SlideIn>
                </ScrollOpacity>

                <ScrollOpacity>
                    <SlideIn delay={0.15}>
                        <span className="block text-25-body w-[70%] lg:w-full">
                            Building future-ready software with precision, passion, and purpose.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <Marquee>
                    <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25]">
                        <h2 className="text-large-m md:text-large-d text-nowrap text-myWhite">
                            Codevider
                        </h2>
                        <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myWhite rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" />
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Hero;
