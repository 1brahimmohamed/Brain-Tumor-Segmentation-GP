import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerSegmentationReducer = {
    addSegmentation(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.segmentationItems.push(action.payload);
    },
    addSegmentationMapper(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.segmentationMap.push(action.payload.segmentationMaskData);
    }
};

export default viewerSegmentationReducer;
