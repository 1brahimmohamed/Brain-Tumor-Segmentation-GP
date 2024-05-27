import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '@/redux/store.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { ILayout } from '@/models';

interface LayoutSelectorProps {
    columns?: number;
    rows?: number;
}

function LayoutSelector({ columns = 4, rows = 4 }: LayoutSelectorProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number>();

    const dispatch = useDispatch<TAppDispatch>();

    const hoverX = hoveredIndex! % columns;
    const hoverY = Math.floor(hoveredIndex! / columns);
    const isHovered = (index: number) => {
        const x = index % columns;
        const y = Math.floor(index / columns);

        return x <= hoverX && y <= hoverY;
    };

    const handleOnSelect = ({ numRows, numCols }: ILayout) => {
        const layout: ILayout = {
            numRows,
            numCols
        };
        dispatch(viewerSliceActions.changeViewerLayout(layout));
    };

    const gridSize = '20px ';
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: gridSize.repeat(columns),
                gridTemplateRows: gridSize.repeat(rows)
                // backgroundColor: '#090c29', // primary-dark
            }}
            className="p-2"
        >
            {Array.apply(null, Array(rows * columns))
                .map(function (_, i) {
                    return i;
                })
                .map((index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid white',
                            backgroundColor: isHovered(index) ? '#10a9e2' : ''
                        }}
                        data-cy={`Layout-${index % columns}-${Math.floor(index / columns)}`}
                        className="cursor-pointer"
                        onClick={() => {
                            const x = index % columns;
                            const y = Math.floor(index / columns);

                            handleOnSelect({
                                numRows: y + 1,
                                numCols: x + 1
                            });
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(-1)}
                    ></div>
                ))}
        </div>
    );
}

LayoutSelector.defaultProps = {
    onSelection: () => {},
    columns: 3,
    rows: 3
};

LayoutSelector.propTypes = {
    onSelection: PropTypes.func.isRequired,
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
};

export default LayoutSelector;
