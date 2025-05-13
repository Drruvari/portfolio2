import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import useCursor from '../hooks/useCursor';
import "./CustomCursor.css";
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { cursorType, cursorLabel } = useCursor();
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
            tl.to(follower, { scale: 2, backgroundColor: '#fff' }, 0)
                .to(label, { opacity: 1, y: 0 }, 0);
        } else {
            tl.to(follower, { scale: 1, backgroundColor: '#fff' }, 0)
                .to(label, { opacity: 0, y: 10 }, 0);
        }
        return () => tl.kill();
    }, [cursorType]);
    const isHovering = cursorType !== 'default';
    return (
        <>
            <div
                ref={followerRef}
                className="cursor-follower"
                style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'black',
                    textAlign: 'center',
                    padding: '5px',
                }}
            >
                <span className="cursor-label" style={{
                    opacity: 0,
                    transform: 'translateY(10px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                    pointerEvents: 'none',
                }}>
                    {cursorLabel}
                </span>
            </div>
            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    width: isHovering ? '5px' : '10px',
                    height: isHovering ? '5px' : '10px',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    position: 'fixed',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s'
                }}
            />
        </>
    );
};
export default CustomCursor;
