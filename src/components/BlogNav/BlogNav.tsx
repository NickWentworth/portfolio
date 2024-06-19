import { type BlogNavSection } from '.';
import { categoryIndexPosts, postsByCategory } from '@/lib/posts';
import { ResponsiveBlogNav } from './ResponsiveBlogNav';

export async function BlogNav() {
    const categories = await categoryIndexPosts();

    const sections = await Promise.all(
        categories.map(async (category) => {
            const posts = await postsByCategory(category.category);

            return {
                index: category,
                posts,
            } satisfies BlogNavSection;
        })
    );

    return <ResponsiveBlogNav sections={sections} />;
}
