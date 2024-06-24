type CardProps = React.PropsWithChildren<{
    left?: React.ReactNode;
}>;

export function Card(props: CardProps) {
    return (
        <div className='inline-flex bg-base-750 rounded-md shadow-sm overflow-hidden'>
            {props.left}
            <div className='p-5'>{props.children}</div>
        </div>
    );
}
