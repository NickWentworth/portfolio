type TagListProps = {
    tags: string[];
};

export function TagList(props: TagListProps) {
    return (
        <div className='flex gap-2 flex-wrap'>
            {props.tags.map((tag) => (
                <p
                    key={tag}
                    className='bg-base-600/70 text-sm font-medium px-2 py-0.5 rounded-full'
                >
                    {tag}
                </p>
            ))}
        </div>
    );
}
