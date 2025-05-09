import { createContext } from 'react';

export const CursorContext = createContext({
    cursorType: 'default',
    setCursorType: () => { },
});
