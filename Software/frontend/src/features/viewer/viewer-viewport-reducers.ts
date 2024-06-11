import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerViewportReducer = {
    setCurrentStudy(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.currentStudyInstanceUid = action.payload;
    },
    setClickedSeries(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.selectedSeriesInstanceUid = action.payload;
    },
    removeClickedSeries(state: IStoreViewerSlice) {
        state.selectedSeriesInstanceUid = '';
    },

    setSelectedViewport(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.selectedViewportId = action.payload;
    },
    removeClickedViewport(state: IStoreViewerSlice) {
        state.selectedViewportId = '';
    },

    setStudyData(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.studyData = action.payload;
    }
};

export default viewerViewportReducer;
