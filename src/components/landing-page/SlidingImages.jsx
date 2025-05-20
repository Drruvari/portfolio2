import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import image from '../../assets/images/image.jpg';

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

  // Adjust slide distance based on screen size
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div
      ref={container}
      className="relative mt-24 sm:mt-32 md:mt-40 lg:mt-48 bg-myWhite z-10 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* First sliding track */}
      <motion.div
        style={{ x: x1 }}
        className="flex gap-4 sm:gap-6 md:gap-8 w-[200vw] sm:w-[150vw] md:w-[120vw] -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-[10vw]"
      >
        {slider1.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 h-[60vw] sm:h-[40vw] md:h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-[80%] h-[80%]">
              <img
                alt="slide"
                src={project.src}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Second sliding track */}
      <motion.div
        style={{ x: x2 }}
        className="flex gap-4 sm:gap-6 md:gap-8 w-[200vw] sm:w-[150vw] md:w-[120vw] -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-[10vw] mt-8 md:mt-12"
      >
        {slider2.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 h-[60vw] sm:h-[40vw] md:h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-[80%] h-[80%]">
              <img
                alt="slide"
                src={project.src}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Reveal shape at bottom */}
      <motion.div
        style={{ height }}
        className="relative mt-12 sm:mt-16 md:mt-20"
      >
        <div
          className="absolute rounded-bl-[50%] rounded-br-[50%] shadow-lg bg-myWhite z-10"
          style={{
            height: '1550%',
            width: '120%',
            left: '-10%'
          }}
        />
      </motion.div>
    </div>
  );
}
