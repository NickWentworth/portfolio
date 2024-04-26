import DotsBackground from './components/DotsBackground';
import styles from './app.module.css';
import { GitHub, LinkedIn, Mail } from './icons';

// anchor points for header links and main page sections
const TECHNOLOGIES = 'technologies';
const PROJECTS = 'projects';
const EXPERIENCE = 'experience';

export default function App() {
    return (
        <DotsBackground>
            <nav className={styles.header}>
                <a href='/'>
                    <h2>Nick Wentworth</h2>
                </a>

                {/* FIXME: properly scroll anchors into view */}
                <div className={styles.headerLinks}>
                    <a href={`#${TECHNOLOGIES}`}>
                        <p>Technologies</p>
                    </a>

                    <p>|</p>

                    <a href={`#${PROJECTS}`}>
                        <p>Projects</p>
                    </a>

                    <p>|</p>

                    <a href={`#${EXPERIENCE}`}>
                        <p>Experience</p>
                    </a>
                </div>

                <div className={styles.headerIcons}>
                    <a href='https://github.com/nickwentworth' target='_blank'>
                        <GitHub />
                    </a>

                    <a
                        href='https://www.linkedin.com/in/nickwentworth/'
                        target='_blank'
                    >
                        <LinkedIn />
                    </a>

                    <a href='mailto:nickwentworth123@gmail.com' target='_blank'>
                        <Mail />
                    </a>
                </div>
            </nav>

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
                    <div className={styles.project}>
                        <div className={styles.projectImage}>
                            <img src='rememo.png' />
                        </div>

                        <div className={styles.projectDescription}>
                            <h4>Rememo</h4>

                            <p>
                                Modern planner application that helps students
                                track their terms, courses, and tasks
                            </p>

                            <div className={styles.projectTechnologies}>
                                <p>Next.js</p>
                                <p>React</p>
                                <p>tRPC</p>
                                <p>Prisma</p>
                                <p>NextAuth</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.project}>
                        <div className={styles.projectImage}>
                            <img src='rememo.png' />
                        </div>

                        <div className={styles.projectDescription}>
                            <h4>Otter</h4>

                            <p>
                                Advanced chess engine written fully from scratch
                            </p>

                            <div className={styles.projectTechnologies}>
                                <p>Rust</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.project}>
                        <div className={styles.projectImage}>
                            <img src='rememo.png' />
                        </div>

                        <div className={styles.projectDescription}>
                            <h4>Team Visualization App</h4>

                            <p>
                                Online application built to assist Penn State
                                faculty through the management of their Senior
                                Capstone projects
                            </p>

                            <div className={styles.projectTechnologies}>
                                <p>Next.js</p>
                                <p>React</p>
                                <p>Prisma</p>
                            </div>
                        </div>
                    </div>
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
