import Link from 'next/link';
import { categoryIndexPosts, postsByCategory } from '@/lib/posts';

export async function BlogNav() {
    const categories = await categoryIndexPosts();

    return (
        <div className='bg-base-750/90 w-60 shrink-0 flex flex-col p-4 gap-2'>
            <Link href='/blog'>
                <h3>Posts</h3>
            </Link>

            <hr />

            {categories.map(async (category) => {
                const posts = await postsByCategory(category.category);

                return (
                    <div key={category.href} className='flex flex-col'>
                        <Link href={category.href}>
                            {category.frontmatter.title}
                        </Link>

                        {posts.map((post) => (
                            <Link key={post.href} href={post.href}>
                                {post.frontmatter.title}
                            </Link>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
