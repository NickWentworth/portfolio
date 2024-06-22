import { Icon } from '@/components/common';
import Link from 'next/link';
import {
    categoryIndexPosts,
    compilePost,
    getNeighboringPosts,
    postsByCategory,
} from '@/lib/posts';
import { formatPostDate } from '@/lib/format';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

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
        notFound();
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 py-4'>
                <h1>{compiled.frontmatter.title}</h1>

                <p className='font-mono text-base-200'>
                    {formatPostDate(compiled.frontmatter.date!)}
                </p>

                <p>{compiled.frontmatter.summary}</p>
            </div>

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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const compiled = await compilePost(
        props.params.category,
        props.params.post
    );

    return { title: compiled?.frontmatter.title };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
    const categories = await categoryIndexPosts();

    const posts = await Promise.all(
        categories.map(
            async (category) => await postsByCategory(category.category)
        )
    );

    return posts.flat().map((post) => ({
        category: post.category,
        post: post.post,
    }));
}
