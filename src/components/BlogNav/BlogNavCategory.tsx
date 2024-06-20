'use client';

import { type BlogNavSection } from '.';
import { AwareLink } from '@/components/common';

type BlogNavCategoryProps = {
    section: BlogNavSection;
    onItemClick?: () => void;
};

export function BlogNavCategory(props: BlogNavCategoryProps) {
    return (
        <div className='flex flex-col gap-2'>
            <AwareLink
                href={props.section.index.href}
                onClick={props.onItemClick}
                exact
            >
                <h5>{props.section.index.frontmatter.title}</h5>
            </AwareLink>

            <div className='flex flex-col gap-2 border-l border-l-white/10'>
                {props.section.posts.map((post) => (
                    <AwareLink
                        key={post.href}
                        href={post.href}
                        onClick={props.onItemClick}
                        className='px-2 -ml-px border-l border-transparent'
                        activeClassName='border-accent-200'
                    >
                        {post.frontmatter.title}
                    </AwareLink>
                ))}
            </div>
        </div>
    );
}
