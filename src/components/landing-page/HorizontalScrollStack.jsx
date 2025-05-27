import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: 'Full Stack Development: Scalable Web Solutions',
        text: 'Leverage our expertise in MEAN.js, LAMP, and MERN stacks to build robust web applications tailored to your business needs.',
        imgSrc: 'https://images.pexels.com/photos/31005851/pexels-photo-31005851/free-photo-of-serene-riverside-scene-with-bicycle-and-benches.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
        id: 2,
        title: 'Agile Development: Delivering Quality Software Faster',
        text: 'Our agile methodology ensures rapid development cycles, continuous integration, and timely delivery of high-quality software solutions.',
        imgSrc: 'https://images.pexels.com/photos/31496884/pexels-photo-31496884/free-photo-of-vibrant-white-daisies-in-full-bloom-closeup.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
        id: 3,
        title: 'Custom API Integrations: Seamless Connectivity',
        text: 'Integrate your applications with third-party services like PayPal, Stripe, and Facebook API for enhanced functionality and user experience.',
        imgSrc: 'https://images.pexels.com/photos/32143009/pexels-photo-32143009/free-photo-of-cable-car-descending-in-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    },
    {
        id: 4,
        title: 'Database Solutions: Reliable and Scalable Storage',
        text: 'Our team specializes in both relational (MySQL, PostgreSQL) and NoSQL (MongoDB, Redis) databases to ensure data integrity and scalability.',
        imgSrc: 'https://images.pexels.com/photos/32058694/pexels-photo-32058694/free-photo-of-cozy-alpine-cabins-in-misty-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
                            <div className="w-1/2 bg-myWhite text-myBlack p-12 flex flex-col justify-center relative">
                                <div className="absolute top-24 left-12 h-12 w-12 mb-2 rounded-full bg-myBlack text-myWhite flex items-center justify-center font-normal text-base">
                                    {card.id}
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                                <p>{card.text}</p>
                            </div>
                            <img
                                src={card.imgSrc}
                                className="w-1/2 h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
