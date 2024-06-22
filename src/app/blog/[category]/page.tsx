import { Card } from '@/components/common';
import Link from 'next/link';
import { categoryIndexPosts, compilePost, postsByCategory } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { GetStaticPropsResult, type Metadata } from 'next';

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
            <div className='flex flex-col pt-4 gap-4'>
                <h1>{compiled.frontmatter.title}</h1>

                <img
                    className='rounded-md'
                    src={compiled.frontmatter.thumbnail}
                />

                <p>{compiled.frontmatter.summary}</p>
            </div>

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
                            <p className='ignore-hover'>
                                {post.frontmatter.summary}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const compiled = await compilePost(props.params.category);

    return { title: compiled?.frontmatter.title };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
    const categories = await categoryIndexPosts();

    return categories.map((category) => ({
        category: category.category,
    }));
}
