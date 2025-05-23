import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useState } from 'react';
import ArrowIcon from '../../assets/icons/ArrowIcon.jsx';
import ButtonHighlight from '../buttons/ButtonHighlight.jsx';
import { services } from '../global/DummyData.js';
import Magnetic from '../global/Magnetic.jsx';
import useCursor from '../hooks/useCursor.js';
import ServiceImageReveal from './ServiceImageReveal.jsx';

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [allowNavigation, setAllowNavigation] = useState(true);
    const [isNext, setIsNext] = useState(true);
    const reviewsNo = services.length;
    const { setCursorType, setCursorLabel, setCursorContext } = useCursor();

    const onSectionEnter = () => {
        setCursorType('hovered');
        setCursorLabel('Services');
        setCursorContext('section-services');
    };

    const onSectionLeave = () => {
        setCursorType('default');
        setCursorLabel('');
        setCursorContext('');
    };

    useGSAP(() => {
        const split = SplitText.create(".services-desc-text", {
            type: "lines",
            autoSplit: true,
            mask: "lines"
        })

        gsap.fromTo(split.lines,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "power3.out",
                stagger: {
                    amount: .4
                }
            })
    }, [activeIndex])

    const toggleAllowNavigation = () => {
        setAllowNavigation(false);
        setTimeout(() => {
            setAllowNavigation(true);
        }, 800) // same as animation duration
    }

    const handleNext = () => {
        if (!allowNavigation) return null;
        toggleAllowNavigation();
        setIsNext(true);

        if (activeIndex >= reviewsNo - 1) {
            return setActiveIndex(0);
        }
        setActiveIndex(prev => prev += 1);
    }

    const handlePrev = () => {
        if (!allowNavigation) return null;
        toggleAllowNavigation();
        setIsNext(false);

        if (activeIndex == 0) {
            console.log('I am zero')
            return setActiveIndex(reviewsNo - 1);
        }
        setActiveIndex(prev => prev -= 1);
    }

    return (
        <section
            className="relative w-full h-[105vh] bg-myBlack text-myWhite my-[200px] p-mobile lg:p-desktop-h flex flex-col lg:flex-row justify-center items-center overflow-hidden"
            data-cursor-target
            onMouseEnter={onSectionEnter}
            onMouseLeave={onSectionLeave}
        >
            {/* TITLE TEXTS */}
            <motion.div className='absolute left-0 top-0 p-mobile lg:p-desktop-h flex justify-between w-full text-14-body'>
                <span className='w-[65%]'>Services</span>

                <motion.div className='w-[35%] hidden lg:inline-block'>
                    <span>@2019 - 2025</span>
                    <motion.div className='opacity-40 mt-[15px] flex flex-col gap-y-[3px]'>
                        <span>Software Developepment</span>
                        <span>Codevider</span>
                    </motion.div>
                </motion.div>

                <span>/03</span>
            </motion.div>

            {/* SERVICES MODAL */}
            <motion.div className='w-full h-[72%] max-h-[75vh] lg:h-[unset] lg:max-h-[unset] flex flex-col lg:flex-row justify-between lg:justify-center xl:justify-normal items-center lg:gap-x-[135px] xl:gap-x-[0] lg:px-desktop-h'>
                <motion.div className='w-[67%] lg:w-[35%] xl:w-[65%] flex justify-center'>
                    <ServiceImageReveal
                        services={services}
                        activeIndex={activeIndex}
                        allowNavigation={allowNavigation}
                        isNext={isNext} />
                </motion.div>

                <motion.div className='w-full lg:w-[40%] xl:w-[30%] 2xl:w-[22%]'>
                    <motion.div className='flex flex-col gap-y-[5px] lg:gap-y-[10px] mb-[25px]'>
                        <span className='text-32-body lg:text-45-title services-desc-text'>{services[activeIndex].name}</span>
                        <span className='opacity-40 text-14-body services-desc-text'>{services[activeIndex].title}</span>
                    </motion.div>

                    <p className='w-[80%] lg:w-[unset] text-16-body lg:text-25-body services-desc-text'>{services[activeIndex].review}</p>

                    <motion.div className='absolute flex gap-x-[15px] bottom-[5%] lg:bottom-[25%]'>
                        <Magnetic>
                            <ButtonHighlight
                                handleClick={handlePrev}
                                styles={'border-myWhite/40'} allowEvents={true}>
                                <motion.div className='w-[60px] aspect-square flex justify-center items-center arrow-icon-parent'>
                                    <ArrowIcon right={false} />
                                </motion.div>
                            </ButtonHighlight>
                        </Magnetic>

                        <Magnetic>
                            <ButtonHighlight
                                handleClick={handleNext}
                                styles={'border-myWhite/40'} allowEvents={true}>
                                <motion.div className='w-[60px] aspect-square flex justify-center items-center arrow-icon-parent'>
                                    <ArrowIcon />
                                </motion.div>
                            </ButtonHighlight>
                        </Magnetic>
                    </motion.div>

                </motion.div>
            </motion.div>
        </section>
    )
}

export default Services;
