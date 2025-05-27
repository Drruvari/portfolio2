import { MoveDown } from "lucide-react";
import { useRef } from "react";
import StickyRounds from "../animations/StickyRounds";
import useNavbarContext from "../contexts/useNavbarContext";
import useDevice from "../hooks/useDevice";
import ScrollAnimationText from "../scrollAnimationText/scrollAnimationText";
import TextMask from "../text-mask/TextMask";
import GooeyBackground from "../global/GooeyBackground";

function HeroSection() {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const heroRef = useRef(null);

    const textArray = [
        { text: "Design" },
        { text: "Innovate" },
        { text: "Collaborate" },
        { text: "Deploy" },
    ];

    return (
        <section
            ref={heroRef}
            className="h-screen relative overflow-hidden"
            data-cursor-target
        >
            <GooeyBackground />

            <TextMask />
            <StickyRounds />

            <div
                className="absolute top-[30%] md:top-1/3 px-[20px] md:px-[70px] font-main text-sm z-10 text-white"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            >
                <span className="flex md:hidden justify-center items-center">
                    <MoveDown />
                    Scroll
                </span>
            </div>

            <div className="block md:hidden h-screen z-10 text-white">
                <ScrollAnimationText textArray={textArray} animateData="top" />
            </div>
        </section>
    );
}

export default HeroSection;

