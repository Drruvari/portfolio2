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
import Marquee from "./Marquee";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
    const { setCursorType, setCursorLabel } = useCursor();
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const text1Ref = useRef();
    const text2Ref = useRef();
    const [hoveredText, setHoveredText] = useState(null);
    const handleMouseEnter = (label, id) => {
        setCursorType('hovered');
        setCursorLabel(label);
        setHoveredText(id);
        const el = id === 'text1' ? text1Ref.current : id === 'text2' ? text2Ref.current : null;
        if (el) {
            gsap.to(el, {
                skewX: 2,
                rotation: 0.5,
                y: -5,
                duration: 0.5,
                ease: 'power3.out',
            });
        }
    };
    const handleMouseLeave = () => {
        setCursorType('default');
        setCursorLabel('');
        if (hoveredText) {
            const el = hoveredText === 'text1' ? text1Ref.current : text2Ref.current;
            if (el) {
                gsap.to(el, {
                    skewX: 0,
                    rotation: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                });
            }
        }
        setHoveredText(null);
    };
    useGSAP(() => {
        if (!text1Ref.current || !text2Ref.current) return;
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        gsap.from([text1Ref.current, text2Ref.current], {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out"
        });
        gsap.timeline()
            .to(text1Ref.current, {
                ease: "none",
                duration: 0.8,
            })
            .to(text2Ref.current, {
                ease: "none",
                duration: 1.5,
            });
        if (document.querySelector('.visual')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.visual',
                    start: '100% 100%',
                    end: '100% 0%',
                    scrub: 1,
                }
            })
                .to('.logoWrap #c', { x: -150, y: 250, rotate: 20, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #o', { x: -30, y: 150, rotate: -10, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #d', { x: 0, y: 400, rotate: -10, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #e', { x: 50, y: 300, rotate: 10, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #v', { x: 100, y: 100, rotate: -10, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #i', { x: 50, y: 450, rotate: 20, ease: 'none', duration: 5 }, 0)
                .to('.logoWrap #r', { x: 50, y: 450, rotate: 20, ease: 'none', duration: 5 }, 0);
        }
    }, { dependencies: [text1Ref, text2Ref] });
    return (
        <section className="w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h relative">
            <div
                className={`flex flex-col gap-y-[20px] absolute`}
                style={{ left: `${deviceWidth > 1023 ? navlinksLeft : 20}px` }}
            >
                {
                    deviceWidth > 768 ? (
                        <ScrollOpacity>
                            <SlideIn key={"desktop"}>
                                <h1
                                    className="text-45-title md:text-60-title"
                                    ref={text1Ref}
                                    onMouseEnter={() => handleMouseEnter('Scalable', 'text1')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {hoveredText === 'text1' ? 'Highly Adaptable' : 'Scalable'}
                                </h1>
                                <h1
                                    className="text-45-title md:text-60-title"
                                    ref={text2Ref}
                                    onMouseEnter={() => handleMouseEnter('Digital Platforms', 'text2')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {hoveredText === 'text2' ? 'Online Solutions' : 'Digital Platforms'}
                                </h1>
                            </SlideIn>
                        </ScrollOpacity>
                    ) : (
                        <ScrollOpacity>
                            <SlideIn key={"mobile"}>
                                <h1 className="text-45-title md:text-60-title">Scalable</h1>
                                <h1 className="text-45-title md:text-60-title">Digital</h1>
                                <h1 className="text-45-title md:text-60-title">Platforms</h1>
                            </SlideIn>
                        </ScrollOpacity>
                    )
                }
                <ScrollOpacity>
                    <SlideIn delay={0.15}>
                        <span
                            className="block text-25-body w-[70%] lg:w-full"
                            onMouseEnter={() => handleMouseEnter('Web & Mobile Apps')}
                            onMouseLeave={handleMouseLeave}
                        >
                            Custom-built web and mobile applications — fast, reliable, and built to grow.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </div>
            <LogoWrap />
            <div className="absolute bottom-0 left-0 w-full">
                <Marquee>
                    <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25] ">
                        <h2 className="text-large-m md:text-large-d text-nowrap">Codevider</h2>
                        <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myBlack rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" />
                    </div>
                </Marquee>
            </div>
        </section>
    );
};
export default Hero;
