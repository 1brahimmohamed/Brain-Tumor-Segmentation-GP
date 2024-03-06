import ViewportOverlay from '@features/viewer/Viewport/ViewportOverlay/ViewportOverlay.tsx';
import { IStore } from '@/models';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import { Types } from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';

type TViewportProps = {
    onClick: (idx: number) => void;
    selectedViewportId?: number | string | null;
    id: string;
    ref?: HTMLDivElement | null;
};

const Viewport = ({ onClick, selectedViewportId, id }: TViewportProps) => {
    const topLeft = <div>Top Left Metadata</div>;
    const topRight = <div>Top Right Metadata</div>;
    const bottomRight = <div>Bottom Right Metadata</div>;
    const bottomLeft = <div>Bottom Left Metadata</div>;

    const { selectedSeriesInstanceUid } = useSelector((store: IStore) => store.viewer);
    const { renderingEngineId } = useSelector((store: IStore) => store.viewer);
    const dispatch = useDispatch();

    useEffect(() => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

        if (selectedViewportId === id && selectedSeriesInstanceUid && renderingEngine) {
            console.log('Adding volume to viewport and rendering');
            const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
                selectedViewportId
            ) as Types.IVolumeViewport;

            const volumeId = `cornerstoneStreamingImageVolume:${selectedSeriesInstanceUid}`;
            viewport.setVolumes([{ volumeId }], true);

            // This is the method of setting the OrientationAxis based on the metaData
            viewport.setOrientation(cornerstone.Enums.OrientationAxis.ACQUISITION);

            viewport.render();

            dispatch(viewerSliceActions.removeClickedSeries());
        }
    }, [selectedSeriesInstanceUid, selectedViewportId]);

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

            {/* <div className={'flex text-4xl justify-center items-center h-full'}>{id}</div> */}
        </div>
    );
};

export default Viewport;
