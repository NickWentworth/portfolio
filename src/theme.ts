import {
    createMultiStyleConfigHelpers,
    defineStyleConfig,
    extendTheme,
} from '@chakra-ui/react';

const cardHelper = createMultiStyleConfigHelpers(['container']);

export const theme = extendTheme({
    fonts: {
        body: "'Inter', sans-serif",
        heading: "'JetBrains Mono', monospace",
    },
    config: {
        initialColorMode: 'dark',
    },
    colors: {
        palette: {
            header: '#1E2734',
            content: '#2E3D4F',
            accent: '#9EDD9D',
            dots: {
                bg: '#253242',
                dot: '#ffffff',
                line: '#ffffff',
            },
        },
    },
    components: {
        Card: cardHelper.defineMultiStyleConfig({
            baseStyle: {
                container: { bg: 'palette.header' },
            },
        }),
        Link: defineStyleConfig({
            baseStyle: {
                _hover: { color: 'palette.accent' },
            },
        }),
    },
});
