import gsap from "gsap";
import useNavbarContext from "../contexts/useNavbarContext";
import Magnetic from "../global/Magnetic";
import ScrollOpacity from "../global/ScrollOpacity";
import SplitLineText from "../global/SplitLineText";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";

const aboutStory = [
    {
        index: "01",
        story:
            "We specialize in scalable, high-performance digital platforms — engineered with precision using the MERN stack and microservices.",
    },
    {
        index: "02",
        story:
            "From UI/UX design to full-stack architecture, every project reflects our commitment to quality, efficiency, and forward-thinking development.",
    },
];

const About = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const { setCursorType, setCursorLabel, setCursorContext } = useCursor();

    const onSectionEnter = () => {
        setCursorType('hovered');
        setCursorLabel('About');
        setCursorContext('section-about');
    };
    const onSectionLeave = () => {
        setCursorType('default');
        setCursorLabel('');
        setCursorContext('');
    };

    // same centering logic as Hero
    const style =
        deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
            ? { left: `${navlinksLeft}px`, transform: "translateY(-50%)" }
            : {};

    // on hover: trigger cursor  ripple
    const handleMouseEnter = (index) => (e) => {
        setCursorType("hovered");
        setCursorLabel(index);
        setCursorContext("about-item");

        // ripple burst
        const ripple = document.createElement("div");
        Object.assign(ripple.style, {
            position: "fixed",
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            width: "16px",
            height: "16px",
            border: "2px solid #00E5FF",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9997,
        });
        document.body.appendChild(ripple);
        gsap.to(ripple, {
            width: 100,
            height: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
        });
    };

    const handleMouseLeave = () => {
        setCursorType("default");
        setCursorLabel("");
        setCursorContext("");
    };

    return (
        <section
            className="w-full h-screen flex items-center relative"
            data-cursor-target
            onMouseEnter={onSectionEnter}
            onMouseLeave={onSectionLeave}
        >
            <div
                className={`
          absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2
          top-1/2 -translate-y-1/2
          flex flex-col justify-center
          w-[85%] md:w-[75%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%]
        `}
                style={style}
            >
                <ScrollOpacity>
                    <SplitLineText
                        text="About Codevider"
                        textstyles="text-16-body mb-[40px]"
                    />
                </ScrollOpacity>

                <div>
                    {aboutStory.map(({ index, story }, i) => (
                        <ScrollOpacity key={i}>
                            <Magnetic>
                                <div
                                    onMouseEnter={handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative flex flex-col gap-y-[25px] lg:gap-y-0 lg:flex-row lg:items-baseline first:md:mb-[40px] first:mb-[50px]"
                                >
                                    <span className="text-14-body lg:absolute lg:bottom-[8px] lg:left-[-50px]">
                                        {index}
                                    </span>
                                    <SplitLineText
                                        text={story}
                                        textstyles="text-25-body md:text-32-body"
                                    />
                                </div>
                            </Magnetic>
                        </ScrollOpacity>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
