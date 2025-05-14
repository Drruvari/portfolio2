import { gsap } from "gsap";
import { useEffect } from "react";
import useCursor from "../hooks/useCursor";

export default function LogoWrap() {
    const { setCursorType, setCursorLabel } = useCursor();

    useEffect(() => {
        const allcontainer = gsap.utils.toArray(".container-item");
        const venueImageWrap = document.querySelector(".container-img-wrap");
        const venueImage = document.querySelector(".container-img");

        function venueHover(e) {
            if (e.type === "mouseenter") {
                const text = e.target.dataset.text;
                gsap.set(venueImage, { backgroundImage: "none" });
                venueImage.innerText = text;
                gsap.to(venueImageWrap, { duration: 0.4, autoAlpha: 1 });
                setCursorType("hovered");
            } else if (e.type === "mouseleave") {
                venueImage.innerText = "";
                gsap.to(venueImageWrap, { duration: 0.4, autoAlpha: 0 });
                setCursorType("default");
            }
        }

        function moveVenueImage(e) {
            gsap.to(venueImageWrap, { x: e.clientX, y: e.clientY });
        }

        allcontainer.forEach((link) => {
            link.addEventListener("mouseenter", venueHover);
            link.addEventListener("mouseleave", venueHover);
            link.addEventListener("mousemove", moveVenueImage);
        });
    }, [setCursorType]);

    const items = [
        { id: "C", label: "Create" },
        { id: "O", label: "Organize" },
        { id: "D", label: "Design" },
        { id: "E", label: "Execute" },
        { id: "V", label: "Visualize" },
        { id: "I", label: "Implement" },
        { id: "D", label: "Design" },
        { id: "E", label: "Execute" },
        { id: "R", label: "Reorganize" },
    ];

    return (
        <div className="w-full mx-auto px-4 md:px-8 py-8 flex flex-wrap items-center justify-center gap-2 md:gap-4 relative">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="container-item transition-transform duration-300 ease-in-out hover:scale-110 md:hover:scale-125"
                    onMouseEnter={() => {
                        setCursorLabel(item.label);
                        setCursorType("hovered");
                    }}
                    onMouseLeave={() => {
                        setCursorType("default");
                    }}
                >
                    <div className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem] 2xl:text-[16rem] font-mono w-full">
                        {item.id}
                    </div>
                </div>
            ))}
        </div>
    );
}
