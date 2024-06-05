import { getCategoryMeta, getPostMeta, getPostText } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageProps = {
    params: {
        category: string;
        post: string;
    };
};

export default (props: PageProps) => {
    const text = getPostText(props.params.category, props.params.post);

    if (text === undefined) {
        return <p>Error: file not found</p>;
    }

    return <MDXRemote source={text} />;
};

export function generateStaticParams() {
    return getCategoryMeta().flatMap((category) =>
        getPostMeta(category).map((post) => ({
            category,
            post: post.title,
        }))
    );
}
