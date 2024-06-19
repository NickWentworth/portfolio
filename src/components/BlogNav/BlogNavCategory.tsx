'use client';

import { type BlogNavSection } from '.';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BlogNavCategoryProps = {
    section: BlogNavSection;
    onItemClick?: () => void;
};

export function BlogNavCategory(props: BlogNavCategoryProps) {
    const route = usePathname();

    function highlight(href: string) {
        if (href === route) {
            return 'text-accent-200 font-semibold';
        } else {
            return '';
        }
    }

    function border(href: string) {
        if (href === route) {
            return 'border-l-accent-200';
        } else {
            return 'border-l-transparent';
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <Link
                href={props.section.index.href}
                className={highlight(props.section.index.href)}
                onClick={props.onItemClick}
            >
                <h5>{props.section.index.frontmatter.title}</h5>
            </Link>

            <div className='flex flex-col gap-2 border-l border-l-white/10'>
                {props.section.posts.map((post) => (
                    <Link
                        key={post.href}
                        href={post.href}
                        className={`px-2 -ml-px border-l ${highlight(
                            post.href
                        )} ${border(post.href)}`}
                        onClick={props.onItemClick}
                    >
                        {post.frontmatter.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
