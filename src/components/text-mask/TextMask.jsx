import useTextMaskAnimation from "../hooks/useTextMaskAnimation";

function TextMask() {
    const { containerRef } = useTextMaskAnimation();

    return (
        <div
            ref={containerRef}
            className="h-full z-20 hidden md:block font-extrabold text-myWhite"
        >
            <div className="content w-full h-full flex justify-center items-center text-[90px]">
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

            <div className="hidden-content w-full h-full flex justify-center items-center text-[90px] font-black absolute top-0 text-myBlack">
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
