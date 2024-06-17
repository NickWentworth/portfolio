import { BlogNav } from '@/components/BlogNav';

export default (props: React.PropsWithChildren) => {
    return (
        <div className='h-full bg-base-750/80'>
            <div className='flex items-start max-w-[1400px] m-auto'>
                <BlogNav />

                <div className='bg-base-700 grow p-4 overflow-x-hidden'>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
