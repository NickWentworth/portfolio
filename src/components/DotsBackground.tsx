'use client';

import { dots } from '@/lib/dots';
import { useEffect, useRef } from 'react';

export function DotsBackground() {
    const canvasRef = useRef<React.ElementRef<'canvas'>>(null);

    // TODO: reference tailwind theme base (750, 50, 300) respectively
    // use theme colors on dots canvas
    const [bg, dot, line] = ['#253242', '#eaf3fe', '#8fa4bc'];

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('Unable to use canvas');
            return;
        }

        const dotsInterval = dots(canvasRef.current, {
            bg,
            dot,
            line,
        });

        return () => clearInterval(dotsInterval);
    }, []);

    return (
        <div className='w-full h-full fixed top-0 -z-10'>
            <canvas ref={canvasRef} />
        </div>
    );
}
