import { BlogPostTitle } from '@/components/BlogPostTitle';
import { Card } from '@/components/common';
import Link from 'next/link';
import { categoryIndexPosts, compilePost, postsByCategory } from '@/lib/posts';
import { notFound } from 'next/navigation';

type PageProps = {
    params: {
        category: string;
    };
};

export default async (props: PageProps) => {
    const compiled = await compilePost(props.params.category);
    const posts = await postsByCategory(props.params.category);

    if (compiled === undefined) {
        notFound();
    }

    return (
        <div className='flex flex-col gap-4'>
            <BlogPostTitle frontmatter={compiled.frontmatter} />

            <hr />

            {compiled.content}

            <hr />

            <div className='grid grid-cols-2 gap-4'>
                {posts.map((post) => (
                    <Link
                        key={post.href}
                        href={post.href}
                        className='group *:w-full *:h-full'
                    >
                        <Card>
                            <h5 className='text-accent-200 group-hover:underline'>
                                {post.frontmatter.title}
                            </h5>
                            <p className='text-white/90 group-hover:text-white/90'>
                                {post.frontmatter.summary}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    const categories = await categoryIndexPosts();

    return categories.map((category) => ({
        category: category.category,
    }));
}
