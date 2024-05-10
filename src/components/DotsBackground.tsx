import { dots } from '../lib/dots';
import { useEffect, useRef } from 'react';
import { Box, Stack, useToken } from '@chakra-ui/react';

export default function DotsBackground(props: React.PropsWithChildren) {
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
        <Stack pos='relative' w='100dvw' h='100dvh' overflow='hidden'>
            <Box w='100%' h='100%' overflow='auto'>
                {props.children}
            </Box>

            <canvas
                style={{ position: 'absolute', zIndex: '-1' }}
                ref={canvasRef}
            />
        </Stack>
    );
}
