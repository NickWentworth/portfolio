import { BlogNav } from '@/components/blog/BlogNav';
import { getAllPostPaths, getPostText } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageProps = {
    params: {
        post: string[];
    };
};

export default async (props: PageProps) => {
    const text = getPostText(props.params.post);

    return (
        <div className='flex'>
            <BlogNav />

            <div className='bg-base-700 grow p-4'>
                {text === undefined ? (
                    <p>Error: file not found</p>
                ) : (
                    <MDXRemote source={text} />
                )}
            </div>
        </div>
    );
};

export function generateStaticParams() {
    return getAllPostPaths().map((path) => ({
        post: path,
    }));
}
