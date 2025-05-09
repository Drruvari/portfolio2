import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import useCursor from '../hooks/useCursor';
import "./CustomCursor.css";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { cursorType } = useCursor();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const isHovering = cursorType !== 'default';

    return (
        <>
            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    width: isHovering ? '30px' : '10px',
                    height: isHovering ? '30px' : '10px',
                    backgroundColor: isHovering ? 'transparent' : 'var(--color-myBlack)',
                    border: isHovering ? '2px solid var(--color-myBlack)' : 'none',
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s, background-color 0.3s, border 0.3s'
                }}
            />
            <div
                ref={followerRef}
                className="cursor-follower"
                style={{
                    width: isHovering ? '40px' : '20px',
                    height: isHovering ? '40px' : '20px',
                    backgroundColor: 'rgba(93, 234, 178, 0.3)',
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s'
                }}
            />
        </>
    );
};

export default CustomCursor;
