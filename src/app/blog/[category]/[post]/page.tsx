import { categoryIndexPosts, getPostText, postsByCategory } from '@/lib/posts';
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

    return <MDXRemote source={text} options={{ parseFrontmatter: true }} />;
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
