// colors for negative and positive heatmap values
const POSITIVE = '#22c55e';
const NEGATIVE = '#ef4444';

type PieceSquareTableProps = {
    values: number[];
};

export function PieceSquareTable(props: PieceSquareTableProps) {
    const max = props.values.reduce((max, curr) =>
        Math.max(max, Math.abs(curr))
    );

    function getHeatmapColor(value: number) {
        // get scale of this value from 0 to max, then convert to hex value from 00 to FF
        const scale = Math.abs(value) / max;
        const opacity = Math.floor(scale * 255);
        const hex = opacity.toString(16);

        if (value > 0) {
            return `${POSITIVE}${hex}`;
        } else {
            return `${NEGATIVE}${hex}`;
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='bg-base-800 grid grid-cols-8 gap-px'>
                {props.values.map((value, idx) => (
                    <div
                        key={idx}
                        className={`h-10 w-10 flex items-center justify-center`}
                        style={{ backgroundColor: getHeatmapColor(value) }}
                    >
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
