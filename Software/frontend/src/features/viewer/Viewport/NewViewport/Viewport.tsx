import ViewportOverlay from '@features/viewer/Viewport/ViewportOverlay/ViewportOverlay.tsx';
import {IStore} from "@/models";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import * as cornerstone from "@cornerstonejs/core"

type TViewportProps = {
    onClick: (idx: number) => void;
    selectedViewportId?: number | string | null;
    id: string;
};

const Viewport = ({ onClick, selectedViewportId, id }: TViewportProps) => {
    const topLeft = <div>Top Left Metadata</div>;
    const topRight = <div>Top Right Metadata</div>;
    const bottomRight = <div>Bottom Right Metadata</div>;
    const bottomLeft = <div>Bottom Left Metadata</div>;


    const { selectedSeriesInstanceUid} = useSelector((store: IStore) => store.viewer);
    const { renderingEngineId} = useSelector((store: IStore) => store.viewer);
    useEffect(() => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

        if (selectedViewportId === id) {
            const viewport = renderingEngine?.getViewport(selectedViewportId);
            // viewport.
            // get the viewport by id and set the seriesInstanceUid
        }
    }, [selectedSeriesInstanceUid]);


    return (
        <div
            id={id}
            onClick={() => onClick(1)}
            className={`h-full w-full relative bg-black ${selectedViewportId === id ? 'ring-2 ring-AAPrimary' : ''}`}
        >
            <ViewportOverlay
                topLeft={topLeft}
                topRight={topRight}
                bottomRight={bottomRight}
                bottomLeft={bottomLeft}
            />

            <div className={"flex text-4xl justify-center items-center h-full"}>
                {id}
            </div>
        </div>
    );
};

export default Viewport;
