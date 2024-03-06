import React from 'react';
import getGridClassnames from '@features/viewer/Viewport/ViewportGrid/gridClassnames.ts';
import classnames from 'classnames';

type TViewportGridProps = {
    numRows: number;
    numCols: number;
};

const ViewportGrid = ({ numRows, numCols, children }: React.PropsWithChildren<TViewportGridProps>) => {
    // check if the number of rows and columns are valid
    if (numRows < 1 || numCols < 1) {
        throw new Error('Invalid number of rows or columns');
    }

    // // check if the number of children is equal to the number of rows * columns
    // if (React.Children.count(children) !== numRows * numCols) {
    //     throw new Error('Number of children does not match the number of rows and columns');
    // }

    const classes = getGridClassnames(numRows, numCols);

    return <div className={classnames(classes, 'gap-1 h-full w-full')}>{children}</div>;
};

export default ViewportGrid;
