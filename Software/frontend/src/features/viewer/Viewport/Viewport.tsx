import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addViewport, updateViewport } from './viewports-slice'; // Adjust the import path as necessary
import * as cornerstone from '@cornerstonejs/core';
import { setClickedViewport } from './viewports-slice';
import { IStore } from '@models/store.ts';

const Viewport = () => {
    const { numRows, numCols } = useSelector((store: IStore) => store.viewer.layout);

    const dispatch = useDispatch();
    const viewports = useSelector((state: any) => state.viewports.viewports);
    const clickedViewportId = useSelector((state: any) => state.viewports.clickedViewportId);

    // Function to handle click event on viewport element
    const handleViewportClick = (viewportId: string) => {
        dispatch(setClickedViewport(viewportId));
        console.log(viewportId);
    };

    useEffect(() => {
        // Truncate contentRefs to the current number of elements based on layoutRows * layoutCols
        const newViewportIds = Array.from({ length: numRows * numCols }, (_, i) => `cornerstone-element${i}`);
        newViewportIds.forEach((viewportId) => {
            const viewportConfig = {
                viewportId,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: document.getElementById(viewportId)
            };

            const existingViewport = viewports.find((vp: any) => vp.viewportId === viewportId);
            if (existingViewport) {
                dispatch(updateViewport(viewportConfig));
            } else {
                dispatch(addViewport(viewportConfig));
            }
        });
    }, [numRows, numCols, dispatch]);

    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({ length: numCols * numCols }, (_, i) => (
            <div
                key={i}
                className={`h-full w-full bg-black ${clickedViewportId === `cornerstone-element${i}` ? 'border-2 border-blue-300' : ''}`}
                onClick={() => handleViewportClick(`cornerstone-element${i}`)}
            >
                <div className="w-full h-full" id={`cornerstone-element${i}`}></div>
            </div>
        ));
    };

    console.log(numCols, numRows);

    const classStr = `h-[93vh] grid grid-cols-${numCols} grid-rows-${numRows} gap-1 w-[90vw]`;

    return <div className={classStr}>{renderCornerstoneElements()}</div>;
};

export default Viewport;
