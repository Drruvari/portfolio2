import MagneticGSAP from "./MagneticGSAP";

function StickyRounds({ className }) {
    return (
        <div className={`${className || ""} relative`}>
            <MagneticGSAP>
                <div
                    className="absolute w-56 h-56 bottom-0 left-1/2 transform -translate-x-1/2 z-20 flex justify-center items-center"
                >
                    <div className="w-36 h-36 border-2 border-myGray rounded-full flex justify-center items-center">
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <span className="text-myGray uppercase tracking-wide text-16-para">
                                Scroll down
                            </span>
                        </div>
                    </div>

                    <MagneticGSAP>
                        <div
                            className="absolute w-56 h-56 bottom-0 left-1/2 transform -translate-x-1/2 z-20 flex justify-center items-center"
                        >
                            <div className="w-36 h-36 border-2 border-myGray rounded-full flex justify-center items-center" />
                        </div>
                    </MagneticGSAP>
                </div>
            </MagneticGSAP>
        </div>
    );
}

export default StickyRounds;
