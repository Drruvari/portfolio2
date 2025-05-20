import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from '../global/Magnetic';

export default function Contact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <motion.div
      ref={container}
      style={{ y }}
      className="relative flex flex-col items-center justify-center bg-myBlack text-myWhite overflow-hidden"
    >
      <div className="pt-48 sm:pt-56 md:pt-64 lg:pt-72 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16 bg-myBlack">
        {/* Title */}
        <div className="relative border-b border-myGray pb-24 sm:pb-32 md:pb-40">
          <span className="inline-flex items-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
              <img
                src="/images/background.jpg"
                alt="background"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="ml-2 text-3xl sm:text-4xl md:text-5xl font-light">
              Let&apos;s work
            </h2>
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-light">
            together
          </h2>

          <motion.div
            style={{ x }}
            className="absolute top-[calc(100%-4.5rem)] sm:top-[calc(100%-5rem)] md:top-[calc(100%-5.5rem)] right-4 sm:right-12 md:right-16 lg:right-24"
          >
            <Magnetic>
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-myAccent rounded-full flex items-center justify-center cursor-pointer">
                <p className="m-0 text-base sm:text-lg md:text-xl font-light relative z-10">
                  Get in touch
                </p>
              </div>
            </Magnetic>
          </motion.div>

          <motion.svg
            style={{ rotate, scale: 2 }}
            className="hidden md:block absolute top-1/3 left-full ml-4"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-16 sm:mt-20">
          <div className="border border-myGray rounded-full px-6 py-3 sm:px-8 sm:py-4 cursor-pointer text-center">
            <p className="m-0 text-sm sm:text-base">info@dennissnellenberg.com</p>
          </div>
          <div className="border border-myGray rounded-full px-6 py-3 sm:px-8 sm:py-4 cursor-pointer text-center">
            <p className="m-0 text-sm sm:text-base">+31 6 27 84 74 30</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 mt-32 sm:mt-40 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
            <span className="flex flex-col gap-2">
              <h3 className="m-0 text-myGray font-light text-sm">Version</h3>
              <p className="m-0 text-sm">2022 © Edition</p>
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="m-0 text-myGray font-light text-sm">Time</h3>
              <p className="m-0 text-sm">11:49 PM GMT+2</p>
            </span>
          </div>
          <div className="flex gap-4 sm:gap-6 items-center justify-center md:justify-end">
            {['Awwwards', 'Instagram', 'Dribbble', 'LinkedIn'].map((item, idx) => (
              <Magnetic key={idx}>
                <p className="m-0 cursor-pointer text-sm sm:text-base">{item}</p>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
