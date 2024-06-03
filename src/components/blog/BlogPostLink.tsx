'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BlogPostLinkProps = {
    href: string;
    text: string;
};

export function BlogPostLink(props: BlogPostLinkProps) {
    const path = usePathname();
    const isCurrentPage = path === props.href;

    return (
        <Link
            className={isCurrentPage ? 'text-accent-200' : ''}
            href={props.href}
        >
            {props.text}
        </Link>
    );
}
