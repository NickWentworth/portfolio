import { Bitboard } from './Bitboard';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';

type MDXComponents = MDXRemoteProps['components'];

/**
 * Main export to both override default tags and give custom components to mdx parser
 */
export const blogComponents = {
    // overrides for html tags
    h1: ({ children }) => (
        <div>
            <h2>{children}</h2>
            <hr />
        </div>
    ),
    h2: ({ children }) => <h3>{children}</h3>,
    a: ({ children, href }) => (
        <a href={href} className='text-accent-200' target='_blank'>
            {children}
        </a>
    ),

    // custom components
    Bitboard,
} satisfies MDXComponents;
