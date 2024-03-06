import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IStore } from '@/models';
import NewViewport from '@features/viewer/Viewport/NewViewport/Viewport.tsx';
import ViewportGrid from '@features/viewer/Viewport/ViewportGrid/ViewportGrid.tsx';
import { useState } from 'react';
import * as cornerstone from '@cornerstonejs/core';

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
    const { numRows, numCols } = useSelector((store: IStore) => store.viewer.layout);
    const [selectedViewportId, setSelectedViewportId] = useState<string | null>(null);
    const [viewportInputArray, setViewportInputArray] = useState<cornerstone.Types.PublicViewportInput[]>([]);

    const { renderingEngineId } = useSelector((store: IStore) => store.viewer);
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

    const handleViewportClick = (id: string) => {
        console.log('Viewport clicked', id);
        setSelectedViewportId(id);
    };

    useEffect(() => {
        updateViewportInputArray();
    }, []);

    // Set up the viewports for the rendering engine
    useEffect(() => {
        updateViewportInputArray();
    }, [numRows, numCols, renderingEngine]);

    const updateViewportInputArray = () => {
        if (renderingEngine) {
            const newViewportInputArray: cornerstone.Types.PublicViewportInput[] = [];

            Array.from({ length: numRows * numCols }, (_, idx) => {
                const viewportId = `viewport-${idx}`;
                const currentRef = document.getElementById(viewportId) as HTMLDivElement;
                newViewportInputArray.push(
                    createViewportInput(viewportId, currentRef, cornerstone.Enums.ViewportType.ORTHOGRAPHIC)
                );
            });
            setViewportInputArray(newViewportInputArray);
            renderingEngine.setViewports(newViewportInputArray);
        }
    };

    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({ length: numRows * numCols }, (_, idx) => (
            <NewViewport
                selectedViewportId={selectedViewportId}
                id={`viewport-${idx}`}
                onClick={() => {
                    handleViewportClick(`viewport-${idx}`);
                }}
                key={idx}
            />
        ));
    };

    return (
        <ViewportGrid numCols={numCols} numRows={numRows}>
            {renderCornerstoneElements()}
        </ViewportGrid>
    );
};

export default ViewportsManager;
