import { GitHub, Hamburger, LinkedIn, Mail } from '../icons';
import { ANCHORS } from '../App';
import {
    Box,
    Divider,
    Flex,
    Grid,
    IconButton,
    Link,
    Stack,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';

// FIXME: headers are slightly different sizes
export default function Header() {
    // swap header version based off of responsive size
    return useBreakpointValue({
        base: <MobileHeader />,
        md: <DesktopHeader />,
    });
}

function MobileHeader() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack
            as='nav'
            gap='0'
            pos='sticky'
            top='0'
            zIndex='1' // to appear above cards
        >
            {/* header */}
            <Flex
                bg='palette.header'
                p='1rem'
                align='center'
                justify='space-between'
                shadow='md'
                zIndex='2' // to appear above dropdown menu
            >
                <Link href='/' fontSize='xl' fontWeight='bold'>
                    Nick Wentworth
                </Link>

                <IconButton
                    variant='ghost'
                    icon={<Hamburger fontSize='2xl' />}
                    onClick={onToggle}
                    aria-label='hamburger'
                />
            </Flex>

            {/* dropdown menu */}
            {isOpen && (
                <Box pos='relative'>
                    <Stack
                        bg='palette.header'
                        p='1rem'
                        gap='1rem'
                        shadow='md'
                        pos='absolute'
                        top='0'
                        width='100%'
                    >
                        <Link href={`#${ANCHORS.technologies}`}>
                            Technologies
                        </Link>
                        <Link href={`#${ANCHORS.projects}`}>Projects</Link>
                        <Link href={`#${ANCHORS.experience}`}>Experience</Link>

                        <Divider />

                        <Stack direction='row' gap='1rem'>
                            <Link
                                href='https://github.com/nickwentworth'
                                isExternal
                            >
                                <GitHub fontSize='2xl' />
                            </Link>

                            <Link
                                href='https://www.linkedin.com/in/nickwentworth/'
                                isExternal
                            >
                                <LinkedIn fontSize='2xl' />
                            </Link>

                            <Link
                                href='mailto:nickwentworth123@gmail.com'
                                isExternal
                            >
                                <Mail fontSize='2xl' />
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}

function DesktopHeader() {
    return (
        <Grid
            as='nav'
            bg='palette.header'
            p='1rem'
            autoColumns='1fr'
            autoFlow='column'
            alignItems='center'
            pos='sticky'
            top='0'
            shadow='md'
            zIndex='1' // to appear above cards
        >
            <Link href='/' fontSize='xl' fontWeight='bold'>
                Nick Wentworth
            </Link>

            <Stack direction='row' gap='2rem' justify='center' fontSize='lg'>
                <Link href={`#${ANCHORS.technologies}`}>Technologies</Link>
                <Link href={`#${ANCHORS.projects}`}>Projects</Link>
                <Link href={`#${ANCHORS.experience}`}>Experience</Link>
            </Stack>

            <Stack direction='row' gap='1rem' justify='end'>
                <Link href='https://github.com/nickwentworth' isExternal>
                    <GitHub fontSize='2xl' />
                </Link>

                <Link
                    href='https://www.linkedin.com/in/nickwentworth/'
                    isExternal
                >
                    <LinkedIn fontSize='2xl' />
                </Link>

                <Link href='mailto:nickwentworth123@gmail.com' isExternal>
                    <Mail fontSize='2xl' />
                </Link>
            </Stack>
        </Grid>
    );
}
