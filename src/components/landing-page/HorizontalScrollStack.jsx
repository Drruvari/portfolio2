import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: 'Full Stack Development: Scalable Web Solutions',
        text: 'Leverage our expertise in MEAN.js, LAMP, and MERN stacks to build robust web applications tailored to your business needs.',
        videoSrc: 'https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4',
    },
    {
        id: 2,
        title: 'Agile Development: Delivering Quality Software Faster',
        text: 'Our agile methodology ensures rapid development cycles, continuous integration, and timely delivery of high-quality software solutions.',
        videoSrc: 'https://videos.pexels.com/video-files/2516160/2516160-hd_1920_1080_24fps.mp4',
    },
    {
        id: 3,
        title: 'Custom API Integrations: Seamless Connectivity',
        text: 'Integrate your applications with third-party services like PayPal, Stripe, and Facebook API for enhanced functionality and user experience.',
        videoSrc: 'https://videos.pexels.com/video-files/5377268/5377268-uhd_1440_2560_25fps.mp4',
    },
    {
        id: 4,
        title: 'Database Solutions: Reliable and Scalable Storage',
        text: 'Our team specializes in both relational (MySQL, PostgreSQL) and NoSQL (MongoDB, Redis) databases to ensure data integrity and scalability.',
        videoSrc: 'https://videos.pexels.com/video-files/5925291/5925291-uhd_2560_1440_24fps.mp4',
    },
];

export default function HorizontalScrollStack() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const wrapper = section.querySelector('.wrapper');
        const items = wrapper.querySelectorAll('.item');

        // Set initial state: offset all except first card
        items.forEach((item, index) => {
            if (index !== 0) {
                gsap.set(item, { xPercent: 100 });
            }
        });

        // Build timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: 'top top',
                end: () => `+=${items.length * 100}%`,
                scrub: 1,
                invalidateOnRefresh: true,
            },
            defaults: { ease: 'none' },
        });

        items.forEach((item, idx) => {
            tl.to(item, { scale: 0.9, borderRadius: '0.625rem' });
            if (items[idx + 1]) {
                tl.to(items[idx + 1], { xPercent: 0 }, '<');
            }
        });

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
        >
            <div className="wrapper h-screen">
                <div className="list flex items-center h-full relative px-1">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className="item absolute inset-0 w-screen h-full flex overflow-hidden"
                            data-index={index}
                        >
                            <div className="w-1/2 bg-myWhite text-gray-900 p-12 flex flex-col justify-center relative">
                                <div className="absolute top-24 left-12 h-12 w-12 mb-2 rounded-full bg-myBlack text-myWhite flex items-center justify-center font-normal text-base">
                                    {card.id}
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                                <p>{card.text}</p>
                            </div>
                            <video
                                src={card.videoSrc}
                                className="w-1/2 h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
