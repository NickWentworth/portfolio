import { ICONS, LINKS, TITLE } from './common';
import { Flex, Stack } from '@chakra-ui/react';

export default function DesktopHeader() {
    return (
        <Flex
            as='nav'
            bg='palette.header'
            p='1rem'
            align='center'
            justify='space-between'
            pos='sticky'
            top='0'
            shadow='md'
            zIndex='1' // to appear above cards
        >
            {TITLE}

            <Stack direction='row' gap='2rem' justify='center' fontSize='lg'>
                {LINKS}
            </Stack>

            <Stack direction='row' gap='1rem' justify='end'>
                {ICONS}
            </Stack>
        </Flex>
    );
}
