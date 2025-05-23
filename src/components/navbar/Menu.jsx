import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CopiedIcon from "../../assets/icons/CopiedIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import CustomButton from "../buttons/CustomButton";
import useNavbarContext from "../contexts/useNavbarContext";
import useDevice from "../hooks/useDevice";
import { COMPANY_EMAIL, EMAIL_SUBJECT, myEase1 } from "../utility/constants";
import CurvedPath from "./CurvedPath";

const Menu = () => {
    const {
        navLinks,
        socials,
        menuOpen,
        setMenuOpen,
        sectionRefs,
        navbarHidden,
        copyEmail,
        emailCopied
    } = useNavbarContext();
    const menuContainerRef = useRef();
    const navLinksRef = useRef([]);
    const lenis = useLenis();
    const { width: deviceWidth } = useDevice();
    const blurOverlayRef = useRef();

    useEffect(() => {
        if (deviceWidth < 1024) return;

        const blur = blurOverlayRef.current;
        if (!blur) return;
        gsap.killTweensOf(blur);

        if (menuOpen) {
            gsap.set(blur, { zIndex: 2, pointerEvents: "auto" });
            gsap.to(blur, { opacity: 1, duration: .6 });
        } else {
            gsap.to(blur, { opacity: 0, duration: .8 })
                .then(() => {
                    gsap.set(blur, { zIndex: -1, pointerEvents: "none" });
                })
        }

    }, [deviceWidth, menuOpen])

    useEffect(() => {
        if (deviceWidth > 1023 && !navbarHidden) {
            setMenuOpen(false);
        }
    }, [navbarHidden, deviceWidth, setMenuOpen])

    useGSAP(
        () => {
            let con = menuContainerRef.current;
            let links = navLinksRef.current;

            if (!con || links.length < 1) return;
            gsap.killTweensOf([con, ...links]);

            const tl = gsap.timeline();
            let ease = myEase1;

            if (menuOpen) {
                tl.to(con, { transform: "translateX(0)", duration: 0.8, ease });

                tl.fromTo(
                    links,
                    { x: 80 },
                    { x: 0, duration: 0.9, ease, stagger: 0.05 },
                    "<"
                );
            } else {
                tl.to(con, { transform: "translateX(140%)", duration: 0.8, ease });
                tl.to(links, { x: 80, duration: 0.8, ease, stagger: 0.05 }, "<");
            }
        },
        { scope: menuContainerRef.current, dependencies: [menuOpen] }
    );

    const openEmail = () => {
        window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
    };

    const navigateToSection = (sectionName) => {
        const activeSection = sectionRefs[sectionName.toLowerCase()];
        if (!activeSection || !activeSection.current) {
            console.error("Section is undefined:", sectionName);
            return;
        }
        let section = activeSection.current;

        lenis.scrollTo(section, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            offset: sectionName.toLowerCase() === "projects" ? -window.innerHeight / 4 : 0
        });

        setMenuOpen(false);
    };

    return (
        <>
            <div className="fixed w-full h-full left-0 right-0 top-0 overflow-hidden lg:w-[450px] lg:h-[68vh] lg:min-h-[560px]  lg:left-[50%] lg:right-[unset] lg:top-[unset] lg:bottom-[102px] lg:translate-x-[-50%] z-50 pointer-events-none">
                <nav
                    ref={menuContainerRef}
                    className="fixed top-0 right-0 w-full h-full max-w-[500px] bg-myBlack pt-[160px] lg:py-[45px] px-mobile translate-x-[140%] lg:right-[unset] lg:left-0 lg:bottom-0 pointer-events-auto"
                >
                    <div className="mb-[90px] lg:mb-[60px]">
                        <span className="text-14-body text-myWhite opacity-40">
                            Navigation
                        </span>
                        <div className="flex flex-col gap-y-[25px] mt-[40px] text-45-title text-myWhite">
                            {navLinks.map((item, i) => (
                                <button
                                    ref={(el) => (navLinksRef.current[i] = el)}
                                    key={i}
                                    className="text-left"
                                    onClick={() => navigateToSection(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-[40px]">
                        <span className="text-14-body text-myWhite opacity-40">Socials</span>
                        <div className="mt-[25px] text-16-body text-myWhite flex gap-x-[20px]">
                            {socials.map((item, i) => (
                                <Link key={i} to={item.link} target="_blank">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <CustomButton
                            text={COMPANY_EMAIL}
                            bg={true}
                            full={true}
                            icon={<EmailIcon />}
                            handleClick={() => openEmail()}
                        />
                    </div>

                    <div className="hidden lg:block">
                        <CustomButton
                            text={"Copy email"}
                            activeIcon={<CopiedIcon />}
                            bg={true}
                            full={true}
                            handleClick={() => copyEmail()}
                            disabled={emailCopied}
                        />
                    </div>

                    <CurvedPath />
                </nav>
            </div>
            <div ref={blurOverlayRef} onClick={() => setMenuOpen(false)} className="fixed left-0 top-0 w-full h-full pointer-events-none z-[-1] backdrop-blur-[6px] opacity-0" />
        </>
    );
};

export default Menu;
