export function Card(props: React.PropsWithChildren) {
    return (
        <div className='inline-block bg-base-750 rounded-md p-5 shadow-sm'>
            {props.children}
        </div>
    );
}
