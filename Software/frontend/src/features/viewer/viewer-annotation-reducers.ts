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

    toggleCine(state: IStoreViewerSlice) {

        if (!state.selectedViewportId) {
            return;
        }

        // if the current viewport has a cine player, remove it
        if (state.viewportsWithCinePlayer.includes(state.selectedViewportId)) {
            state.viewportsWithCinePlayer = state.viewportsWithCinePlayer.filter(
                (viewportId) => viewportId !== state.selectedViewportId
            );
        }
        // if the viewport does not have a cine player, add it
        else {
            state.viewportsWithCinePlayer.push(state.selectedViewportId);
        }
    }
};

export default viewerAnnotationReducer;
