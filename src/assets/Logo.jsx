import logo from "./images/logo.svg";

const Logo = ({ color }) => {
    const style = color ? { filter: `brightness(0) saturate(100%) invert(${color === 'white' ? 1 : 0})` } : {};

    return <img src={logo} alt="Logo" width={50} height={50} style={style} />;
};

export default Logo;
