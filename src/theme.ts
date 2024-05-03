import { createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react';

// custom chakra card styling
const cardHelper = createMultiStyleConfigHelpers(['container']);
const baseCardStyle = cardHelper.definePartsStyle({
    container: {
        bg: 'palette.header',
    },
});

export const theme = extendTheme({
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
    config: {
        initialColorMode: 'dark',
    },
    colors: {
        palette: {
            header: '#1E2734',
            content: '#2E3D4F',
            dots: {
                bg: '#253242',
                dot: '#ffffff',
                line: '#ffffff',
            },
        },
    },
    components: {
        Card: cardHelper.defineMultiStyleConfig({ baseStyle: baseCardStyle }),
    },
});
