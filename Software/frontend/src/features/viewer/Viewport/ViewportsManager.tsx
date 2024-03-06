import {useSelector} from 'react-redux';
import {useRef, useEffect} from "react";
import {IStore} from '@/models';
import NewViewport from '@features/viewer/Viewport/NewViewport/Viewport.tsx';
import ViewportGrid from '@features/viewer/Viewport/ViewportGrid/ViewportGrid.tsx';
import {useState} from 'react';
import * as cornerstone from '@cornerstonejs/core';


const createViewportInput = (
    viewportId: string,
    currentRef: any,
    type: cornerstone.Enums.ViewportType,
    defaultOptions?: {
        [key: string]: any
    }
) => {
    return {
        viewportId,
        type,
        element: currentRef,
        defaultOptions: defaultOptions
    }
}


const ViewportsManager = () => {
    const {numRows, numCols} = useSelector((store: IStore) => store.viewer.layout);
    const [selectedViewportId, setSelectedViewportId] = useState<string | null>(null);
    const elementsArray = useRef<JSX.Element[]>([])
    const viewportInputArray: cornerstone.Types.PublicViewportInput[] = []

    const {renderingEngineId} = useSelector((store: IStore) => store.viewer);


    const handleViewportClick = (id: string) => {
        console.log('Viewport clicked', id);
        setSelectedViewportId(id);
    };

    useEffect(() => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
        if (renderingEngine) {
            renderingEngine.setViewports(viewportInputArray);
        }
    }, [numRows, numCols]);


    // Dynamically generate the cornerstone elements based on rows and cols
    const renderCornerstoneElements = () => {
        return Array.from({length: numRows * numCols}, (_, idx) => {

                const viewportId = `viewport-${idx}`;
                const el =
                    <NewViewport
                        selectedViewportId={selectedViewportId}
                        id={viewportId}
                        onClick={() => {
                            handleViewportClick(viewportId);
                        }}
                        key={idx}
                    />

                elementsArray.current[idx] = el
                const viewportInput = createViewportInput(
                    viewportId,
                    elementsArray.current[idx],
                    cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                    {background: [0, 0, 0]}
                )
                viewportInputArray.push(viewportInput);

                return el;
            }
        );
    };

    const el = renderCornerstoneElements()
    console.log(viewportInputArray)

    return (
        <ViewportGrid numCols={numCols} numRows={numRows}>
            {el}
        </ViewportGrid>
    );
};

export default ViewportsManager;
