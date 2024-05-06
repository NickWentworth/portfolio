import DotsBackground from './components/DotsBackground';
import Header, { ANCHORS } from './components/Header';
import ProjectCard from './components/ProjectCard';
import {
    Box,
    Card,
    CardBody,
    Center,
    Divider,
    Heading,
    Image,
    Link,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    Wrap,
} from '@chakra-ui/react';

// helper component to apply accent color inline with text
function Accented(props: React.PropsWithChildren) {
    return (
        <Text as='span' color='palette.accent'>
            {props.children}
        </Text>
    );
}

// helper component for headers of each section
function SectionHeader(props: { text: string }) {
    return (
        <Heading fontSize='2xl' alignSelf='center' color='gray.400'>
            /*&nbsp;&nbsp;{props.text}&nbsp;&nbsp;*/
        </Heading>
    );
}

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

                    <Text fontSize='xl'>
                        I am a <Accented>software developer</Accented>
                    </Text>
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
                        <SectionHeader text='Technologies' />

                        <Text>
                            I bring a unique blend of high-level,
                            design-oriented{' '}
                            <Accented>frontend development</Accented> with the
                            ability to dive deep into performance and
                            optimization through my experience in low-level{' '}
                            <Accented>systems programming</Accented>.
                        </Text>

                        {/* TODO: add some pictures of the technologies here */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap='0.5rem'>
                            <Card>
                                <CardBody>
                                    <Stack gap='0.5rem'>
                                        <Text fontSize='xl'>
                                            Fullstack Development
                                        </Text>

                                        <Text>
                                            Years of personal and academic
                                            experience working with modern web
                                            development technologies:
                                        </Text>

                                        <Wrap direction='row'>
                                            {[
                                                'Next.js',
                                                'React',
                                                'JS/TS',
                                                'HTML',
                                                'CSS',
                                            ].map((lang) => (
                                                <Tag
                                                    key={lang}
                                                    borderRadius='full'
                                                >
                                                    {lang}
                                                </Tag>
                                            ))}
                                        </Wrap>
                                    </Stack>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <Stack gap='0.5rem'>
                                        <Text fontSize='xl'>
                                            Systems Programming
                                        </Text>

                                        <Text>
                                            Skilled in performance-demaning
                                            programming, with experience as deep
                                            as working on OS drivers and
                                            kernel-level code in:
                                        </Text>

                                        <Wrap direction='row'>
                                            {['Rust', 'C'].map((lang) => (
                                                <Tag
                                                    key={lang}
                                                    borderRadius='full'
                                                >
                                                    {lang}
                                                </Tag>
                                            ))}
                                        </Wrap>
                                    </Stack>
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
                        <SectionHeader text='Projects' />

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
                        <SectionHeader text='Experience' />

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
                                        color='palette.accent'
                                        textDecor='underline'
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
