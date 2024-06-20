import { BlogPostTitle } from '@/components/BlogPostTitle';
import { Icon } from '@/components/common';
import Link from 'next/link';
import {
    categoryIndexPosts,
    compilePost,
    getNeighboringPosts,
    postsByCategory,
} from '@/lib/posts';

type PageProps = {
    params: {
        category: string;
        post: string;
    };
};

export default async (props: PageProps) => {
    const { category, post } = props.params;

    const compiled = await compilePost(category, post);
    const [prevPost, nextPost] = await getNeighboringPosts(category, post);

    if (compiled === undefined) {
        return <p>Error: file not found</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <BlogPostTitle frontmatter={compiled.frontmatter} />

            <hr />

            {compiled.content}

            <hr />

            <div className='flex'>
                {prevPost && (
                    <Link
                        href={prevPost.href}
                        className='flex items-center gap-2'
                    >
                        <Icon icon='left' size='20' />
                        <h5>{prevPost.frontmatter.title}</h5>
                    </Link>
                )}

                <div className='grow' />

                {nextPost && (
                    <Link
                        href={nextPost.href}
                        className='flex items-center gap-2'
                    >
                        <h5>{nextPost.frontmatter.title}</h5>
                        <Icon icon='right' size='20' />
                    </Link>
                )}
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    const categories = await categoryIndexPosts();

    const params = categories.flatMap(async (category) => {
        const posts = await postsByCategory(category.category);

        return posts.map((post) => ({
            category: post.category,
            post: post.post,
        }));
    });

    return await Promise.all(params);
}
