import { BlogNav, type BlogNavSection } from '@/components/BlogNav';
import { categoryIndexPosts, postsByCategory } from '@/lib/posts';

export default async (props: React.PropsWithChildren) => {
    const categories = await categoryIndexPosts();

    const sections = await Promise.all(
        categories.map(async (category) => {
            const posts = await postsByCategory(category.category);

            return { index: category, posts } satisfies BlogNavSection;
        })
    );

    return (
        <div className='bg-base-750/80'>
            <div className='max-w-[1200px] m-auto md:flex md:items-start'>
                <BlogNav sections={sections} />

                <div className='bg-base-700 p-4 overflow-x-hidden md:grow'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
