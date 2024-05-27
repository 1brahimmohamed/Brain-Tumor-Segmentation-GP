import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IStore } from '@/models';
import NewViewport from '@features/viewer/Viewport/NewViewport/Viewport.tsx';
import ViewportGrid from '@features/viewer/Viewport/ViewportGrid/ViewportGrid.tsx';
import { useState } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';

const createViewportInput = (
    viewportId: string,
    currentRef: HTMLDivElement,
    type: cornerstone.Enums.ViewportType,
    defaultOptions?: {
        [key: string]: any;
    }
) => {
    return {
        viewportId,
        type,
        element: currentRef,
        defaultOptions: defaultOptions
    };
};

const ViewportsManager = () => {
    const [viewportInputArray, setViewportInputArray] = useState<cornerstone.Types.PublicViewportInput[]>([]);
    const { numRows, numCols } = useSelector((store: IStore) => store.viewer.layout);
    const { renderingEngineId } = useSelector((store: IStore) => store.viewer);
    const { currentToolGroupId: currentAnnotationToolGroupId } = useSelector((store: IStore) => store.viewer);

    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
    const annotationToolGroup = cornerstoneTools.ToolGroupManager.getToolGroup(currentAnnotationToolGroupId);

    useEffect(() => {
        updateViewportInputArray();
        updateAnnotationToolsOnViewports();
    }, []);

    // Set up the viewports for the rendering engine
    useEffect(() => {
        updateViewportInputArray();
        updateAnnotationToolsOnViewports();
    }, [numRows, numCols, renderingEngine]);

    // Update the viewport input array based on the number of rows and columns.
    // This function ensures that the correct number of viewports are created and configured according to the layout defined by numRows and numCols.
    // It enables the new viewports and disables any viewports that are removed due to changes in the layout.
    const updateViewportInputArray = () => {
        if (renderingEngine) {
            // Array to hold the new viewports based on the updated layout
            const newViewportInputArray: cornerstone.Types.PublicViewportInput[] = [];

            // Create new viewports for any additional slots in the layout
            for (let idx = newViewportInputArray.length; idx < numRows * numCols; idx++) {
                const viewportId = `viewport-${idx}`;
                const currentRef = document.getElementById(viewportId) as HTMLDivElement;
                newViewportInputArray.push(
                    createViewportInput(viewportId, currentRef, cornerstone.Enums.ViewportType.ORTHOGRAPHIC)
                );
            }

            // Disable any viewports that are removed from the layout
            for (let idx = viewportInputArray.length; idx > newViewportInputArray.length; idx--) {
                renderingEngine.disableElement(viewportInputArray[idx - 1].viewportId);
            }

            // Get the current viewports from the rendering engine
            const currentViewports = renderingEngine.getViewports();

            // Enable the new viewports that are not already set
            newViewportInputArray.forEach((newViewport) => {
                const isViewportSet = currentViewports.some(
                    (viewport) => viewport.id === newViewport.viewportId
                );
                if (!isViewportSet) {
                    renderingEngine.enableElement(newViewport);
                }
            });

            // Update the state with the new viewport input array
            setViewportInputArray(newViewportInputArray);
        }
    };

    // Update the annotation tools on the viewports
    const updateAnnotationToolsOnViewports = () => {
        if (renderingEngine && annotationToolGroup) {
            const viewports = renderingEngine.getViewports();
            viewports.forEach((viewport) => {
                annotationToolGroup.addViewport(viewport.id, renderingEngineId);
            });
        }
    };

    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({ length: numRows * numCols }, (_, idx) => (
            <NewViewport id={`viewport-${idx}`} key={idx} vNeighbours={numRows} />
        ));
    };

    return (
        <ViewportGrid numCols={numCols} numRows={numRows}>
            {renderCornerstoneElements()}
        </ViewportGrid>
    );
};

export default ViewportsManager;
