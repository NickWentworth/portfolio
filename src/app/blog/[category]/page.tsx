import { Card } from '@/components/common';
import Link from 'next/link';
import { getCategoryMeta, getPostMeta, getPostText } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageProps = {
    params: {
        category: string;
    };
};

export default (props: PageProps) => {
    const text = getPostText(props.params.category);
    const posts = getPostMeta(props.params.category);

    if (text === undefined) {
        return <p>Error: file not found</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <MDXRemote source={text} />

            <hr />

            <div className='grid grid-cols-2 gap-4'>
                {posts.map((post) => (
                    <Link key={post.title} href={post.href}>
                        <Card>
                            <h5>{post.title}</h5>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export function generateStaticParams() {
    return getCategoryMeta().map((category) => ({
        category,
    }));
}
