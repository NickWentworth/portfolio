'use client';

import { usePathname } from 'next/navigation';
import { type BlogNavSection } from '.';
import { Icon } from '../common';
import { BlogNavCategory } from './BlogNavCategory';
import { useState } from 'react';
import Link from 'next/link';

type ResponsiveBlogNavProps = {
    sections: BlogNavSection[];
};

export function ResponsiveBlogNav(props: ResponsiveBlogNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const route = usePathname();
    const isAtRootBlogLink = '/blog' === route;

    return (
        <nav className='bg-base-750 shrink-0 sticky top-[--header-height] md:w-60'>
            <div className='flex items-center justify-between p-4'>
                <Link
                    href='/blog'
                    className={
                        isAtRootBlogLink ? 'text-accent-200 font-semibold' : ''
                    }
                >
                    <h3>Posts</h3>
                </Link>

                <Icon
                    icon='menu'
                    className='md:hidden'
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

            <div className={`relative ${isOpen ? '' : 'hidden'} md:block`}>
                <div className='bg-base-750 absolute top-0 w-full flex flex-col gap-4 px-4 pb-4'>
                    <hr />

                    {props.sections.map((section, idx) => (
                        <BlogNavCategory key={idx} section={section} />
                    ))}
                </div>
            </div>
        </nav>
    );
}
