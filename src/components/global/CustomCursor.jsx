import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import useCursor from '../hooks/useCursor';
import "./CustomCursor.css";

// Compute threshold dynamically based on viewport width
const getIndicatorThreshold = () => {
    const w = window.innerWidth;
    if (w >= 1200) return 1000;
    if (w >= 768) return 600;
    return 400;
};

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [indicatorAngle, setIndicatorAngle] = useState(0);
    const [showIndicator, setShowIndicator] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const { cursorType, cursorLabel } = useCursor();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            setCursorPos({ x, y });

            gsap.to(cursor, { x, y, duration: 0.1, ease: 'power2.out' });
            gsap.to(follower, { x, y, duration: 0.3, ease: 'power2.out' });

            // find nearest target
            const targets = document.querySelectorAll('[data-cursor-target]');
            let nearest = null;
            let minDist = Infinity;
            targets.forEach(el => {
                const { left, top, width, height } = el.getBoundingClientRect();
                const cx = left + width / 2;
                const cy = top + height / 2;
                const dx = cx - x;
                const dy = cy - y;
                const dist = Math.hypot(dx, dy);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = { dx, dy, dist };
                }
            });

            const threshold = getIndicatorThreshold();
            if (nearest && nearest.dist < threshold) {
                const angle = (Math.atan2(nearest.dy, nearest.dx) * 180) / Math.PI + 90;
                setIndicatorAngle(angle);
                setShowIndicator(true);
            } else {
                setShowIndicator(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    useEffect(() => {
        const follower = followerRef.current;
        if (!follower) return;
        const label = follower.querySelector('.cursor-label');
        if (!label) return;

        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'power3.out' } });
        if (cursorType === 'hovered') {
            tl.to(follower, { scale: 2 }, 0)
                .to(label, { opacity: 1, y: 0 }, 0);
        } else {
            tl.to(follower, { scale: 1 }, 0)
                .to(label, { opacity: 0, y: 10 }, 0);
        }
        return () => tl.kill();
    }, [cursorType]);

    const showCursor = cursorType === 'hovered' || !showIndicator;

    return (
        <>
            {/* Arrow indicator at cursor position */}
            {showIndicator && cursorType === 'default' && (
                <svg
                    width="60" height="60"
                    viewBox="0 0 24 24"
                    style={{
                        position: 'fixed',
                        top: `${cursorPos.y}px`,
                        left: `${cursorPos.x}px`,
                        transform: `translate(-50%, -50%) rotate(${indicatorAngle}deg)`,
                        mixBlendMode: 'difference',
                        pointerEvents: 'none',
                        zIndex: 10000
                    }}
                >
                    <path d="M12 2 L16 9 H13 V22 H11 V9 H8 L12 2 Z" fill="white" />
                </svg>
            )}

            {/* Always render cursor elements; toggle visibility */}
            <div
                ref={followerRef}
                className="cursor-follower"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'black',
                    textAlign: 'center',
                    padding: '5px',
                    transition: 'width 0.3s, height 0.3s',
                    visibility: showCursor ? 'visible' : 'hidden'
                }}
            >
                <span
                    className="cursor-label"
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                        pointerEvents: 'none'
                    }}
                >
                    {cursorLabel}
                </span>
            </div>

            <div
                ref={cursorRef}
                className="cursor"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: cursorType === 'hovered' ? '5px' : '10px',
                    height: cursorType === 'hovered' ? '5px' : '10px',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s, height 0.3s',
                    visibility: showCursor ? 'visible' : 'hidden'
                }}
            />
        </>
    );
};

export default CustomCursor;
