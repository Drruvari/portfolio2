import { useEffect, useRef } from 'react';
import useNavbarContext from '../contexts/useNavbarContext';
import About from './About';
import Hero from './Hero';
import Members from './Members';
import Testimonials from './Testimonials';

const LandingPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const heroRef = useRef();
    const aboutRef = useRef();
    const membersRef = useRef();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            hero: heroRef,
            about: aboutRef,
            members: membersRef
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

            <Testimonials />
        </div>
    )
}

export default LandingPage;
