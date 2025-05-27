import { useEffect, useRef } from 'react';

const GooeyBackground = () => {
    const interactiveRef = useRef(null);

    useEffect(() => {
        const el = interactiveRef.current;
        let curX = 0, curY = 0, tgX = 0, tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (el) {
                el.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        }

        const handleMouseMove = (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
                background: 'linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82))',
            }}
        >
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: 'linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82))',
                }}
            >
                <div className="w-full h-full" style={{ filter: 'url(#goo) blur(40px)' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={`g${i}`}
                            className={`absolute rounded-full mix-blend-hard-light animate-${getAnimation(i)}`}
                            style={{
                                background: getGradient(i),
                                width: getSize(i),
                                height: getSize(i),
                                top: getTop(i),
                                left: getLeft(i),
                                opacity: getOpacity(i),
                                transformOrigin: getTransformOrigin(i),
                            }}
                        />
                    ))}

                    <div
                        ref={interactiveRef}
                        className="absolute w-full h-full -top-1/2 -left-1/2 rounded-full mix-blend-hard-light opacity-70"
                        style={{
                            background:
                                'radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0, rgba(140, 100, 255, 0) 50%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

// Same helper functions as before:
function getAnimation(i) {
    switch (i) {
        case 1: return 'vertical-slow';
        case 2: return 'circle-reverse';
        case 3: return 'circle-slow';
        case 4: return 'horizontal-slow';
        case 5: return 'circle-fast';
        default: return '';
    }
}

function getGradient(i) {
    const colors = [
        '18, 113, 255',
        '221, 74, 255',
        '100, 220, 255',
        '200, 50, 50',
        '180, 180, 50',
    ];
    return `radial-gradient(circle at center, rgba(${colors[i - 1]}, 0.8) 0, rgba(${colors[i - 1]}, 0) 50%)`;
}

function getSize(i) {
    return i === 5 ? '160%' : '80%';
}

function getTop(i) {
    if (i === 3) return 'calc(50% - 40% + 200px)';
    if (i === 5) return 'calc(50% - 80%)';
    return 'calc(50% - 40%)';
}

function getLeft(i) {
    if (i === 3) return 'calc(50% - 40% - 500px)';
    if (i === 5) return 'calc(50% - 80%)';
    return 'calc(50% - 40%)';
}

function getTransformOrigin(i) {
    switch (i) {
        case 2: return 'calc(50% - 400px)';
        case 3: return 'calc(50% + 400px)';
        case 4: return 'calc(50% - 200px)';
        case 5: return 'calc(50% - 800px) calc(50% + 200px)';
        default: return 'center center';
    }
}

function getOpacity(i) {
    return i === 4 ? 0.7 : 1;
}

export default GooeyBackground;
