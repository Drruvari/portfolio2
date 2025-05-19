import { useState } from "react";
import { navLinks, socials } from "../../lib/navbarData";
import { COMPANY_EMAIL } from "../utility/constants";
import NavbarContext from "./NavbarContext";

const NavbarContextProvider = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sectionRefs, setSectionRefs] = useState({});
    const [navbarHidden, setNavbarHidden] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [navlinksLeft, setNavlinksLeft] = useState(0);

    const copyEmail = async () => {
        const email = COMPANY_EMAIL;
        try {
            await navigator.clipboard.writeText(email);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy email: ", error);
        }
    };

    return (
        <NavbarContext.Provider
            value={{
                menuOpen,
                setMenuOpen,
                navLinks,
                socials,
                sectionRefs,
                setSectionRefs,
                navbarHidden,
                setNavbarHidden,
                copyEmail,
                emailCopied,
                navlinksLeft,
                setNavlinksLeft,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
};

export default NavbarContextProvider;
