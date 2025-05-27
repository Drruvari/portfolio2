import useTextMaskAnimation from "../hooks/useTextMaskAnimation";

function TextMask() {
    const { containerRef } = useTextMaskAnimation();

    return (
        <div
            ref={containerRef}
            className="h-full relative z-10 hidden md:block font-extrabold text-myWhite"
        >
            <div className="content w-full h-full flex justify-center items-center text-[90px] relative z-10">
                <div className="leading-[90px] hiden-text overflow-visible py-5">
                    <div>
                        <p className="text-2xl w-fit uppercase">
                            <span className="block font-normal">Code smarter,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block">Innovate together,</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden-content w-full h-full flex justify-center items-center text-[90px] font-black top-0 left-0 right-0 bottom-0 text-myBlack relative z-20">
                <div className="leading-[90px] hiden-text overflow-visible">
                    <div>
                        <p className="text-2xl w-fit uppercase">
                            <span className="block font-normal">Join Codevider,</span>
                        </p>
                    </div>
                    <div>
                        <p className="w-fit uppercase">
                            <span className="block">Empower you team</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextMask;
