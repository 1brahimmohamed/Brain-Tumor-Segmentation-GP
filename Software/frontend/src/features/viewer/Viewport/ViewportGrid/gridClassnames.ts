const gridClassnames: { [key: string]: string } = {
    '1x1': 'grid grid-rows-1 grid-cols-1',
    '1x2': 'grid grid-rows-1 grid-cols-2',
    '1x3': 'grid grid-rows-1 grid-cols-3',
    '1x4': 'grid grid-rows-1 grid-cols-4',

    '2x1': 'grid grid-rows-2 grid-cols-1',
    '2x2': 'grid grid-rows-2 grid-cols-2',
    '2x3': 'grid grid-rows-2 grid-cols-3',
    '2x4': 'grid grid-rows-2 grid-cols-4',

    '3x1': 'grid grid-rows-3 grid-cols-1',
    '3x2': 'grid grid-rows-3 grid-cols-2',
    '3x3': 'grid grid-rows-3 grid-cols-3',
    '3x4': 'grid grid-rows-3 grid-cols-4',

    '4x1': 'grid grid-rows-4 grid-cols-1',
    '4x2': 'grid grid-rows-4 grid-cols-2',
    '4x3': 'grid grid-rows-4 grid-cols-3',
    '4x4': 'grid grid-rows-4 grid-cols-4'
};

const getGridClassnames = (numRows: number, numCols: number) => {
    return gridClassnames[`${numRows}x${numCols}`];
};

export default getGridClassnames;
