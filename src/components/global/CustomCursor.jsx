import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import useCursor from '../hooks/useCursor';
import "./CustomCursor.css";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { cursorType, cursorLabel, cursorContext } = useCursor();

    const hideCursor = cursorType === 'none' || cursorContext === 'none';

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

    useEffect(() => {
        const follower = followerRef.current;
        const label = follower?.querySelector('.cursor-label');
        if (!follower) return;
        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'power3.out' } });

        if (cursorType === 'hovered') {
            const scale = cursorContext === "logo" ? 3 : 1.4;
            const bgColor = '#FDFDFD';

            tl.to(follower, { scale, backgroundColor: bgColor }, 0)
                .to(label, { opacity: 1, y: 0 }, 0);
        } else {
            tl.to(follower, { scale: 1, backgroundColor: '#FDFDFD' }, 0)
                .to(label, { opacity: 0, y: 10 }, 0);
        }

        return () => tl.kill();
    }, [cursorType, cursorContext]);

    const isHovering = cursorType !== 'default';

    return (
        <>
            <div
                ref={followerRef}
                className="cursor-follower"
                style={{
                    width: isHovering ? '120px' : '60px',
                    height: isHovering ? '120px' : '60px',
                    backgroundColor: '#FDFDFD',
                    mixBlendMode: 'difference',
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    display: hideCursor ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#191818',
                    textAlign: 'center',
                    padding: '6px',
                    boxSizing: 'border-box',
                    borderRadius: '50%',
                    transition: 'width 0.3s, height 0.3s, background-color 0.3s',
                }}
            >
                <span
                    className="cursor-label"
                    style={{
                        maxWidth: '100px',
                        padding: '0 6px',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'center',
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                        pointerEvents: 'none',
                    }}
                >
                    {cursorLabel}
                </span>
            </div>
            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    display: hideCursor ? 'none' : 'block',
                    width: isHovering ? '0px' : '10px',
                    height: isHovering ? '0px' : '10px',
                    backgroundColor: '#FDFDFD',
                    mixBlendMode: 'difference',
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s',
                    borderRadius: '50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
