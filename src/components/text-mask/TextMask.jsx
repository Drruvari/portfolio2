import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Logo3D from "../../assets/images/3d-logo.png";
import useTextMaskAnimation from "../hooks/useTextMaskAnimation";

function TextMask() {
    const { containerRef } = useTextMaskAnimation();
    const logoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 2, ease: "sine.inOut" } });

        tl.to(logoRef.current, { scale: 1.1, rotation: 5 })
            .to(logoRef.current, { rotation: -5 }, "<") // start at same time as scale down
            .to(logoRef.current, { scale: 0.9, rotation: 0 }, "+=0.5");

        return () => tl.kill();
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-full relative z-10 hidden md:block font-extrabold text-myWhite"
        >
            {/* 3D logo background behind textmask */}
            <motion.img
                ref={logoRef}
                src={Logo3D}
                alt="3D Logo Background"
                className="absolute inset-0 w-full h-full object-contain object-center opacity-50 pointer-events-none z-0"
                initial={{ scale: 0.9, rotate: 0 }}
                animate={{ scale: [0.9, 1.05, 0.9], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="content w-full h-full flex justify-center items-center text-[90px] relative z-10">
                <div className="leading-[90px] hiden-text w-[800px] overflow-visible py-5">
                    <div>
                        <p className="text-sm w-fit uppercase">
                            <span className="block pl-40 font-normal">Code smarter,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block pl-40">Innovate together,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block pl-40">Ship faster,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase flex items-center gap-9">
                            <span className="pl-40">Succeed with us.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden-content w-full h-full flex justify-center items-center text-[90px] font-black top-0 left-0 right-0 bottom-0 text-myBlack relative z-20">
                <div className="leading-[90px] hiden-text w-[800px] overflow-visible">
                    <div>
                        <p className="text-sm w-fit uppercase">
                            <span className="block pl-40 font-normal">Join Codevider,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block pl-40">Empower your team,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block pl-40">Build solutions,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase flex items-center gap-9">
                            <span className="pl-40">Transform tomorrow.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextMask;
