import { BlogNavRootLink } from './BlogNavRootLink';
import { BlogNavCategory } from './BlogNavCategory';
import { categoryIndexPosts, postsByCategory } from '@/lib/posts';

export async function BlogNav() {
    const categories = await categoryIndexPosts();

    return (
        <nav className='w-60 shrink-0 flex flex-col p-4 gap-2 sticky top-0'>
            <BlogNavRootLink />

            <hr />

            {categories.map(async (category) => {
                const posts = await postsByCategory(category.category);

                return <BlogNavCategory category={category} posts={posts} />;
            })}
        </nav>
    );
}
