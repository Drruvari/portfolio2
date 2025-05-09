import { useState } from 'react';
import { CursorContext } from './CursorContext';

const CursorProvider = ({ children }) => {
    const [cursorType, setCursorType] = useState('default');

    return (
        <CursorContext.Provider value={{ cursorType, setCursorType }}>
            {children}
        </CursorContext.Provider>
    );
};

export default CursorProvider;
