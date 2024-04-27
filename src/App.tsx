import { GitHub, LinkedIn, Mail } from './icons';
import DotsBackground from './components/DotsBackground';
import ProjectCard from './components/ProjectCard';
import { Grid, IconButton, Link, Stack } from '@chakra-ui/react';
import styles from './app.module.css';

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
            >
                <Link href='/' fontSize='2xl' fontWeight='bold'>
                    Nick Wentworth
                </Link>

                <Stack
                    direction='row'
                    gap='1rem'
                    justify='center'
                    fontSize='lg'
                >
                    <Link href={`#${TECHNOLOGIES}`}>Technologies</Link>

                    <Link href={`#${PROJECTS}`}>Projects</Link>

                    <Link href={`#${EXPERIENCE}`}>Experience</Link>
                </Stack>

                <Stack direction='row' justify='end'>
                    <Link
                        href='https://github.com/nickwentworth'
                        target='_blank'
                    >
                        <IconButton
                            aria-label='External GitHub link'
                            isRound
                            icon={<GitHub />}
                        />
                    </Link>

                    <Link
                        href='https://www.linkedin.com/in/nickwentworth/'
                        target='_blank'
                    >
                        <IconButton
                            aria-label='External LinkedIn link'
                            isRound
                            icon={<LinkedIn />}
                        />
                    </Link>

                    <Link
                        href='mailto:nickwentworth123@gmail.com'
                        target='_blank'
                    >
                        <IconButton
                            aria-label='External mailto link'
                            isRound
                            icon={<Mail />}
                        />
                    </Link>
                </Stack>
            </Grid>

            <div className={styles.content}>
                <div className={styles.intro}>
                    <div className={styles.introText}>
                        <h1>Hey there, I'm Nick</h1>
                        <h3>I am a software developer</h3>
                    </div>

                    <img className={styles.introPicture} src='/me.jpg' />
                </div>

                <hr />

                <h2 id={TECHNOLOGIES}>Technologies</h2>
                <div className={styles.tech}>
                    <p>
                        I bring a unique blend of high-level, design-oriented
                        frontend development with the ability to dive deep into
                        performance and optimization through my experience in
                        low-level systems programming.
                    </p>

                    <div className={styles.techLanguages}>
                        <div className={styles.techLanguage}>
                            <h3>Fullstack Development</h3>
                            <p>
                                Years of personal and academic experience
                                working with modern web development
                                technologies, including React and Next.js.
                                Knowledgeable in essential languages: HTML, CSS,
                                and JS/TS.
                            </p>
                        </div>

                        <div className={styles.techLanguage}>
                            <h3>Systems Programming</h3>
                            <p>
                                Skilled in performance-demanding systems
                                programming, with experience as deep as working
                                on OS drivers and kernel-level code. Specialized
                                in Rust and C languages.
                            </p>
                        </div>
                    </div>
                </div>

                <hr />

                <h2 id={PROJECTS}>Projects</h2>
                <div className={styles.projects}>
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
                </div>

                <hr />

                <h2 id={EXPERIENCE}>Experience</h2>
                <div className={styles.experience}>
                    <p>
                        I am open to entry-level opportunities! I am excited and
                        ready to begin my professional career as a software
                        engineer.
                    </p>

                    <br />

                    <div className={styles.job}>
                        <div className={styles.jobHeader}>
                            <h4>Programming Tutor</h4>
                            <p>June 2021 - Present</p>
                        </div>

                        <p>
                            <i>Independent</i>
                        </p>

                        <p>
                            Skilled tutor specializing in programming and
                            mathematics, teaching students ranging from middle
                            school to professional-level.
                        </p>

                        <p>
                            Interested in being tutored by me? Check out my
                            tutor profile at{' '}
                            <a
                                href='https://www.wyzant.com/tutors/Nicholas2178'
                                target='_blank'
                            >
                                Wyzant
                            </a>{' '}
                            and send me a message!
                        </p>
                    </div>
                </div>

                <hr />

                <p className={styles.copyright}>© 2024 Nick Wentworth</p>
            </div>
        </DotsBackground>
    );
}
