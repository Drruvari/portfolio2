import gsap from "gsap";
import { useRef } from "react";
import useCursor from "../hooks/useCursor";

const ButtonHighlight = ({
    children,
    styles,
    handleClick = () => null,
    mouseEnterFunc = () => null,
    mouseLeaveFunc = () => null,
    disabled = false,
    allowEvents = false
}) => {
    const btnRef = useRef();
    const highlightRef = useRef();
    const { setCursorType, setCursorLabel, setCursorContext } = useCursor();

    const getParams = (e) => {
        const rect = btnRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const xPos = (mx / rect.width) * 100;
        const yPos = (my / rect.height) * 100;
        return { highlight: highlightRef.current, xPos, yPos };
    };

    const handleMouseEnter = (e) => {
        // custom cursor hover
        if (!window.matchMedia("(pointer: coarse)").matches) {
            setCursorType('none');
            setCursorLabel('');
            setCursorContext("none");
        }
        // skip on mobile
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const { highlight, xPos, yPos } = getParams(e);
        mouseEnterFunc();
        gsap.killTweensOf(highlight);
        gsap.set(highlight, { opacity: 1, clipPath: `circle(20% at ${xPos}% ${yPos}%)` })
            .then(() => moveSpan(e));
    };

    const handleMouseMove = (e) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        moveSpan(e);
    };

    const handleMouseLeave = (e) => {
        // reset custom cursor
        if (!window.matchMedia("(pointer: coarse)").matches) {
            setCursorType('default');
            setCursorLabel('');
            setCursorContext('');
        }
        const { highlight, xPos, yPos } = getParams(e);
        mouseLeaveFunc();
        gsap.to(highlight, { clipPath: `circle(0% at ${xPos}% ${yPos}%)`, duration: 0.25 })
            .then(() => gsap.set(highlight, { opacity: 0 }));
    };

    const moveSpan = (e) => {
        const { highlight, xPos, yPos } = getParams(e);
        gsap.to(highlight, { clipPath: `circle(105% at ${xPos}% ${yPos}%)`, duration: 0.4 });
    };

    const nativeHandleClick = () => {
        if (disabled) return;
        handleClick();
    };

    return (
        <button
            ref={btnRef}
            data-cursor-target
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={nativeHandleClick}
            className={`relative overflow-hidden ${styles} rounded-full flex justify-center items-center border-2 border-myGray uppercase`}
            style={{
                pointerEvents: disabled ? "none" : "all",
                opacity: disabled ? 0.4 : 1,
                cursor: 'none' // hide default pointer
            }}
        >
            <span
                ref={highlightRef}
                className="absolute left-0 top-0 h-full w-full bg-myAccent z-[0] opacity-0 pointer-events-none"
            />
            <div
                className="h-fit w-fit relative z-1"
                style={{ pointerEvents: allowEvents ? "all" : "none" }}
            >
                {children}
            </div>
        </button>
    );
};

export default ButtonHighlight;
