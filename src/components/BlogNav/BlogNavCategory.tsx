'use client';

import Link from 'next/link';
import { type PostMetadata } from '@/lib/posts';
import { usePathname } from 'next/navigation';

type BlogNavCategoryProps = {
    category: PostMetadata;
    posts: PostMetadata[];
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
                href={props.category.href}
                className={highlight(props.category.href)}
            >
                <h4>{props.category.frontmatter.title}</h4>
            </Link>

            <div className='flex flex-col gap-2 border-l border-l-white/10'>
                {props.posts.map((post) => (
                    <Link
                        key={post.href}
                        href={post.href}
                        className={`px-2 -ml-px border-l ${highlight(
                            post.href
                        )} ${border(post.href)}`}
                    >
                        {post.frontmatter.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
