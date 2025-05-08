import logo from "./images/logo.svg";

const Logo = ({ color }) => {
    const style = color ? { filter: `brightness(0) saturate(100%) invert(${color === 'white' ? 1 : 0})` } : {};

    return <img src={logo} alt="Logo" width={30} height={31} style={style} />;
};

export default Logo;
