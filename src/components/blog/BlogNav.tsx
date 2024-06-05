import Link from 'next/link';
import { getCategoryMeta, getPostMeta } from '@/lib/posts';

export function BlogNav() {
    const categories = getCategoryMeta();

    return (
        <div className='bg-base-750/90 w-60 shrink-0 flex flex-col p-4 gap-2'>
            <Link href='/blog'>
                <h3>Posts</h3>
            </Link>

            <hr />

            {categories.map((category) => {
                const posts = getPostMeta(category);

                return (
                    <div key={category} className='flex flex-col'>
                        <Link href={`/blog/${category}`}>{category}</Link>

                        {posts.map((post) => (
                            <Link key={post.href} href={post.href}>
                                {post.title}
                            </Link>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
