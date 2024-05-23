import { GitHub, LinkedIn, Mail } from '../../icons';
import { Heading, Link } from '@chakra-ui/react';

// anchor points for header links and main page sections
export const ANCHORS = {
    technologies: 'technologies',
    projects: 'projects',
    experience: 'experience',
};

/** Title component for header */
export const TITLE = (
    <Link href='/'>
        <Heading fontSize='3xl' color='accent.200'>
            NW
        </Heading>
    </Link>
);

/** List of link components to anchors on main page */
export const LINKS = [
    <Link key='0' href={`#${ANCHORS.technologies}`}>
        Technologies
    </Link>,

    <Link key='1' href={`#${ANCHORS.projects}`}>
        Projects
    </Link>,

    <Link key='2' href={`#${ANCHORS.experience}`}>
        Experience
    </Link>,
];

/** List of icon components linking to external sites */
export const ICONS = [
    <Link key='0' href='https://github.com/nickwentworth' isExternal>
        <GitHub fontSize='2xl' />
    </Link>,

    <Link key='1' href='https://www.linkedin.com/in/nickwentworth/' isExternal>
        <LinkedIn fontSize='2xl' />
    </Link>,

    <Link key='2' href='mailto:nickwentworth123@gmail.com' isExternal>
        <Mail fontSize='2xl' />
    </Link>,
];
