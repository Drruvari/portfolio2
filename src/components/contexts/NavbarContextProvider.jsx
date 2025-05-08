import { useState } from "react";
import NavbarContext from "./NavbarContext";
import { navLinks, socials } from "../../lib/navbarData";

const NavbarContextProvider = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sectionRefs, setSectionRefs] = useState({});
    const [navbarHidden, setNavbarHidden] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [navlinksLeft, setNavlinksLeft] = useState(0);

    const copyEmail = async () => {
        const email = "hr@codevider.com";
        try {
            await navigator.clipboard.writeText(email);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch (error) {
            throw new Error(error);
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
