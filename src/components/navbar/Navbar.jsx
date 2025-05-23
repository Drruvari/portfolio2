import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useLayoutEffect, useRef } from "react";
import Logo from "../../assets/Logo";
import DrawRandomUnderlineButton from "../buttons/DrawRandomUnderlineButton";
import useNavbarContext from "../contexts/useNavbarContext";
import Magnetic from "../global/Magnetic";
import Notification from "../global/Notification";
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

    useGSAP(() => {
        const con = containerRef.current;
        const ham = hamburgerRef.current;

        let isHidden = false;
        let ease = myEase1;

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

    const navigateToSection = (sectionName) => {
        const activeSection = sectionRefs[sectionName.toLowerCase()];
        if (!activeSection?.current) throw new Error("Section is undefined");
        lenis.scrollTo(activeSection.current, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            offset: sectionName.toLowerCase() === "members" ? -window.innerHeight / 4 : 0,
        });
    };

    useLayoutEffect(() => {
        const links = navlinksRef.current;
        if (!links) return;
        const rect = links.getBoundingClientRect();
        setNavlinksLeft(rect.left);
    }, [deviceWidth, setNavlinksLeft]);

    return (
        <>
            <Notification />

            <div className="fixed left-[25px] top-[22px] z-30 lg:left-[35px]">
                <Magnetic>
                    <button onClick={() => navigateToSection("hero")} aria-label="Navigate to Hero Section">
                        <Logo />
                    </button>
                </Magnetic>
            </div>

            <nav ref={containerRef} className="fixed top-0 left-0 w-full z-[3] px-mobile lg:px-desktop-h py-[22px] bg-transparent">
                <div className="flex items-center justify-between">
                    <div className="w-[24px] aspect-square pointer-events-none" />

                    <div ref={navlinksRef} className="hidden lg:flex gap-x-[16px] items-center justify-center">
                        {navLinks.map((item, i) => (
                            <DrawRandomUnderlineButton
                                key={i}
                                text={item}
                                onClick={() => navigateToSection(item)}
                                className="text-myWhite"
                            />
                        ))}
                    </div>
                </div>
            </nav>

            <div ref={hamburgerRef} className="fixed top-[22px] right-[20px] z-[5] lg:top-[unset] lg:bottom-[35px] lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[100px] lg:right-auto">
                <Hamburger />
            </div>

            <Menu />
        </>
    );
};

export default Navbar;
