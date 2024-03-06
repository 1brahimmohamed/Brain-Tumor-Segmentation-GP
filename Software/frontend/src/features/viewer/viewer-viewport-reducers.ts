import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerViewportReducer = {
    setClickedSeries(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.selectedSeriesInstanceUid = action.payload;
    },
    removeClickedSeries(state: IStoreViewerSlice) {
        state.selectedSeriesInstanceUid = '';
    },

    setClickedViewport(state: IStoreViewerSlice, action: PayloadAction<string>) {
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
