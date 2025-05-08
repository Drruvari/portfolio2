import React, { useEffect, useRef } from 'react';
import useNavbarContext from '../contexts/useNavbarContext';
import About from './About';
import Hero from './Hero';
import Projects from './Projects';
import Testimonials from './Testimonials';

const LandingPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const heroRef = useRef();
    const aboutRef = useRef();
    const projectsRef = useRef();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            hero: heroRef,
            about: aboutRef,
            projects: projectsRef
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
            <section ref={projectsRef}>
                <Projects />
            </section>

            <Testimonials />
        </div>
    )
}

export default LandingPage;
