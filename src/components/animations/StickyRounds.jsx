import image from "../../assets/images/hero-pointer-down.afdacced.svg";
import MagneticGSAP from "./MagneticGSAP";

function StickyRounds() {
    return (
        <div>
            <MagneticGSAP>
                <div className="absolute w-[230px] h-[230px] bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center ">
                    <div className="w-[95px] h-[95px] border-2 border-myGray rounded-full flex justify-center items-center">
                        <img
                            src={image}
                            width={50}
                            height={50}
                            alt="rounds"
                        />
                    </div>
                    <MagneticGSAP>
                        <div className="absolute w-[230px] h-[230px] bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                            <div className="w-[95px] h-[95px] border-2 border-myGray rounded-full flex justify-center items-center"></div>
                        </div>
                    </MagneticGSAP>
                </div>
            </MagneticGSAP>
        </div>
    );
}

export default StickyRounds;
