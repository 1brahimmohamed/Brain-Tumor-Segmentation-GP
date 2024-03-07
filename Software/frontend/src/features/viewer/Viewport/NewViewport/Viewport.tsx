import ViewportOverlay from '@features/viewer/Viewport/ViewportOverlay/ViewportOverlay.tsx';
import { IStore } from '@/models';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import { Types } from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import useResizeObserver from '@hooks/useResizeObserver.tsx';
import { DicomUtil } from '@/utilities';

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

        const updateViewport = async () => {
            if (selectedViewportId === id && selectedSeriesInstanceUid && renderingEngine) {
                console.log('Adding volume to viewport and rendering');
                const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
                    selectedViewportId
                ) as Types.IVolumeViewport;
                console.log('viewport', viewport);

                const volumeId = `cornerstoneStreamingImageVolume:${selectedSeriesInstanceUid}`;

                await viewport.setVolumes([{ volumeId }], true);

                const direction = viewport.getImageData()?.imageData.getDirection() as number[];
                console.log('eff dir', direction);

                const or = DicomUtil.detectImageOrientation(
                    direction ? direction.slice(0, 6) : [1, 0, 0, 0, 1, 0]
                );
                viewport.setOrientation(or);

                console.log('eff', or);

                viewport.render();
                dispatch(viewerSliceActions.removeClickedSeries());
            }
        };

        updateViewport();
    }, [selectedSeriesInstanceUid, selectedViewportId]);

    const viewportRef = useRef<HTMLDivElement>(null);

    const handleResize = (width: number, height: number) => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
        const viewport = renderingEngine?.getViewport(id) as Types.IVolumeViewport;

        if (viewport) {
            // console.log('viewport resized', id);
            viewport.resetCamera(true, true, true, true);
            viewport.render();
        }
    };

    useResizeObserver(viewportRef, handleResize);

    return (
        <div
            id={id}
            ref={viewportRef}
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
