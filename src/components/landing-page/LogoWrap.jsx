import { gsap } from "gsap";
import { useEffect } from "react";
import logo1 from "../../assets/codevider/C_L.png";
import logo3 from "../../assets/codevider/D_L.png";
import logo7 from "../../assets/codevider/D_L1.png";
import logo4 from "../../assets/codevider/E_L.png";
import logo8 from "../../assets/codevider/E_L1.png";
import logo6 from "../../assets/codevider/I_L.png";
import logo2 from "../../assets/codevider/O_L.png";
import logo9 from "../../assets/codevider/R_L.png";
import logo5 from "../../assets/codevider/V_L.png";
import useCursor from "../hooks/useCursor";

export default function LogoWrap() {
    const { setCursorType } = useCursor();

    useEffect(() => {
        const allcontainer = gsap.utils.toArray(".container-item");
        const venueImageWrap = document.querySelector(".container-img-wrap");
        const venueImage = document.querySelector(".container-img");

        function venueHover(e) {
            if (e.type === "mouseenter") {
                const text = e.target.dataset.text;
                gsap.set(venueImage, {
                    backgroundImage: "none",
                });
                venueImage.innerText = text;
                gsap.to(venueImageWrap, {
                    duration: 0.4,
                    autoAlpha: 1,
                });
                setCursorType("hovered");
            } else if (e.type === "mouseleave") {
                venueImage.innerText = "";
                gsap.to(venueImageWrap, {
                    duration: 0.4,
                    autoAlpha: 0,
                });
                setCursorType('default');
            }
        }

        function moveVenueImage(e) {
            const xpos = e.clientX;
            const ypos = e.clientY;
            gsap.to(venueImageWrap, {
                x: xpos,
                y: ypos,
            });
        }

        allcontainer.forEach((link) => {
            link.addEventListener("mouseenter", venueHover);
            link.addEventListener("mouseleave", venueHover);
            link.addEventListener("mousemove", moveVenueImage);
        });
    }, [setCursorType]);

    const items = [
        { id: "c", src: logo1, label: "Create" },
        { id: "o", src: logo2, label: "Organize" },
        { id: "d", src: logo3, label: "Develop" },
        { id: "e", src: logo4, label: "Execute" },
        { id: "v", src: logo5, label: "Validate" },
        { id: "i", src: logo6, label: "Innovate" },
        { id: "d", src: logo7, label: "Deliver" },
        { id: "e", src: logo8, label: "Evolve" },
        { id: "r", src: logo9, label: "Revolutionize" },
    ];

    return (
        <div className="w-full max-w-screen mx-auto mb-[32rem] px-4 lg:px-0 py-8 flex flex-wrap items-center justify-center gap-4 relative">
            <div className="container-img-wrap fixed top-0 left-0 w-[300px] h-[150px] pointer-events-none z-50">
                <div className="container-img w-full h-full text-black flex items-center justify-center text-xl md:text-3xl font-bold font-raleway text-center"></div>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    id={item.id}
                    className="container-item w-[60px] md:w-[80px] lg:w-[100px] xl:w-[120px] transition-all duration-300 ease-in-out hover:scale-125"
                    data-text={item.label}
                >
                    <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-auto object-contain"
                    />
                </div>
            ))}
        </div>
    );
}
