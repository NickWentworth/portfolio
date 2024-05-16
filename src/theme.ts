import {
    type ColorModeProviderProps,
    createMultiStyleConfigHelpers,
    defineStyleConfig,
    extendTheme,
    localStorageManager,
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
        accent: {
            // https://smart-swatch.netlify.app/#9edd9d
            50: '#e7fae7',
            100: '#c5ecc4',
            200: '#a1dea0',
            300: '#7dd17b',
            400: '#59c457',
            500: '#40aa3d',
            600: '#31852f',
            700: '#225f21',
            800: '#123912',
            900: '#011501',
        },
        theme: {
            // https://smart-swatch.netlify.app/#2e3d4f
            50: '#eaf3fe',
            100: '#cdd8e6',
            200: '#aebed0',
            300: '#8fa4bc',
            400: '#7089a9',
            500: '#56708f',
            600: '#435770',
            700: '#2f3e51',
            750: '#253242', // added this for transition from 700 (content) to 800 (header)
            800: '#1a2532',
            900: '#030d17',
        },
    },
    components: {
        Card: cardHelper.defineMultiStyleConfig({
            baseStyle: {
                container: { bg: 'theme.750' },
            },
        }),
        Link: defineStyleConfig({
            baseStyle: {
                _hover: { color: 'accent.200' },
            },
        }),
    },
});

type StorageManager = ColorModeProviderProps['colorModeManager'];

/**
 * Custom color mode manager that overrides get() function to always return dark mode
 */
export const cmm: StorageManager = {
    ...localStorageManager,
    get: () => 'dark',
};
