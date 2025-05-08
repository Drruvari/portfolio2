import useNavbarContext from "../contexts/useNavbarContext";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useDevice from "../hooks/useDevice";
import Marquee from "./Marquee";

const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();

    return (
        <section className="w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h relative">
            <div
                className={`flex flex-col gap-y-[20px] absolute`}
                style={{ left: `${deviceWidth > 1023 ? navlinksLeft : 20}px` }}
            >
                {
                    deviceWidth > 768 ? (
                        <ScrollOpacity>
                            <SlideIn key={"desktop"}>
                                <h1 className="text-45-title md:text-60-title">Scalable</h1>
                                <h1 className="text-45-title md:text-60-title">
                                    Digital Platforms
                                </h1>
                            </SlideIn>
                        </ScrollOpacity>
                    ) : (
                        <ScrollOpacity>
                            <SlideIn key={"mobile"}>
                                <h1 className="text-45-title md:text-60-title">Scalable</h1>
                                <h1 className="text-45-title md:text-60-title">Digital</h1>
                                <h1 className="text-45-title md:text-60-title">Platforms</h1>
                            </SlideIn>
                        </ScrollOpacity>
                    )
                }

                <ScrollOpacity>
                    <SlideIn delay={0.15}>
                        <span className="block text-25-body w-[70%] lg:w-full">
                            Custom-built web and mobile applications — fast, reliable, and built to grow.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <Marquee>
                    <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25] ">
                        <h2 className="text-large-m md:text-large-d text-nowrap">Codevider</h2>
                        <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myBlack rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" />
                    </div>
                </Marquee>
            </div>

        </section>
    );
};

export default Hero;
