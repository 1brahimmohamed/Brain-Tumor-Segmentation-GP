import { initCornerstone } from '@utilities/helpers/index';
import { useEffect } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import { useSelector } from 'react-redux';
import ViewportsManager from '@features/viewer/Viewport/ViewportsManager.tsx';
import CornerstoneToolManager from '@/features/viewer/CornerstoneToolManager/CornerstoneToolManager';
import store from '@/redux/store.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { IStore } from '@/models';

const MainViewer = () => {
    const urlParams = new URLSearchParams(location.search);

    // Get the StudyInstanceUID from the URL and store it in the redux store
    const studyInstanceUID = urlParams.get('StudyInstanceUID');
    store.dispatch(viewerSliceActions.setCurrentStudy(studyInstanceUID));

    const currentStudyData = useSelector((state: any) => state.viewer.studyData);
    const { renderingEngineId } = useSelector((store: IStore) => store.viewer);

    useEffect(() => {
        const setupImageIdsAndVolumes = async () => {
            // Initialize the cornerstone library
            await initCornerstone();

            // Create a new rendering engine
            new cornerstone.RenderingEngine(renderingEngineId);

            // Initialize cornerstone tools
            CornerstoneToolManager.initCornerstoneAnnotationTool();
            CornerstoneToolManager.initCornerstoneSegmentationTool();

            // Set the current tool group id and viewport type
            new CornerstoneToolManager('CornerstoneTools', cornerstone.Enums.ViewportType.ORTHOGRAPHIC);
            CornerstoneToolManager.setCurrentToolGroupId('CornerstoneTools');
        };
        setupImageIdsAndVolumes();
    }, [currentStudyData]);

    return <ViewportsManager />;
};

export default MainViewer;
