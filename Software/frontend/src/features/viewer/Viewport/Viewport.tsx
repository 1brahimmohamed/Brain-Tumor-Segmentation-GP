import LayoutTool from './LayoutTool';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addViewport, updateViewport } from './viewports-slice'; // Adjust the import path as necessary
import * as cornerstone from '@cornerstonejs/core';
import { setClickedViewport } from './viewports-slice';

const Viewport = () => {
    // State for layout rows and columns
    const [layoutRows, setLayoutRows] = useState(1);
    const [layoutCols, setLayoutCols] = useState(3);

    // Array of refs to the cornerstone elements

    const dispatch = useDispatch();
    const viewports = useSelector((state: any) => state.viewports.viewports);

    // Function to handle layout changes from the LayoutTool
    const handleLayoutChange = (newRows: number, newCols: number) => {
        setLayoutRows(newRows);
        setLayoutCols(newCols);
    };

    // Function to handle click event on viewport element
    const handleViewportClick = (viewportId: string) => {
        dispatch(setClickedViewport(viewportId));
        console.log(viewportId);
    };

    useEffect(() => {
        // Truncate contentRefs to the current number of elements based on layoutRows * layoutCols
        const newViewportIds = Array.from(
            { length: layoutRows * layoutCols },
            (_, i) => `cornerstone-element${i}`
        );
        newViewportIds.forEach((viewportId, i) => {
            const viewportConfig = {
                viewportId,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: document.getElementById(viewportId),
            };

            const existingViewport = viewports.find((vp: any) => vp.viewportId === viewportId);
            if (existingViewport) {
                dispatch(updateViewport(viewportConfig));
            } else {
                dispatch(addViewport(viewportConfig));
            }
        });
    }, [layoutRows, layoutCols, dispatch]);

    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({ length: layoutRows * layoutCols }, (_, i) => (
            <div
                key={i}
                className="max-w-[100vw] min-w-[24%] h-auto m-1 bg-black "
                onClick={() => handleViewportClick(`cornerstone-element${i}`)}
            >
                <div className="w-full h-full" id={`cornerstone-element${i}`}></div>
            </div>
        ));
    };

    return (
        <div className={'w-full'}>
            <div className="flex">
                <LayoutTool row={layoutRows} col={layoutCols} onChange={handleLayoutChange} />

                {/* Render the dynamic cornerstone elements */}
                <div className="flex flex-wrap w-screen h-screen">{renderCornerstoneElements()}</div>
            </div>
        </div>
    );
};

export default Viewport;
