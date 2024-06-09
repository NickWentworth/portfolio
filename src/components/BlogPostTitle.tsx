import { type PostFrontmatter } from '@/lib/posts';

type BlogPostTitleProps = {
    frontmatter: PostFrontmatter;
};

export function BlogPostTitle(props: BlogPostTitleProps) {
    return (
        <div className='py-4'>
            <h1>{props.frontmatter.title}</h1>
        </div>
    );
}
