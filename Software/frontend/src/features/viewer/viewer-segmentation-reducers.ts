import { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';
import { ISegmentation } from '@models/viewer.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import store from '@/redux/store.ts';
import { viewerSliceActions } from './viewer-slice';


const segmentationAdditionMapper = (segmentationData: { id: string; volumeId: string; uid: string }) => {
    return {
        id: segmentationData.id,
        uid: segmentationData.uid,
        volumeId: segmentationData.volumeId,
        activeSegmentIndex: 1,
        isActive: true,
        label: segmentationData.id,
        isVisible: true,
        type: 'LABELMAP',
        segments: []
    } as ISegmentation;
};

const viewerSegmentationReducer = {
    addSegmentation(
        state: IStoreViewerSlice,
        action: PayloadAction<{ id: string; volumeId: string; uid: string }>
    ) {
        // check if the segmentation already exists
        const segmentationIndex = state.segmentations.findIndex(
            (segmentation) => segmentation.id === action.payload.id
        );

        for (const segmentation of state.segmentations) {
            segmentation.isActive = false;
        }

        if (segmentationIndex !== -1) {
            return;
        }
        const segmentation = segmentationAdditionMapper(action.payload);
        state.segmentations.push(segmentation);
    },

    removeSegmentationbyId(state: IStoreViewerSlice, action: PayloadAction<string>) {
        const segmentationIndex = state.segmentations.findIndex(
            (segmentation) => segmentation.id === action.payload
        );

        if (segmentationIndex !== -1 && state.segmentations.length > 1) {
            // Remove the segmentation at the specified index
            state.segmentations.splice(segmentationIndex, 1);
        } else {
            throw new Error('Cannot remove the last segmentation');
        }
    },

    addSegment(
        state: IStoreViewerSlice,
        action: PayloadAction<{ segmentationId: string; numberOfSegments: number }>
    ) {
        return {
            ...state,
            segmentations: state.segmentations.map((segmentation) => {
                if (segmentation.id === action.payload.segmentationId) {
                    const updatedSegments = segmentation.segments.map((segment) => ({
                        ...segment,
                        isActive: false
                    }));

                    const segmentsToAdd = [];
                    for (
                        let i = segmentation.segments.length + 1;
                        i < action.payload.numberOfSegments + segmentation.segments.length + 1;
                        i++
                    ) {
                        segmentsToAdd.push({
                            opacity: 255,
                            isActive:
                                i === action.payload.numberOfSegments + segmentation.segments.length + 1,
                            segmentIndex: i,
                            color: cornerstoneTools.segmentation.config.color.getColorForSegmentIndex(
                                state.currentToolGroupId,
                                segmentation.uid,
                                i
                            ),
                            label: `Segment ${i}`,
                            isVisible: true,
                            isLocked: false
                        });
                    }

                    return {
                        ...segmentation,
                        activeSegmentIndex: segmentation.segments.length + action.payload.numberOfSegments,
                        segments: [...updatedSegments, ...segmentsToAdd]
                    };
                }
                return segmentation;
            })
        };
    },

    removeSegment(
        state: IStoreViewerSlice,
        action: PayloadAction<{ segmentationId: string; segmentIndex: number }>
    ) {
        return {
            ...state,
            segmentations: state.segmentations.map((segmentation) => {
                if (segmentation.id === action.payload.segmentationId) {
                    const updatedSegments = segmentation.segments.slice(0, -1);
                    const updatedActiveSegmentIndex =
                        segmentation.activeSegmentIndex === action.payload.segmentIndex
                            ? 0
                            : segmentation.activeSegmentIndex;
                    return {
                        ...segmentation,
                        segments: updatedSegments,
                        activeSegmentIndex: updatedActiveSegmentIndex
                    };
                }
                return segmentation;
            })
        };
    },

    handleSegmentClick(
        state: IStoreViewerSlice,
        action: PayloadAction<{ segmentationId: string; segmentIndex: number }>
    ) {
        cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
            action.payload.segmentationId,
            action.payload.segmentIndex
        );

        return {
            ...state,
            segmentations: state.segmentations.map((segmentation) => {
                if (segmentation.id === action.payload.segmentationId) {
                    return {
                        ...segmentation,
                        segments: segmentation.segments.map((segment, index) => ({
                            ...segment,
                            isActive: index === action.payload.segmentIndex - 1
                        }))
                    };
                }
                return segmentation;
            })
        };
    },

    onSegmentationClick(state: IStoreViewerSlice, action: PayloadAction<{ segmentationId: string }>) {
        cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
            state.currentToolGroupId,
            state.segmentations.find((segmentation) => segmentation.id === action.payload.segmentationId).uid
        );

        return {
            ...state,
            segmentations: state.segmentations.map((segmentation) => {
                if (segmentation.id === action.payload.segmentationId) {
                    return {
                        ...segmentation,
                        isActive: true
                    };
                }
                return {
                    ...segmentation,
                    isActive: false
                };
            })
        };
    },

    handleSegmentationVisibility(
        state: IStoreViewerSlice,
        action: PayloadAction<{ segmentationId: string }>
    ) {
        const renderingEngine = cornerstone.getRenderingEngine(state.renderingEngineId);
        const viewport = renderingEngine?.getViewport(
            state.selectedViewportId
        ) as cornerstone.Types.IVolumeViewport;

        const segmentation = state.segmentations.find(
            (segmentation) => segmentation.id === action.payload.segmentationId
        );

        if (!segmentation) return;

        cornerstoneTools.segmentation.config.visibility.setSegmentationVisibility(
            state.currentToolGroupId,
            segmentation.uid,
            !segmentation.isVisible
        );

        viewport.render();

        return {
            ...state,
            segmentations: state.segmentations.map((segmentation) => {
                if (segmentation.id === action.payload.segmentationId) {
                    return {
                        ...segmentation,
                        isVisible: !segmentation.isVisible
                    };
                }
                return segmentation;
            })
        };
    }
};

// Thunk to remove segmentation from the state and update the active segmentation
export const removeSegmentationAndUpdateActiveSegmentation =
    (segmentationId: string) => (dispatch: Dispatch) => {
        const segmentations = store.getState().viewer.segmentations; // Adjust according to your state structure

        const segmentationIndex = segmentations.findIndex(
            (segmentation) => segmentation.id === segmentationId
        );

        if (segmentationIndex === -1) {
            return;
        }

        if (segmentations.length > 1) {
            // Determine the nearest index to activate
            let newActiveSegmentationIndex;
            if (segmentationIndex > 0) {
                // Prefer the one behind the deleted index
                newActiveSegmentationIndex = segmentationIndex - 1;
            } else {
                // If it was the first element, activate the new first element
                newActiveSegmentationIndex = 0;
            }

            const newActiveSegmentationId = segmentations[newActiveSegmentationIndex].id;
            console.log('New Active Segmentation:', newActiveSegmentationId);
            dispatch(viewerSliceActions.onSegmentationClick({ segmentationId: newActiveSegmentationId }));
            dispatch(viewerSliceActions.removeSegmentationbyId(segmentationId));
        } else {
            throw new Error('Cannot remove this segmentation');
        }
    };


export default viewerSegmentationReducer;
