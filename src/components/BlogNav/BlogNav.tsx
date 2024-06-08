import { BlogNavRootLink } from './BlogNavRootLink';
import { BlogNavCategory } from './BlogNavCategory';
import { categoryIndexPosts, postsByCategory } from '@/lib/posts';

export async function BlogNav() {
    const categories = await categoryIndexPosts();

    return (
        <nav className='bg-base-750/90 w-60 shrink-0 flex flex-col p-4 gap-2'>
            <BlogNavRootLink />

            <hr />

            {categories.map(async (category) => {
                const posts = await postsByCategory(category.category);

                return <BlogNavCategory category={category} posts={posts} />;
            })}
        </nav>
    );
}
