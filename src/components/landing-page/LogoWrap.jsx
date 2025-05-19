import logo1 from "../../assets/codevider/C_L.png";
import logo3 from "../../assets/codevider/D_L.png";
import logo7 from "../../assets/codevider/D_L1.png";
import logo4 from "../../assets/codevider/E_L.png";
import logo8 from "../../assets/codevider/E_L1.png";
import logo6 from "../../assets/codevider/I_L.png";
import logo2 from "../../assets/codevider/O_L.png";
import logo9 from "../../assets/codevider/R_L.png";
import logo5 from "../../assets/codevider/V_L.png";

const LogoWrap = () => {
    return (
        <div className="logoWrap w-full flex flex-nowrap justify-between">
            <span className="w-[16%]">
                <img id="c" src={logo1} alt="Letter C" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="o" src={logo2} alt="Letter O" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="d" src={logo3} alt="Letter D" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="e" src={logo4} alt="Letter E" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="v" src={logo5} alt="Letter V" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="i" src={logo6} alt="Letter I" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="d1" src={logo7} alt="Letter D" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="e1" src={logo8} alt="Letter E" className="w-full" />
            </span>
            <span className="w-[16%]">
                <img id="r" src={logo9} alt="Letter R" className="w-full" />
            </span>
        </div>
    )
}

export default LogoWrap;
