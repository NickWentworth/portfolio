import { getPostMeta, getPostText } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageProps = {
    params: {
        post: string[];
    };
};

export default (props: PageProps) => {
    const text = getPostText(props.params.post[0], props.params.post[1]);

    if (text === undefined) {
        return <p>Error: file not found</p>;
    }

    return <MDXRemote source={text} />;
};

export function generateStaticParams() {
    return getPostMeta().map((meta) => ({
        post: meta.params,
    }));
}
