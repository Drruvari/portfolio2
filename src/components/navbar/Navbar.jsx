import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import Logo from "../../assets/Logo";
import DrawRandomUnderlineButton from "../buttons/DrawRandomUnderlineButton";
import useNavbarContext from "../contexts/useNavbarContext";
import Magnetic from "../global/Magnetic";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";
import { myEase1 } from "../utility/constants";
import Hamburger from "./Hamburger";
import Menu from "./Menu";

const Navbar = () => {
    const { navLinks, sectionRefs, setNavbarHidden, setNavlinksLeft } = useNavbarContext();
    const lenis = useLenis();
    const containerRef = useRef();
    const hamburgerRef = useRef();
    const { width: deviceWidth } = useDevice();
    const isDesktopRef = useRef(deviceWidth > 1023);
    const scrollHandlerRef = useRef();
    const navlinksRef = useRef();

    // Cursor context handlers
    const { setCursorType, setCursorContext, setCursorLabel } = useCursor();

    // GSAP hide/show navbar on scroll (desktop only)
    useGSAP(() => {
        const con = containerRef.current;
        const ham = hamburgerRef.current;

        let isHidden = false;
        const ease = myEase1;

        const showNavbar = () => {
            if (!isDesktopRef.current) return;
            gsap.to(con, { y: 0, duration: 0.6, ease });
            gsap.to(ham, { y: 100, xPercent: -50, duration: 0.8, ease });
            isHidden = false;
        };

        const hideNavbar = () => {
            if (!isDesktopRef.current) return;
            gsap.to(con, { y: -100, duration: 0.6, ease });
            gsap.to(ham, { y: 0, xPercent: -50, duration: 0.8, ease });
            isHidden = true;
        };

        const handleScroll = () => {
            if (!isDesktopRef.current) return;
            const scroll = window.scrollY;
            const trigger = 120;

            if (scroll > trigger && !isHidden) hideNavbar();
            else if (scroll <= trigger && isHidden) showNavbar();

            if (window.innerWidth > 1023) {
                setNavbarHidden(isHidden);
            }
        };

        const handleResizeBehavior = () => {
            const isDesktopNow = deviceWidth > 1023;
            if (isDesktopRef.current === isDesktopNow) return;
            isDesktopRef.current = isDesktopNow;
            if (!isDesktopNow) {
                gsap.set(con, { clearProps: "all" });
                gsap.set(ham, { clearProps: "all", xPercent: 0 });
            } else {
                gsap.set(con, { y: 0 });
                gsap.set(ham, { y: 80, xPercent: -50 });
            }
            window.removeEventListener("scroll", scrollHandlerRef.current);
            if (isDesktopRef.current) {
                window.addEventListener("scroll", scrollHandlerRef.current);
            }
        };

        handleResizeBehavior();
        scrollHandlerRef.current = handleScroll;
        if (isDesktopRef.current) window.addEventListener("scroll", scrollHandlerRef.current);

        return () => window.removeEventListener("scroll", scrollHandlerRef.current);
    }, [deviceWidth]);

    // Mousemove interaction: links attract to cursor
    useEffect(() => {
        const container = navlinksRef.current;
        if (!container) return;
        const links = Array.from(container.querySelectorAll('button'));
        const maxDistance = 200;

        const handleNavMove = (e) => {
            links.forEach((link) => {
                const rect = link.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);
                const strength = Math.max(0, 1 - dist / maxDistance);
                gsap.to(link, {
                    y: -15 * strength,
                    scale: 1 + 0.1 * strength,
                    duration: 0.3,
                    ease: "power3.out"
                });
            });
        };

        const resetLinks = () => {
            links.forEach(link => gsap.to(link, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" }));
        };

        container.addEventListener('mousemove', handleNavMove);
        container.addEventListener('mouseleave', resetLinks);
        return () => {
            container.removeEventListener('mousemove', handleNavMove);
            container.removeEventListener('mouseleave', resetLinks);
        };
    }, []);

    // Lenis smooth scroll navigation
    const navigateToSection = (sectionName) => {
        const activeSection = sectionRefs[sectionName.toLowerCase()];
        if (!activeSection?.current) throw new Error("Section is undefined");
        lenis.scrollTo(activeSection.current, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            offset: sectionName.toLowerCase() === "members" ? -window.innerHeight / 4 : 0,
        });
    };

    // Update navlinks offset on resize
    useLayoutEffect(() => {
        const links = navlinksRef.current;
        if (!links) return;
        const rect = links.getBoundingClientRect();
        setNavlinksLeft(rect.left);
    }, [deviceWidth, setNavlinksLeft]);

    return (
        <div className="fixed top-0 w-full z-30">
            <div className="fixed left-[25px] top-[22px] z-30 lg:left-[35px]">
                <Magnetic>
                    <button
                        onMouseEnter={() => { setCursorType('hovered'); setCursorContext('logo'); setCursorLabel('Codevider'); }}
                        onMouseLeave={() => { setCursorType('default'); setCursorContext(''); }}
                        onClick={() => navigateToSection("hero")} aria-label="Navigate to Hero Section">
                        <Logo />
                    </button>
                </Magnetic>
            </div>

            <nav ref={containerRef} className="fixed top-0 left-0 w-full z-[3] px-mobile lg:px-desktop-h py-[22px] bg-transparent">
                <div className="flex items-center justify-between">
                    <div className="w-[24px] aspect-square pointer-events-none" />

                    <div ref={navlinksRef} className="hidden lg:flex gap-x-[16px] items-center justify-center"
                        onMouseEnter={() => {
                            setCursorType('none');
                            setCursorContext('nav-link');
                        }}
                        onMouseLeave={() => {
                            setCursorType('default');
                            setCursorContext('');
                        }}
                    >
                        {navLinks.map((item, i) => (
                            <Magnetic key={i}>
                                <DrawRandomUnderlineButton
                                    text={item}
                                    onClick={() => navigateToSection(item)}
                                    className="text-myWhite"
                                />
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </nav>

            <div ref={hamburgerRef} className="fixed top-[22px] right-[20px] z-[5] lg:top-[unset] lg:bottom-[35px] lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[100px] lg:right-auto">
                <Hamburger />
            </div>

            <Menu />
        </div>
    );
};

export default Navbar;
