import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import image from '../../assets/images/ez.jpg';

const slider1 = [
    { color: '#e3e5e7', src: image },
    { color: '#d6d7dc', src: image },
    { color: '#e3e3e3', src: image },
    { color: '#21242b', src: image }
];

const slider2 = [
    { color: '#d4e3ec', src: image },
    { color: '#e5e0e1', src: image },
    { color: '#d7d4cf', src: image },
    { color: '#e1dad6', src: image }
];

export default function SlidingImages() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    return (
        <div
            ref={container}
            className="flex flex-col gap-[3vw] bg-myWhite z-10"
        >
            <motion.div
                style={{ x: x1 }}
                className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
            >
                {slider1.map((project, index) => (
                    <div
                        key={index}
                        className="w-[25%] h-[20vw] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[80%] h-[80%]">
                            <img
                                alt="image"
                                src={project.src}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            <motion.div
                style={{ x: x2 }}
                className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
            >
                {slider2.map((project, index) => (
                    <div
                        key={index}
                        className="w-[25%] h-[20vw] flex items-center justify-center"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="relative w-[80%] h-[80%]">
                            <img
                                alt="image"
                                src={project.src}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            <motion.div style={{ height }} className="relative mt-[200px]">
                <div className="absolute h-[1550%] w-[120%] -left-[10%] rounded-bl-4xl rounded-br-4xl bg-myWhite z-10 shadow-[0px_60px_50px_rgba(0,0,0,0.748)]" />
            </motion.div>
        </div>
    );
}
