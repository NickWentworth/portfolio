import { ICONS, LINKS, TITLE } from './common';
import { Flex, Stack } from '@chakra-ui/react';

export default function DesktopHeader() {
    return (
        <Flex
            as='nav'
            bg='theme.800'
            p='1rem'
            align='center'
            justify='space-between'
            pos='sticky'
            top='0'
            shadow='md'
            zIndex='1' // to appear above cards
        >
            {TITLE}

            <Stack direction='row' gap='1.5rem' justify='center'>
                {LINKS}
            </Stack>

            <Stack direction='row' gap='1rem' justify='end'>
                {ICONS}
            </Stack>
        </Flex>
    );
}
