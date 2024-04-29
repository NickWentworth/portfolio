import { GitHub, LinkedIn, Mail } from './icons';
import DotsBackground from './components/DotsBackground';
import ProjectCard from './components/ProjectCard';
import {
    Card,
    CardBody,
    Center,
    Divider,
    Grid,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

// anchor points for header links and main page sections
const TECHNOLOGIES = 'technologies';
const PROJECTS = 'projects';
const EXPERIENCE = 'experience';

export default function App() {
    return (
        <DotsBackground>
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

                <Stack
                    direction='row'
                    gap='1rem'
                    justify='center'
                    fontSize='xl'
                >
                    <Link href={`#${TECHNOLOGIES}`}>Technologies</Link>
                    <Link href={`#${PROJECTS}`}>Projects</Link>
                    <Link href={`#${EXPERIENCE}`}>Experience</Link>
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

            <Stack
                bg='gray.50'
                maxW='1200px'
                m='auto'
                p={{ base: '1rem', md: '2rem' }}
                gap='2rem'
                divider={<Divider />}
            >
                {/* intro */}
                <Stack
                    align='center'
                    justify='center'
                    direction={{ base: 'column-reverse', md: 'row' }}
                    columnGap='5rem'
                    p='5rem 0'
                >
                    <Stack align={{ base: 'center', md: 'normal' }}>
                        <Text as='b' fontSize='4xl'>
                            Hey there, I'm Nick
                        </Text>

                        <Text fontSize='xl'>I am a software developer</Text>
                    </Stack>

                    <Image
                        src='me.jpg'
                        alt='Nick Wentworth'
                        boxSize='15rem'
                        borderRadius='full'
                        shadow='md'
                    />
                </Stack>

                {/* technologies */}
                <Stack align='center' p='0 2rem'>
                    <Text fontSize='2xl'>Technologies</Text>

                    <Text>
                        I bring a unique blend of high-level, design-oriented
                        frontend development with the ability to dive deep into
                        performance and optimization through my experience in
                        low-level systems programming.
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap='0.5rem'>
                        <Card>
                            <CardBody>
                                <Text fontSize='xl'>Fullstack Development</Text>
                                Years of personal and academic experience
                                working with modern web development
                                technologies, including React and Next.js.
                                Knowledgeable in essential languages: HTML, CSS,
                                and JS/TS.
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <Text fontSize='xl'>Systems Programming</Text>
                                Skilled in performance-demanding systems
                                programming, with experience as deep as working
                                on OS drivers and kernel-level code. Specialized
                                in Rust and C languages.
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </Stack>

                {/* projects */}
                <Stack align='center' p='0 2rem'>
                    <Text fontSize='2xl'>Projects</Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap='0.5rem'>
                        <ProjectCard
                            project={{
                                name: 'Rememo',
                                image: 'rememo.png',
                                description:
                                    'Modern planner application that helps students track their terms, courses, and tasks',
                                technologies: [
                                    'Next.js',
                                    'React',
                                    'TypeScript',
                                    'tRPC',
                                    'Prisma',
                                    'NextAuth',
                                ],
                                link: 'https://rememo.nickwentworth.me',
                                source: 'https://github.com/NickWentworth/rememo',
                            }}
                        />

                        <ProjectCard
                            project={{
                                name: 'Otter',
                                image: 'otter.png',
                                description:
                                    'Advanced chess engine written fully from scratch',
                                technologies: ['Rust'],
                                source: 'https://github.com/NickWentworth/otter',
                            }}
                        />

                        <ProjectCard
                            project={{
                                name: 'Team Visualization App',
                                image: 'teamvis.png',
                                description:
                                    'Online application built to assist Penn State faculty through the management of their Senior Capstone projects',
                                technologies: [
                                    'Next.js',
                                    'React',
                                    'TypeScript',
                                    'Prisma',
                                ],
                            }}
                        />
                    </SimpleGrid>
                </Stack>

                {/* experience */}
                <Stack p='0 2rem'>
                    <Text fontSize='2xl' align='center'>
                        Experience
                    </Text>

                    <Text>
                        I am open to entry-level opportunities! I am excited and
                        ready to begin my professional career as a software
                        engineer.
                    </Text>

                    <Card>
                        <CardBody>
                            <Stack
                                direction='row'
                                justify='space-between'
                                align='center'
                            >
                                <Text fontSize='xl'>Programming Tutor</Text>
                                <Text>June 2021 - Present</Text>
                            </Stack>

                            <Text as='i'>Independent</Text>

                            <Text>
                                Working as a skilled tutor specializing in
                                programming and mathematics, with experience
                                teaching students ranging from middle school to
                                professional-level.
                            </Text>

                            <Text as='i'>
                                Interested in being tutored by me? Visit my
                                tutoring profile at{' '}
                                <Link
                                    href='https://www.wyzant.com/tutors/Nicholas2178'
                                    color='orange'
                                    isExternal
                                >
                                    Wyzant
                                </Link>{' '}
                                and send me a message!
                            </Text>
                        </CardBody>
                    </Card>
                </Stack>

                {/* copyright */}
                <Center>© 2024 Nick Wentworth - All Rights Reserved</Center>
            </Stack>
        </DotsBackground>
    );
}
