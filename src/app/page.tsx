import { Card, Icon, TagList } from '@/components/common';
import { ProjectCard } from '@/components/ProjectCard';
import Link from 'next/link';

export default async () => (
    <div className='flex flex-col items-center'>
        {/* intro section */}
        <div className='flex flex-col items-center gap-x-20 gap-y-2 py-40 md:flex-row-reverse'>
            <img className='size-60 rounded-full' src='/me.jpg' />

            <div className='flex flex-col items-center gap-4 md:items-stretch'>
                <h1 className='font-bold'>Hey there, I'm Nick</h1>
                <h4>
                    I am a <Accent>software developer</Accent>
                </h4>
            </div>
        </div>

        {/* main content */}
        <div className='bg-base-700 self-stretch'>
            <div className='max-w-[1200px] m-auto px-4 md:px-8'>
                {/* technologies */}
                <div className='flex flex-col gap-4 py-8 md:px-8'>
                    <Heading title='Technologies' />

                    <p>
                        I bring a unique blend of high-level, design-oriented{' '}
                        <Accent>frontend development</Accent> with the ability
                        to dive deep into performance and optimization through
                        my experience in low-level{' '}
                        <Accent>systems programming</Accent>.
                    </p>

                    <p>
                        I am a passionate problem solver with proficiency
                        throughout every stage of the development cycle, from
                        design to deployment.
                    </p>

                    <div className='grid gap-2 md:grid-cols-2'>
                        <Card>
                            <div className='flex flex-col gap-2'>
                                <h4>Fullstack Development</h4>

                                <p>
                                    Multiple years of both personal and academic
                                    experience building applications using
                                    modern web development technologies:
                                </p>

                                <TagList
                                    tags={[
                                        'Next.js',
                                        'React',
                                        'JS/TS',
                                        'HTML',
                                        'CSS',
                                    ]}
                                />
                            </div>
                        </Card>

                        <Card>
                            <div className='flex flex-col gap-2'>
                                <h4>Systems Programming</h4>

                                <p>
                                    Skilled in handling performance-demanding
                                    systems, with experience working as low as
                                    device drivers and kernel components in:
                                </p>

                                <TagList tags={['Rust', 'C']} />
                            </div>
                        </Card>
                    </div>
                </div>

                <hr />

                {/* projects */}
                <div className='flex flex-col gap-4 py-8 md:px-8'>
                    <Heading title='Projects' />

                    <div className='grid gap-2 md:grid-cols-2'>
                        <ProjectCard
                            name='Rememo'
                            image='rememo.png'
                            description='Modern planner application that helps students track their terms, courses, and tasks'
                            tags={[
                                'Next.js',
                                'React',
                                'TypeScript',
                                'tRPC',
                                'Prisma',
                                'NextAuth',
                            ]}
                            link='https://rememo.nickwentworth.me'
                            source='https://github.com/NickWentworth/rememo'
                        />

                        <ProjectCard
                            name='Otter'
                            image='otter.png'
                            description='Advanced chess engine written fully from scratch'
                            tags={['Rust']}
                            source='https://github.com/NickWentworth/otter'
                        />

                        <ProjectCard
                            name='Team Visualization App'
                            image='teamvis.png'
                            description='Online application built to assist Penn State faculty through the management of their Senior Capstone projects'
                            tags={['Next.js', 'React', 'TypeScript', 'Prisma']}
                        />
                    </div>
                </div>

                <hr />

                {/* experience */}
                <div className='flex flex-col gap-4 py-8 md:px-8'>
                    <Heading title='Experience' />

                    <p>
                        I am open to entry-level opportunities! I am excited and
                        ready to begin my professional career as a software
                        engineer.
                    </p>

                    <Card>
                        <div className='flex flex-col gap-1'>
                            <div className='flex align-baseline justify-between'>
                                <h4>Programming Tutor</h4>
                                <p className='text-right'>
                                    June 2021 - Present
                                </p>
                            </div>

                            <i>Independent</i>

                            <hr />

                            <p>
                                Working as a skilled private tutor specializing
                                in programming and mathematics, with experience
                                teaching students ranging from middle school to
                                professional-level.
                            </p>

                            <i>
                                Interested in being tutored by me? Visit my
                                tutoring profile at{' '}
                                <Link
                                    className='text-accent-200 underline'
                                    href='https://www.wyzant.com/tutors/Nicholas2178'
                                    target='_blank'
                                >
                                    Wyzant
                                </Link>{' '}
                                and send me a message!
                            </i>
                        </div>
                    </Card>

                    <Link
                        className='self-center'
                        href='/nick-wentworth-resume.pdf'
                        target='_blank'
                    >
                        <button>
                            <div className='flex gap-2 items-center'>
                                <p>View Full Resume</p>

                                <Icon icon='link' size='20' />
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>

        <p className='py-8'>© 2024 Nick Wentworth - All Rights Reserved</p>
    </div>
);

function Accent(props: React.PropsWithChildren) {
    return <span className='text-accent-200'>{props.children}</span>;
}

function Heading(props: { title: string }) {
    return (
        <h3 className='font-mono font-bold text-base-300 text-center mb-2'>
            /*&nbsp;&nbsp;{props.title}&nbsp;&nbsp;*/
        </h3>
    );
}
