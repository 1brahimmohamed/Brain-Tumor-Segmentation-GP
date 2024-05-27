import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice, ILayout } from '@/models';

const viewerUiReducer = {
    changeViewerLayout: (state: IStoreViewerSlice, action: PayloadAction<ILayout>) => {
        state.layout = action.payload;
    },
    toggleFullScreen: (state: IStoreViewerSlice) => {
        state.isFullScreen = !state.isFullScreen;
    },
    toggleStudiesPanel: (state: IStoreViewerSlice) => {
        state.isStudiesPanelOpen = !state.isStudiesPanelOpen;
    },
    toggleLeftPanel: (state: IStoreViewerSlice) => {
        state.isRightPanelOpen = !state.isRightPanelOpen;
    },
    toggleInfoOnViewports: (state: IStoreViewerSlice) => {
        state.isInfoOnViewportsShown = !state.isInfoOnViewportsShown;
    }
};

export default viewerUiReducer;
