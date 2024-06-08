import { Card } from '@/components/common';
import Link from 'next/link';
import { categoryIndexPosts, getPostText, postsByCategory } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageProps = {
    params: {
        category: string;
    };
};

export default async (props: PageProps) => {
    const text = getPostText(props.params.category);
    const posts = await postsByCategory(props.params.category);

    if (text === undefined) {
        return <p>Error: file not found</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <MDXRemote source={text} options={{ parseFrontmatter: true }} />

            <hr />

            <div className='grid grid-cols-2 gap-4'>
                {posts.map((post) => (
                    <Link key={post.href} href={post.href}>
                        <Card>
                            <h5>{post.frontmatter.title}</h5>
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
