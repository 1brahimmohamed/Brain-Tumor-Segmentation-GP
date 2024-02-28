import Viewport from './Viewport/Viewport';
import { createImageIdsAndCacheMetaData, initCornerstone } from '@utilities/helpers/index';
import { useEffect, useState } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import { useSelector, useDispatch } from 'react-redux';
import { removeClickedViewport, removeClickedSeries } from './Viewport/viewports-slice';

// Initialize the rendering engine
const renderingEngineId = 'myRenderingEngine';
const wadoRsRoot = 'http://localhost:8042/dicom-web';

// Function to create and return volume
const createDicomVolumes = async (studyInstanceUID: string | null, seriesInstanceUIDs: string[]) => {
    // Initialize the cornerstone library
    const volumes = await Promise.all(
        seriesInstanceUIDs.map(async (seriesInstanceUID) => {
            const volumeId = `cornerstoneStreamingImageVolume:${seriesInstanceUID}`;
            const imageIds = await createImageIdsAndCacheMetaData({
                StudyInstanceUID: studyInstanceUID,
                SeriesInstanceUID: seriesInstanceUID,
                wadoRsRoot: wadoRsRoot,
            });
            console.log(imageIds);
            if (imageIds.length > 0) {
                // @TODO: Add less than 6 instances handling
                return await cornerstone.volumeLoader.createAndCacheVolume(volumeId, { imageIds });
            }
        })
    );

    return volumes.filter(Boolean); // Filter out any undefined values
};

const MainViewer = () => {
    const urlParams = new URLSearchParams(location.search);
    const studyInstanceUID = urlParams.get('StudyInstanceUID');
    const dispatch = useDispatch();

    // Initialize the state with a type of null or an array of strings
    const [renderingEngine, setRenderingEngine] = useState<cornerstone.RenderingEngine | null>(null);
    const [volumes, setVolumes] = useState<any[]>([]);

    // Select the current states from the Redux state
    const viewports = useSelector((state: any) => state.viewports.viewports);
    const clickedSeriesId = useSelector((state: any) => state.viewports.clickedSeriesInstanceUid);
    const clickedViewportId = useSelector((state: any) => state.viewports.clickedViewportId);
    const currentStudyData = useSelector((state: any) => state.viewports.studyData);

    useEffect(() => {
        const setupImageIdsAndVolumes = async () => {
            await initCornerstone(); // Initialize the cornerstone library
            setRenderingEngine(new cornerstone.RenderingEngine(renderingEngineId));
            setVolumes(
                await createDicomVolumes(
                    studyInstanceUID,
                    currentStudyData.map((series: any) => {
                        console.log(series.seriesInstanceUid);
                        return series.seriesInstanceUid;
                    })
                )
            );
        };
        setupImageIdsAndVolumes();
    }, [currentStudyData]);

    useEffect(() => {
        volumes.forEach((volume) => volume?.load());
    }, [volumes]);

    useEffect(() => {
        if (renderingEngine && clickedViewportId && clickedSeriesId) {
            renderingEngine?.setViewports(viewports);

            setVolumeToViewport(clickedViewportId, clickedSeriesId);
            dispatch(removeClickedViewport());
            dispatch(removeClickedSeries());

            console.log('Setting volume to viewport');
        }
    }, [renderingEngine, clickedViewportId, clickedSeriesId, volumes]); // Dependencies array ensures this effect runs when these variables change

    const setVolumeToViewport = (viewportId: string, seriesInstanceUID: string) => {
        if (renderingEngine && viewports.length > 0) {
            const volumeId = `cornerstoneStreamingImageVolume:${seriesInstanceUID}`;
            cornerstone.setVolumesForViewports(renderingEngine, [{ volumeId }], [viewportId]);
            renderingEngine.render();
        }
    };

    return (
        <div className={'w-full'}>
            {/* Viewport */}
            <Viewport />
        </div>
    );
};

export default MainViewer;
