import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const animateStyles = {
    top: {
        start: "top 0%",
        end: "bottom 60%",
    },
    end: {
        start: "top 90%",
        end: "bottom 100%",
    },
};

export default function ScrollAnimationText({ textArray, animateData }) {
    let refs = useRef([]);
    const container = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Ensure all refs are populated
        gsap.set(refs.current, { opacity: 0.2 });

        gsap.to(refs.current, {
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container.current,
                scrub: true,
                start: animateStyles[animateData].start,
                end: animateStyles[animateData].end,
            },
        });

        ScrollTrigger.refresh();
    }, [animateData]);

    return (
        <div
            ref={container}
            className="w-full h-full flex justify-center md:justify-start items-center md:items-start text-myWhite"
        >
            <div className="w-[90%] flex flex-wrap justify-start text-4xl md:text-8xl md:gap-y-14 md:gap-x-5 font-extrabold uppercase">
                {textArray.map((item, i) => (
                    <div key={i} className="leading-[60px]">
                        {item.text.split("").map((letter, index) => (
                            <span
                                key={index}
                                className="inline-block opacity-20"
                                ref={(el) => refs.current.push(el)}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                ))}

                {/* <div className="w-full h-96 relative"></div> */}
            </div>
        </div>
    );
}
