import { MoveDown, MoveRight } from "lucide-react";
import { useRef } from "react";
import StickyRounds from "../animations/StickyRounds";
import useNavbarContext from "../contexts/useNavbarContext";
import useDevice from "../hooks/useDevice";
import ScrollAnimationText from "../scrollAnimationText/scrollAnimationText";
import TextMask from "../text-mask/TextMask";

function HeroSection() {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const heroRef = useRef(null);

    const textArray = [
        { text: "Innovate" },
        { text: "Collaborate" },
        { text: "Deploy" },
    ];

    return (
        <section
            ref={heroRef}
            className="h-screen relative bg-myBlack"
        >
            <div
                className="absolute top-[30%] md:top-1/3 px-[20px] md:px-[70px] font-main text-sm"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            >
                <span className="hidden md:flex justify-center items-center">
                    Hover
                    <MoveRight />
                </span>

                <span className="flex md:hidden justify-center items-center">
                    <MoveDown />
                    Scroll
                </span>
            </div>
            <TextMask />
            <div className="block md:hidden h-screen">
                <ScrollAnimationText textArray={textArray} animateData="top" />
            </div>
            <StickyRounds />
        </section>
    );
}

export default HeroSection;
