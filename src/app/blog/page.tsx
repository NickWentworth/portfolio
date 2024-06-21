import { Card } from '@/components/common';
import { categoryIndexPosts } from '@/lib/posts';
import Link from 'next/link';

export default async () => {
    const categories = await categoryIndexPosts();

    return (
        <div className='flex flex-col gap-4 pt-4'>
            <h1>Hi, I'm Nick</h1>

            <p>Welcome to my blog!</p>

            <p>
                I'm a software developer with a passion for tackling difficult
                problems and creating innovative solutions. Alongside coding, I
                love to teach and guide others to discover their own passions.
            </p>

            <p>
                In my blog posts, I aim to blend these two passions of mine by
                diving into my projects and their inner-workings while also
                making them accessible and understandable for anyone interested
                in learning more.
            </p>

            <p> I hope that you find these posts useful and insightful!</p>

            <hr />

            {categories.map((category) => (
                <Link
                    key={category.href}
                    href={category.href}
                    className='group *:w-full'
                >
                    <Card>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <h4 className='text-accent-200 group-hover:underline'>
                                    {category.frontmatter.title}
                                </h4>

                                <p className='text-white/90 group-hover:text-white/90'>
                                    {category.frontmatter.summary}
                                </p>
                            </div>

                            <img
                                className='rounded-sm'
                                src={category.frontmatter.thumbnail}
                            />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
