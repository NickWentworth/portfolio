'use client';

import { type BlogNavSection } from '.';
import { BlogNavCategory } from './BlogNavCategory';
import { Icon } from '../common';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type BlogNavProps = {
    sections: BlogNavSection[];
};

export function BlogNav(props: BlogNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const route = usePathname();
    const isAtRootBlogLink = '/blog' === route;

    return (
        <nav className='bg-base-750 shrink-0 sticky top-[--header-height] md:w-60'>
            <div className='flex items-center justify-between pl-4 pr-3 py-2'>
                <Link
                    href='/blog'
                    className={
                        isAtRootBlogLink ? 'text-accent-200 font-semibold' : ''
                    }
                    onClick={() => setIsOpen(false)}
                >
                    <h5>Posts</h5>
                </Link>

                <button className='btn-ghost'>
                    <Icon
                        icon='menu'
                        size='20'
                        className='md:hidden'
                        onClick={() => setIsOpen((curr) => !curr)}
                    />
                </button>
            </div>

            <div className={`relative ${isOpen ? '' : 'hidden'} md:block`}>
                <div className='bg-base-750 absolute top-0 w-full flex flex-col gap-2 px-4 pb-2'>
                    <hr />

                    {props.sections.map((section, idx) => (
                        <BlogNavCategory
                            key={idx}
                            section={section}
                            onItemClick={() => setIsOpen(false)}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
}
