import { createSlice } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@models/store.ts';
import viewerUiReducer from '@features/viewer/viewer-ui-reducers.ts';
import viewerViewportReducer from '@features/viewer/viewer-viewport-reducers.ts';
import viewerAnnotationReducer from './viewer-annotation-reducers';
import viewerSegmentationReducer from './viewer-segmentation-reducers';

const initialState: IStoreViewerSlice = {
    // ui
    isFullScreen: false,
    layout: {
        numRows: 1,
        numCols: 1
    },
    isRightPanelOpen: true,
    isStudiesPanelOpen: false,
    isInfoOnViewportsShown: true,

    // viewport
    viewports: [],
    renderingEngineId: 'myRenderingEngine',
    selectedViewportId: '',
    selectedSeriesInstanceUid: '',
    studyData: null,
    annotationToolGroupIds: [],
    currentToolGroupId: '',
    currentStudyInstanceUid: '',
    selectedCornerstoneTools: [],
    viewportsWithCinePlayer: [],
    segmentations: [],
    selectedStudyReports: []
};

const viewportsSlice = createSlice({
    name: 'viewer',
    initialState,
    reducers: {
        ...viewerUiReducer,
        ...viewerViewportReducer,
        ...viewerAnnotationReducer,
        ...viewerSegmentationReducer
    }
});

export const viewerSliceActions = viewportsSlice.actions;

export default viewportsSlice;
