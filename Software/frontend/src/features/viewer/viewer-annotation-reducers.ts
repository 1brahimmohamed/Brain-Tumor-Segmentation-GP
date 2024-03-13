import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerAnnotationReducer = {
    setSelectedAnnotationTool(
        state: IStoreViewerSlice,
        action: PayloadAction<{ toolName: string; mouseBinding: number }>
    ) {
        if (state.selectedAnnotationTools.length === 0) {
            state.selectedAnnotationTools.push(action.payload);
        }

        const toolIndex = state.selectedAnnotationTools.findIndex(
            (tool) => tool.mouseBinding === action.payload.mouseBinding
        );

        if (toolIndex !== -1) {
            state.selectedAnnotationTools[toolIndex] = action.payload;
        } else {
            state.selectedAnnotationTools.push(action.payload);
        }
    },

    addAnnotationToolGroupId(state: IStoreViewerSlice, action: PayloadAction<{ annotationToolGroupId: string }>) {
        state.annotationToolGroupIds.push(action.payload.annotationToolGroupId);
    },

    setCurrentAnnotationToolGroupId(state: IStoreViewerSlice, action: PayloadAction<{ currentAnnotationToolGroupId: string }>) {
        state.currentAnnotationToolGroupId = action.payload.currentAnnotationToolGroupId;
    },

};

export default viewerAnnotationReducer;
