import React from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SplitLineText from "../global/SplitLineText";
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
    {
        index: "03",
        story:
            "Join us on this transformative journey as we redefine the way businesses thrive in the digital landscape.",
    },
    {
        index: "04",
        story:
            "Start your journey with us today and unlock the limitless potential of digital transformation.",
    },
];

const About = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();

    return (
        <section className="w-full h-screen flex justify-center relative ">
            <div
                className="flex flex-col justify-center w-[85%] md:w-[75%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] absolute top-[50%] translate-y-[-50%]"
                style={{ left: deviceWidth > 1023 ? navlinksLeft : 20 }}
            >
                <ScrollOpacity>
                    <SplitLineText text={"About Codevider"} textstyles={"text-16-body mb-[40px]"} />
                </ScrollOpacity>

                <div>
                    {aboutStory.map(({ index, story }, i) => (
                        <ScrollOpacity key={i}>
                            <div
                                className="flex flex-col gap-y-[25px] lg:gap-y-0 lg:flex-row lg:items-baseline first:md:mb-[40px] first:mb-[50px] relative"
                            >
                                <span className="text-14-body lg:absolute lg:bottom-[8px] lg:left-[-50px]">
                                    {index}
                                </span>
                                <SplitLineText
                                    text={story}
                                    textstyles={'text-25-body md:text-32-body'}
                                />
                            </div>
                        </ScrollOpacity>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
