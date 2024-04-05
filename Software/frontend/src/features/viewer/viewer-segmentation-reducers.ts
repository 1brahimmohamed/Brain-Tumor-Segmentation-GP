import {PayloadAction} from '@reduxjs/toolkit';
import {IStoreViewerSlice} from '@/models';
import {ISegmentation} from "@models/viewer.ts";

const viewerSegmentationReducer = {
    addSegmentation(state: IStoreViewerSlice, action: PayloadAction<ISegmentation>) {
        // check if the segmentation already exists
        const segmentationIndex = state.segmentation.segmentations.findIndex(
            (segmentation) => segmentation.id === action.payload.id
        );

        if (segmentationIndex !== -1) {
            return;
        }

        state.segmentation.segmentations.push(action.payload);
        state.segmentation.currentSegmentationId = action.payload.id;
    },

    removeSegmentation(state: IStoreViewerSlice, action: PayloadAction<string>) {
        const segmentationIndex = state.segmentation.segmentations.findIndex(
            (segmentation) => segmentation.id === action.payload
        );

        if (segmentationIndex === -1) {
            return;
        }

        state.segmentation.segmentations.splice(segmentationIndex, 1);
    },

    setCurrentSegmentationId(state: IStoreViewerSlice, action: PayloadAction<string | null>) {
        state.segmentation.currentSegmentationId = action.payload;
    },


    addSegment(state: IStoreViewerSlice, action: PayloadAction<string>) {

        // check if the segmentation exists
        const segmentation = state.segmentation.segmentations.find(
            (segmentation) => segmentation.id === action.payload
        );

        if (!segmentation) {
            return;
        }

        segmentation.segmentsCount++;
        segmentation.activeSegment = segmentation.segmentsCount;
    },

    removeSegment(state: IStoreViewerSlice, action: PayloadAction<{ segmentationId: string; segmentIndex: number; }>) {
        // check if the segmentation exists
        const segmentation = state.segmentation.segmentations.find(
            (segmentation) => segmentation.id === action.payload.segmentationId
        );

        if (!segmentation) {
            return;
        }

        if (segmentation.segmentsCount === 0) {
            return;
        }

        segmentation.segmentsCount -= 1;
        if (segmentation.activeSegment === action.payload.segmentIndex) {
            segmentation.activeSegment = 0;
        }

    },

    setCurrentSegmentIndex(state: IStoreViewerSlice, action: PayloadAction<{
        segmentationId: string;
        segmentIndex: number;
    }>) {
        // check if the segmentation exists
        const segmentation = state.segmentation.segmentations.find(
            (segmentation) => segmentation.id === action.payload.segmentationId
        );

        if (!segmentation) {
            return;
        }

        if (segmentation.segmentsCount === 0) {
            return;
        }

        segmentation.activeSegment = action.payload.segmentIndex;
    },
};

export default viewerSegmentationReducer;
