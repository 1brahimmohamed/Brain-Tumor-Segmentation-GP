import { createSlice } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@models/store.ts';
import viewerUiReducer from '@features/viewer/viewer-ui-reducers.ts';
import viewerViewportReducer from '@features/viewer/viewer-viewport-reducers.ts';

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

    // tools
    rightMouseTool: 'zoom',
    leftMouseTool: 'wwwc',
    middleMouseTool: 'pan',
    mouseWheelTool: 'stackScroll',

    // viewport
    viewports: [],
    renderingEngineId: 'myRenderingEngine',
    selectedViewportId: '',
    selectedSeriesInstanceUid: '',
    studyData: null
};

const viewportsSlice = createSlice({
    name: 'viewer',
    initialState,
    reducers: {
        ...viewerUiReducer,
        ...viewerViewportReducer
    }
});

export const viewerSliceActions = viewportsSlice.actions;

export default viewportsSlice;
