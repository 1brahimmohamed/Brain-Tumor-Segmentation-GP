import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';

const viewerAnnotationReducer = {
    setSelectedAnnotationTool(
        state: IStoreViewerSlice,
        action: PayloadAction<{ toolName: string; mouseBinding: number }>
    ) {
        if (state.selectedCornerstoneTools.length === 0) {
            state.selectedCornerstoneTools.push(action.payload);
            return;
        }

        const updatedTools = state.selectedCornerstoneTools.filter(
            (tool) => tool.toolName !== action.payload.toolName
        );

        const mouseBindingIndex = updatedTools.findIndex(
            (tool) => tool.mouseBinding === action.payload.mouseBinding
        );

        if (mouseBindingIndex !== -1) {
            updatedTools[mouseBindingIndex] = action.payload; // Update the existing tool with the same mouseBinding
        } else {
            updatedTools.push(action.payload); // Add the new tool if no matching mouseBinding found
        }

        state.selectedCornerstoneTools = updatedTools;
    },

    addAnnotationToolGroupId(
        state: IStoreViewerSlice,
        action: PayloadAction<{ annotationToolGroupId: string }>
    ) {
        state.annotationToolGroupIds.push(action.payload.annotationToolGroupId);
    },

    setCurrentToolGroupId(state: IStoreViewerSlice, action: PayloadAction<{ currentToolGroupId: string }>) {
        state.currentToolGroupId = action.payload.currentToolGroupId;
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
