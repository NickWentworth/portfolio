import { BlogPostLink } from './BlogPostLink';
import { getAllPostPaths } from '@/lib/posts';

export function BlogNav() {
    const posts = getAllPostPaths();

    return (
        <div className='bg-base-750/90 w-60 shrink-0 flex flex-col p-4 gap-2'>
            <h3>Posts</h3>

            <hr />

            <div className='flex flex-col'>
                {posts.map((segments) => {
                    const path = segments.join('/');

                    return (
                        <BlogPostLink
                            key={path}
                            href={`/blog/${path}`}
                            text={path}
                        />
                    );
                })}
            </div>
        </div>
    );
}
