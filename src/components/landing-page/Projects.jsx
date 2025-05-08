import { useRef, useState } from "react";
import SplitLineText from "../global/SplitLineText";
import PreviewModal from "./PreviewModal";
import ProjectsList from "./ProjectsList";

const teamMembers = [
    {
        name: "Pasho Toska",
        role: "Managing Partner",
        year: "Joined 2019",
        experience: "15+ years",
        preview: "/src/assets/images/Placeholder.png",
        color: "#5DEA7C",
    },
    {
        name: "Ervin Ziko",
        role: "Finance Manager",
        year: "Joined 2020",
        experience: "10+ years",
        preview: "/src/assets/images/Placeholder.png",
        color: "#E3E3E3",
    },
    {
        name: "Erion Domi",
        role: "Multinational Manager",
        year: "Joined 2021",
        experience: "12+ years",
        preview: "/src/assets/images/Placeholder.png",
        color: "#F2F2F2",
    },
    {
        name: "Altin Luli",
        role: "Outsourcing Manager",
        year: "Joined 2022",
        experience: "8+ years",
        preview: "/src/assets/images/Placeholder.png",
        color: "#121212",
    },
];

const Projects = () => {
    const [activePreview, setActivePreview] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const containerRef = useRef();

    return (
        <section
            ref={containerRef}
            onMouseEnter={() => setModalActive(true)}
            onMouseLeave={() => setModalActive(false)}
            className="w-full h-fit text-60-title relative group"
        >
            <div className=" relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h opacity-45 text-14-body">
                <div className="basis-[50%] lg:basis-[20%] text-left">
                    <SplitLineText text={"Full Name"} />
                </div>

                <div className="basis-[50%] justify-between hidden lg:flex">
                    <SplitLineText text={"Role"} />
                    <SplitLineText text={"Experience"} />
                </div>

                <div className="basis-[50%] lg:basis-[20%] text-right">
                    <SplitLineText text={"Joined"} />
                </div>
            </div>

            <div>
                {teamMembers.map(({ name, role, experience, year }, i) => (
                    <ProjectsList
                        key={i}
                        name={name}
                        services={role}
                        duration={experience}
                        year={year}
                        handleMouseEnter={() => setActivePreview(i)}
                    />
                )
                )}

                <PreviewModal
                    projects={teamMembers}
                    activePreview={activePreview}
                    modalActive={modalActive}
                />
            </div>
        </section>
    );
};

export default Projects;
