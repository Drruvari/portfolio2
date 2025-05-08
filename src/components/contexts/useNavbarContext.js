import { useContext } from "react";
import NavbarContext from "./NavbarContext";

const useNavbarContext = () => {
    const context = useContext(NavbarContext);
    if (!context) throw new Error("Navbar context is undefined");
    return context;
};

export default useNavbarContext;
