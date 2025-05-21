import { motion } from 'framer-motion';
import { useRef } from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import RotatingText from "../global/RotatingText";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";
import Marquee from "./Marquee";
import pattern from "../../assets/images/Burst.svg";

const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const heroRef = useRef(null);
    const { setCursorType, setCursorContext, setCursorLabel } = useCursor();

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
            className="relative overflow-hidden w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h will-change-transform bg-myBlack"
            style={{ backfaceVisibility: "hidden" }}
        >
            <motion.div
                className="flex flex-col gap-y-[20px] absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 text-myWhite"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            >
                <ScrollOpacity>
                    <h1 className="text-45-title md:text-60-title flex gap-1 items-center">
                        <span className="font-black">Codevider</span>
                    </h1>
                    <h1 className="text-45-title md:text-60-title font-bold flex items-center">
                        Innovating Through
                        <div className="relative inline-block overflow-hidden">
                            <RotatingText
                                texts={['Code', 'Design', 'Development']}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-myAccent font-black text-myBlack overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </div>
                    </h1>
                </ScrollOpacity>

                <ScrollOpacity>
                    <SlideIn delay={0.15}>
                        <span className="block text-25-body w-[70%] lg:w-full">
                            Building future-ready software with precision, passion, and purpose.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full mb-16 font-main">
                <Marquee>
                    <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25]">
                        <h2 className="text-large-m md:text-large-d text-nowrap text-myWhite">
                            Codevider
                        </h2>
                        {/* <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myWhite rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" /> */}
                        <img src={pattern} alt="Logo" className="block mr-[50px] md:mr-[100px]" />
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Hero;
