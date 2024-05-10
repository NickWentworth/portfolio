import { ICONS, LINKS, TITLE } from './common';
import { Hamburger } from '../../icons';
import {
    Box,
    Divider,
    Flex,
    IconButton,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';

export default function MobileHeader() {
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
                bg='theme.800'
                p='1rem'
                align='center'
                justify='space-between'
                shadow='md'
                zIndex='2' // to appear above dropdown menu
            >
                {TITLE}

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
                        bg='theme.800'
                        p='1rem'
                        gap='1rem'
                        shadow='md'
                        pos='absolute'
                        top='0'
                        width='100%'
                    >
                        {LINKS.map((link) => (
                            <Box
                                key={link.key}
                                onClick={onToggle} // toggle menu when link is pressed
                                width='min-content' // only set box as wide as link
                            >
                                {link}
                            </Box>
                        ))}

                        <Divider />

                        <Stack direction='row' gap='1rem'>
                            {ICONS}
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}
