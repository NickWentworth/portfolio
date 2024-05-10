import { dots } from '../lib/dots';
import { useEffect, useRef } from 'react';
import { Box, useToken } from '@chakra-ui/react';

export default function DotsBackground() {
    const canvasRef = useRef<React.ElementRef<'canvas'>>(null);

    // use theme colors on dots canvas
    const [bg, dot, line] = useToken('colors', [
        'theme.750', // background
        'theme.50', // dot
        'theme.300', // connecting line
    ]);

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
        <Box h='100dvh' w='100dvw' pos='fixed' top='0' zIndex='-1'>
            <canvas ref={canvasRef} />
        </Box>
    );
}
