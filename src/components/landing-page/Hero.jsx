import gsap from "gsap";
import { useEffect, useRef } from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useDevice from "../hooks/useDevice";
import Marquee from "./Marquee";

const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const prefixRef = useRef(null);

    useEffect(() => {
        const words = ["Pro", "Di", "Code"];
        let currentWordIndex = 0;

        const animateWord = () => {
            const nextWord = words[currentWordIndex % words.length];

            const tl = gsap.timeline({
                onComplete: () => {
                    currentWordIndex++;
                    setTimeout(animateWord, 1000); // delay between loops
                },
            });

            tl.to(prefixRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (prefixRef.current) prefixRef.current.innerText = nextWord;
                },
            }).fromTo(
                prefixRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                }
            );
        };

        // Set initial word
        if (prefixRef.current) {
            prefixRef.current.innerText = words[0];
            animateWord();
        }
    }, []);

    return (
        <section className="w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h relative">
            <div
                className="flex flex-col gap-y-[20px] absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            >
                <ScrollOpacity>
                    <SlideIn>
                        <h1 className="text-45-title md:text-60-title flex gap-1 items-center">
                            <span
                                ref={prefixRef}
                                className="inline-block px-3 py-2 font-bold bg-myAccent text-myBlack"
                            />
                            <span>vider</span>
                        </h1>
                        <h1 className="text-45-title md:text-60-title">
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
