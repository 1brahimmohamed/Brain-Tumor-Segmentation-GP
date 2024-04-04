import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerSegmentationReducer = {
    addSegmentation(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.segmentationItems.push(action.payload);
    },
    addSegmentationUID(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.segmentationUIDs.push(action.payload);
    }
};

export default viewerSegmentationReducer;
