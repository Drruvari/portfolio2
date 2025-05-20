import { useEffect, useRef } from 'react';
import useNavbarContext from '../contexts/useNavbarContext';
import About from './About';
import Hero from './Hero';
import Members from './Members';
import SlidingImages from './SlidingImages';
import Testimonials from './Testimonials';
import Contact from './Contact';

const LandingPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const heroRef = useRef();
    const aboutRef = useRef();
    const membersRef = useRef();
    const testimonialsRef = useRef();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            hero: heroRef,
            about: aboutRef,
            members: membersRef,
            testimonials: testimonialsRef
        }))
    }, [setSectionRefs])

    return (
        <div>
            <section ref={heroRef}>
                <Hero />
            </section>
            <section ref={aboutRef}>
                <About />
            </section>
            <section ref={membersRef}>
                <Members />
            </section>
            <section ref={testimonialsRef}>
                <Testimonials />
            </section>
            <section className="overflow-x-hidden">
                <SlidingImages />
                <Contact />
            </section>
        </div>
    )
}

export default LandingPage;
