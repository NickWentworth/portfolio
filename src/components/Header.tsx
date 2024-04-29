import { GitHub, LinkedIn, Mail } from '../icons';
import { ANCHORS } from '../App';
import { Grid, Link, Stack } from '@chakra-ui/react';

export default function Header() {
    return (
        <Grid
            as='nav'
            bg='white'
            p='1rem'
            autoColumns='1fr'
            autoFlow='column'
            alignItems='center'
            pos='sticky'
            top='0'
            shadow='md'
            zIndex='1' // to appear above cards
        >
            <Link href='/' fontSize='2xl' fontWeight='bold'>
                Nick Wentworth
            </Link>

            <Stack direction='row' gap='1rem' justify='center' fontSize='xl'>
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
