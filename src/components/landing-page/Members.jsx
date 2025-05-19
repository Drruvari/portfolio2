import { useRef, useState } from "react";
import al from "../../assets/images/al.jpg";
import ed from "../../assets/images/ed.jpg";
import ez from "../../assets/images/ez.jpg";
import pt from "../../assets/images/pt.jpg";
import SplitLineText from "../global/SplitLineText";
import useCursor from "../hooks/useCursor";
import MembersList from "./MembersList";
import PreviewModal from "./PreviewModal";

const teamMembers = [
    {
        name: "Pasho Toska",
        role: "Managing Partner",
        year: "Joined 2019",
        experience: "15+ years",
        preview: pt,
        color: "#5DEA7C",
    },
    {
        name: "Ervin Ziko",
        role: "Finance Manager",
        year: "Joined 2020",
        experience: "10+ years",
        preview: ez,
        color: "#E3E3E3",
    },
    {
        name: "Erion Domi",
        role: "Multinational Manager",
        year: "Joined 2021",
        experience: "12+ years",
        preview: ed,
        color: "#F2F2F2",
    },
    {
        name: "Altin Luli",
        role: "Outsourcing Manager",
        year: "Joined 2022",
        experience: "8+ years",
        preview: al,
        color: "#121212",
    },
];

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
