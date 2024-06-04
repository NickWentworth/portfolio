import { BlogNav } from '@/components/blog/BlogNav';

export default (props: React.PropsWithChildren) => {
    return (
        <div className='flex'>
            <BlogNav />

            <div className='bg-base-700 grow p-4'>{props.children}</div>
        </div>
    );
};
