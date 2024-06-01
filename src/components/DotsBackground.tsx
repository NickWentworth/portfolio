'use client';

import { dots } from '@/lib/dots';
import { useEffect, useRef } from 'react';

export default function DotsBackground() {
    const canvasRef = useRef<React.ElementRef<'canvas'>>(null);

    // use theme colors on dots canvas
    const [bg, dot, line] = ['#ff0000', '#00ff00', '#0000ff'];
    // const [bg, dot, line] = useToken('colors', [
    //     'theme.750', // background
    //     'theme.50', // dot
    //     'theme.300', // connecting line
    // ]);

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
