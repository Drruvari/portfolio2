import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useDevice from "../hooks/useDevice";
import LogoWrap from "./LogoWrap";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(TextPlugin)

        gsap.timeline()
            .to("#text1", {
                textAlign: "end",
                ease: "none",
                duration: 0.8,
            })
            .to("#text2", {
                ease: "none",
                duration: 1.5,
            })

        // visual animation
        gsap.timeline({
            scrollTrigger: {
                trigger: '.visual',
                start: '100% 100%',
                end: '100% 0%',
                scrub: 1,
                // markers: true,
            }
        })
            .to('.logoWrap #j', {
                x: -150,
                y: 250,
                rotate: 20,
                ease: 'none',
                duration: 5
            }, 0)
            .to('.logoWrap #y', {
                x: -30,
                y: 150,
                rotate: -10,
                ease: 'none',
                duration: 5
            }, 0)
            .to('.logoWrap #o', {
                x: 0,
                y: 400,
                rotate: -10,
                ease: 'none',
                duration: 5
            }, 0)
            .to('.logoWrap #u', {
                x: 50,
                y: 300,
                rotate: 10,
                ease: 'none',
                duration: 5
            }, 0)
            .to('.logoWrap #n', {
                x: 100,
                y: 100,
                rotate: -10,
                ease: 'none',
                duration: 5
            }, 0)
            .to('.logoWrap #g', {
                x: 50,
                y: 450,
                rotate: 20,
                ease: 'none',
                duration: 5
            }, 0)
    })

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
                                <h1 className="text-45-title md:text-60-title">Scalable</h1>
                                <h1 className="text-45-title md:text-60-title">
                                    Digital Platforms
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
                        <span className="block text-25-body w-[70%] lg:w-full">
                            Custom-built web and mobile applications — fast, reliable, and built to grow.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </div>

            <section className="relative w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h">
                <LogoWrap />
            </section>

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
