import Link from 'next/link';
import { getPostMeta } from '@/lib/posts';

export function BlogNav() {
    const posts = getPostMeta();

    return (
        <div className='bg-base-750/90 w-60 shrink-0 flex flex-col p-4 gap-2'>
            <Link href='/blog'>
                <h3>Posts</h3>
            </Link>

            <hr />

            <div className='flex flex-col'>
                {posts.map((meta) => (
                    <Link key={meta.href} href={meta.href}>
                        {meta.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
