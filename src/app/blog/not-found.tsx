import Link from 'next/link';

export default () => {
    return (
        <div className='flex flex-col items-center gap-4 py-8'>
            <h3>404: Blog post not found</h3>

            <p className='text-base-200'>
                The post you are looking for doesn't exist or it might have been
                removed
            </p>

            <Link href='/blog'>
                <button className='btn-fill'>Back to Blog</button>
            </Link>
        </div>
    );
};
