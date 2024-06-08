'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BlogNavRootLink() {
    const route = usePathname();

    const isActive = '/blog' === route;

    return (
        <Link
            href='/blog'
            className={isActive ? 'text-accent-200 font-semibold' : ''}
        >
            <h3>Posts</h3>
        </Link>
    );
}
