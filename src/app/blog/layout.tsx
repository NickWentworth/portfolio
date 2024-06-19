import { BlogNav } from '@/components/BlogNav';

export default (props: React.PropsWithChildren) => {
    return (
        <div className='bg-base-750/80'>
            <div className='max-w-[1400px] m-auto md:flex md:items-start'>
                <BlogNav />

                <div className='bg-base-700 p-4 overflow-x-hidden md:grow'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
