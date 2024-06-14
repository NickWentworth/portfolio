type BitboardProps = {
    description?: string;
    squares: number[];
    showOffsetsFrom?: number;
};

const range = (n: number) => Array.from({ length: n }).map((_, idx) => idx);

export function Bitboard(props: BitboardProps) {
    return (
        <div className='flex flex-col items-center gap-2'>
            {props.description && <code>{props.description}</code>}

            {/* chess board */}
            <div className='bg-base-800 grid grid-cols-8 gap-px'>
                {range(64).map((square) => (
                    <div
                        key={square}
                        className={`h-8 w-8 flex items-center justify-center ${
                            props.squares.includes(square)
                                ? 'bg-accent-200'
                                : 'bg-base-200/50'
                        }`}
                    >
                        {props.showOffsetsFrom !== undefined && (
                            <p>{square - props.showOffsetsFrom}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
