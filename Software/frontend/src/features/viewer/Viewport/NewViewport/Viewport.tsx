import * as cornerstone from '@cornerstonejs/core';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { Types } from '@cornerstonejs/core';
import { DicomUtil } from '@/utilities';
import { IStore } from '@/models';
import useResizeObserver from '@hooks/useResizeObserver.tsx';
import ViewportOverlay from '@features/viewer/Viewport/ViewportOverlay/ViewportOverlay.tsx';
import CinePlayer from '@features/viewer/Viewport/CinePlayer/CinePlayer.tsx';
import { detectCineHeight } from '@features/viewer/Viewport/CinePlayer/detectCineHeight';

type TViewportProps = {
    onClick?: (idx: string) => void;
    selectedViewportId?: number | string | null;
    id: string;
    ref?: HTMLDivElement | null;
    vNeighbours?: number;
    hNeighbours?: number;
};

const Viewport = ({ onClick, id, vNeighbours }: TViewportProps) => {
    const [currentImageId, setCurrentImageId] = useState<string>('');
    const [thisViewport, setThisViewport] = useState<Types.IVolumeViewport | null>(null);
    const [thisViewportImageIds, setThisViewportImageIds] = useState<string[]>([]);
    const [hasCinePlayer, setHasCinePlayer] = useState<boolean>(false);

    const viewportRef = useRef<HTMLDivElement>(null);
    const cineRef = useRef<HTMLDivElement>(null);
    const { selectedSeriesInstanceUid, selectedViewportId, renderingEngineId, viewportsWithCinePlayer } =
        useSelector((store: IStore) => store.viewer);

    const dispatch = useDispatch();

    // handleViewportClick is a function that takes an id and dispatches an action to the viewerSlice
    const handleViewportClick = (id: string) => {
        dispatch(viewerSliceActions.setSelectedViewport(id));
        if (onClick) {
            onClick(id);
        }
    };

    useEffect(() => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

        const updateViewport = async () => {
            if (selectedViewportId === id && selectedSeriesInstanceUid && renderingEngine) {
                const viewport: Types.IVolumeViewport = renderingEngine!.getViewport(
                    selectedViewportId
                ) as Types.IVolumeViewport;

                const volumeId = `cornerstoneStreamingImageVolume:${selectedSeriesInstanceUid}`;
                await viewport.setVolumes([{ volumeId }], true);

                const direction = viewport.getImageData()?.imageData.getDirection() as number[];
                const orientation = DicomUtil.detectImageOrientation(
                    direction ? direction.slice(0, 6) : [1, 0, 0, 0, 1, 0]
                );
                viewport.setOrientation(orientation);
                viewport.render();
                setThisViewport(viewport);
                setThisViewportImageIds(viewport.getImageIds());
                dispatch(viewerSliceActions.removeClickedSeries());
            }
        };

        updateViewport();
    }, [selectedSeriesInstanceUid, selectedViewportId]);

    useEffect(() => {
        if (thisViewport) {
            setCurrentImageId(thisViewportImageIds[thisViewport.getCurrentImageIdIndex()]);
        }
    }, [thisViewportImageIds]);

    // add event listener for slice scrolling
    useEffect(() => {
        const handleSliceScroll = () => {
            if (thisViewport) {
                setCurrentImageId(thisViewportImageIds[thisViewport.getCurrentImageIdIndex()]);
            }
        };

        viewportRef.current?.addEventListener('wheel', handleSliceScroll);

        return () => {
            viewportRef.current?.removeEventListener('wheel', handleSliceScroll);
        };
    }, []);

    useEffect(() => {
        if (viewportsWithCinePlayer.includes(id)) {
            setHasCinePlayer(true);
        } else {
            setHasCinePlayer(false);
        }
    }, [viewportsWithCinePlayer]);

    const handleResize = (_: number, __: number) => {
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
        const viewport = renderingEngine?.getViewport(id) as Types.IVolumeViewport;

        if (viewport) {
            viewport.resetCamera(true, true, true, true);
            renderingEngine?.resize(true, false);
        }
    };

    useResizeObserver(viewportRef, handleResize);

    const cineHeight = detectCineHeight(vNeighbours || 1);

    return (
        <div className={'flex-col'}>
            <div
                id={id}
                ref={viewportRef}
                onClick={() => handleViewportClick(id)}
                className={`${hasCinePlayer ? `${cineHeight[0]}` : 'h-full'} w-full relative bg-black ${selectedViewportId === id ? 'border-2 border-AAPrimary' : ''}`}
            >
                <ViewportOverlay viewport={thisViewport} currentImageId={currentImageId} />
            </div>
            {hasCinePlayer && (
                <div ref={cineRef} className={`${cineHeight[1]}`}>
                    <CinePlayer viewportElementRef={viewportRef} />
                </div>
            )}
        </div>
    );
};

export default Viewport;
