import { useEffect, useRef } from 'react';
import useNavbarContext from '../contexts/useNavbarContext';
import About from './About';
import HeroSection from './HeroSection';
import HorizontalScrollStack from './HorizontalScrollStack';
import Members from './Members';
import Services from './Services';

const LandingPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const heroRef = useRef();
    const aboutRef = useRef();
    const membersRef = useRef();
    const servicesRef = useRef();
    const scrollStackRef = useRef();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            hero: heroRef,
            about: aboutRef,
            members: membersRef,
            services: servicesRef,
            scrollStack: scrollStackRef
        }))
    }, [setSectionRefs])

    return (
        <div>
            <section ref={heroRef}>
                <HeroSection />
            </section>
            <section ref={scrollStackRef}>
                <HorizontalScrollStack />
            </section>
            <section ref={aboutRef}>
                <About />
            </section>
            <section ref={membersRef}>
                <Members />
            </section>
            <section ref={servicesRef}>
                <Services />
            </section>
        </div>
    )
}

export default LandingPage;
