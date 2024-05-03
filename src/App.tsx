import DotsBackground from './components/DotsBackground';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import {
    Box,
    Card,
    CardBody,
    Center,
    Divider,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

// anchor points for header links and main page sections
export const ANCHORS = {
    technologies: 'technologies',
    projects: 'projects',
    experience: 'experience',
};

export default function App() {
    return (
        <DotsBackground>
            <Header />

            {/* intro */}
            <Stack
                align='center'
                justify='center'
                direction={{ base: 'column-reverse', md: 'row' }}
                columnGap='5rem'
                py='10rem'
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

            {/* main content section */}
            <Box bg='palette.content' shadow='base'>
                <Stack
                    maxW='1200px'
                    m='auto'
                    p={{ base: '1rem', md: '2rem' }}
                    gap='2rem'
                    divider={<Divider />}
                >
                    {/* technologies */}
                    <Stack
                        id={ANCHORS.technologies}
                        align='center'
                        px='2rem'
                        gap='1rem'
                    >
                        <Text fontSize='2xl'>Technologies</Text>

                        <Text>
                            I bring a unique blend of high-level,
                            design-oriented frontend development with the
                            ability to dive deep into performance and
                            optimization through my experience in low-level
                            systems programming.
                        </Text>

                        {/* TODO: add some pictures of the technologies here */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap='0.5rem'>
                            <Card>
                                <CardBody>
                                    <Text fontSize='xl'>
                                        Fullstack Development
                                    </Text>
                                    Years of personal and academic experience
                                    working with modern web development
                                    technologies, including React and Next.js.
                                    Knowledgeable in essential languages: HTML,
                                    CSS, and JS/TS.
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <Text fontSize='xl'>
                                        Systems Programming
                                    </Text>
                                    Skilled in performance-demanding systems
                                    programming, with experience as deep as
                                    working on OS drivers and kernel-level code.
                                    Specialized in Rust and C languages.
                                </CardBody>
                            </Card>
                        </SimpleGrid>
                    </Stack>

                    {/* projects */}
                    <Stack
                        id={ANCHORS.projects}
                        align='center'
                        px='2rem'
                        gap='1rem'
                    >
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
                    <Stack id={ANCHORS.experience} px='2rem' gap='1rem'>
                        <Text fontSize='2xl' align='center'>
                            Experience
                        </Text>

                        <Text>
                            I am open to entry-level opportunities! I am excited
                            and ready to begin my professional career as a
                            software engineer.
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
                                    teaching students ranging from middle school
                                    to professional-level.
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
                </Stack>
            </Box>

            {/* copyright */}
            <Center py='2rem'>
                © 2024 Nick Wentworth - All Rights Reserved
            </Center>
        </DotsBackground>
    );
}
