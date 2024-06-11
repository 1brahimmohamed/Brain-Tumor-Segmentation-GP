import { createImageIdsAndCacheMetaData, initCornerstone } from '@utilities/helpers/index';
import { useEffect, useState } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import { useSelector } from 'react-redux';
import ViewportsManager from '@features/viewer/Viewport/ViewportsManager.tsx';
import CornerstoneToolManager from '@/features/viewer/CornerstoneToolManager/CornerstoneToolManager';
import getMetadataByImageId from '@/utilities/wadoMetaDataProvider';
import store from '@/redux/store.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { IStore } from '@/models';

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
                wadoRsRoot: wadoRsRoot
            });

            // Uncomment the following line to see the metadata of the first image in the series
            // This will log the metadata of the first image in the series in case of adding the function to the provider
            // console.log(cornerstone.metaData.get('all', imageIds[0]));

            // Uncomment the following line to see the metadata of the first image in the series without the need for the provider
            const metaData = getMetadataByImageId('all', imageIds[0]);

            if (imageIds.length > 0 && metaData['Modality'].value != 'SEG') {
                // @TODO: Handle Stack of Images as well as volumes.
                return await cornerstone.volumeLoader.createAndCacheVolume(volumeId, {
                    imageIds
                });
            }
        })
    );

    return volumes.filter(Boolean); // Filter out any undefined values
};

const MainViewer = () => {
    const urlParams = new URLSearchParams(location.search);
    const studyInstanceUID = urlParams.get('StudyInstanceUID');
    store.dispatch(viewerSliceActions.setCurrentStudy(studyInstanceUID));

    // Initialize the state with a type of null or an array of strings
    const [volumes, setVolumes] = useState<any[]>([]);

    const currentStudyData = useSelector((state: any) => state.viewer.studyData);
    const { renderingEngineId } = useSelector((store: IStore) => store.viewer);

    useEffect(() => {
        const setupImageIdsAndVolumes = async () => {
            await initCornerstone(); // Initialize the cornerstone library
            new cornerstone.RenderingEngine(renderingEngineId); // Create a new rendering engine
            // console.log(currentStudyData);
            setVolumes(
                await createDicomVolumes(
                    studyInstanceUID,
                    currentStudyData?.map((series: any) => {
                        return series.seriesInstanceUid;
                    })
                )
            );

            CornerstoneToolManager.initCornerstoneAnnotationTool(); // Initialize the cornerstone annotation tool
            CornerstoneToolManager.initCornerstoneSegmentationTool();
            new CornerstoneToolManager('AnnotationTools', cornerstone.Enums.ViewportType.ORTHOGRAPHIC);
            CornerstoneToolManager.setCurrentToolGroupId('AnnotationTools');
        };
        setupImageIdsAndVolumes();
    }, [currentStudyData]);

    useEffect(() => {
        volumes.forEach((volume) => volume?.load());
    }, [volumes]);

    return <ViewportsManager />;
};

export default MainViewer;
