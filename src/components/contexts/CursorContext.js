import { createContext } from 'react';

export const CursorContext = createContext({
    cursorType: 'default',
    cursorLabel: '',
    mouseX: 0,
    mouseY: 0,
    setCursorContext: () => { },
    setCursorType: () => { },
    setCursorLabel: () => { },
    setMousePosition: () => { },
});
