import { Icon } from '@/components/common';
import Link from 'next/link';

export function Header() {
    return (
        <div className='bg-base-800 flex items-center justify-between p-4 sticky top-0'>
            <Link className='font-mono font-bold text-accent-200' href='/'>
                <h2>NW</h2>
            </Link>

            {/* TODO: not functional yet, unsure if these will stay */}
            <div className='flex gap-6'>
                <Link href='#tech'>
                    <p>Technologies</p>
                </Link>

                <Link href='#projects'>
                    <p>Projects</p>
                </Link>

                <Link href='#experience'>
                    <p>Experience</p>
                </Link>
            </div>

            <div className='flex gap-4'>
                <Link href='https://github.com/nickwentworth' target='_blank'>
                    <Icon icon='github' />
                </Link>

                <Link
                    href='https://www.linkedin.com/in/nickwentworth/'
                    target='_blank'
                >
                    <Icon icon='linkedin' />
                </Link>

                <Link href='mailto:nickwentworth123@gmail.com' target='_blank'>
                    <Icon icon='mail' />
                </Link>
            </div>
        </div>
    );
}
