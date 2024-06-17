import { Icon } from '@/components/common';
import Link from 'next/link';

export function Header() {
    return (
        <div className='bg-base-800 flex items-center gap-12 p-4 sticky top-0'>
            <Link className='font-mono font-bold text-accent-200' href='/'>
                <h2>NW</h2>
            </Link>

            <div className='flex gap-6 mr-auto'>
                <Link href='/'>Home</Link>
                <Link href='/blog'>Blog</Link>
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
