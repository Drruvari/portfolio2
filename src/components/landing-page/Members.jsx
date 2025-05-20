import { useRef, useState } from "react";
import SplitLineText from "../global/SplitLineText";
import useCursor from "../hooks/useCursor";
import MembersList from "./MembersList";
import PreviewModal from "./PreviewModal";
import { teamMembers } from "../global/DummyData";

const Members = () => {
    const [activePreview, setActivePreview] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const containerRef = useRef();
    const { setCursorType, setCursorContext } = useCursor();

    const handleEnter = () => {
        setModalActive(true);
        // hide custom cursor
        setCursorType("none");
        setCursorContext("none");
    };

    const handleLeave = () => {
        setModalActive(false);
        // restore default custom cursor
        setCursorType("default");
        setCursorContext("");
    };

    return (
        <section
            ref={containerRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="w-full h-fit text-60-title relative group cursor-default"
        >
            <div className="relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h opacity-45 text-14-body">
                <div className="basis-[50%] lg:basis-[20%] text-left">
                    <SplitLineText text="Full Name" />
                </div>

                <div className="basis-[50%] justify-between hidden lg:flex">
                    <SplitLineText text="Role" />
                    <SplitLineText text="Experience" />
                </div>

                <div className="basis-[50%] lg:basis-[20%] text-right">
                    <SplitLineText text="Joined" />
                </div>
            </div>

            <div>
                {teamMembers.map(({ name, role, experience, year }, i) => (
                    <MembersList
                        key={i}
                        name={name}
                        role={role}
                        experience={experience}
                        year={year}
                        handleMouseEnter={() => setActivePreview(i)}
                    />
                ))}

                <PreviewModal
                    members={teamMembers}
                    activePreview={activePreview}
                    modalActive={modalActive}
                />
            </div>
        </section>
    );
};

export default Members;
