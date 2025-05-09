import { useEffect, useState } from 'react';
import { CursorContext } from './CursorContext';

const CursorProvider = ({ children }) => {
    const [cursorType, setCursorType] = useState('default');
    const [cursorLabel, setCursorLabel] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const value = {
        cursorType,
        setCursorType,
        cursorLabel,
        setCursorLabel,
        mouseX: mousePos.x,
        mouseY: mousePos.y,
        setMousePosition: setMousePos
    };

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
};

export default CursorProvider;
