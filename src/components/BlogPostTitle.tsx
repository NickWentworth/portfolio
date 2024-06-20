import { type PostFrontmatter } from '@/lib/posts';
import { formatPostDate } from '@/lib/format';

type BlogPostTitleProps = {
    frontmatter: PostFrontmatter;
};

export function BlogPostTitle(props: BlogPostTitleProps) {
    return (
        <div className='flex flex-col gap-2 py-4'>
            <h1>{props.frontmatter.title}</h1>

            {props.frontmatter.thumbnail && (
                <img
                    className='rounded-md mt-2'
                    src={props.frontmatter.thumbnail}
                />
            )}

            {props.frontmatter.date && (
                <p className='text-white/70'>
                    {formatPostDate(props.frontmatter.date)}
                </p>
            )}

            {props.frontmatter.summary && <p>{props.frontmatter.summary}</p>}
        </div>
    );
}
