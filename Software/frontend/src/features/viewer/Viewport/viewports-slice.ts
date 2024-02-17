import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IViewportConfig, IViewportSliceState } from '@models/viewer';

// Set the initial state
const initialState: IViewportSliceState = {
    viewports: [],
    clickedViewportId: null,
    clickedSeriesInstanceUid: null,
    studyData: null,
};

const viewportsSlice = createSlice({
    name: 'viewports',
    initialState,
    reducers: {
        // Action to add a new viewport configuration
        addViewport(state, action: PayloadAction<IViewportConfig>) {
            state.viewports.push(action.payload);
        },
        // Action to update an existing viewport configuration by viewportId
        updateViewport(state, action: PayloadAction<IViewportConfig>) {
            const index = state.viewports.findIndex((vp) => vp.viewportId === action.payload.viewportId);
            if (index !== -1) {
                state.viewports[index] = action.payload;
            }
        },
        // Action to remove a viewport configuration by viewportId
        removeViewport(state, action: PayloadAction<string>) {
            state.viewports = state.viewports.filter((vp) => vp.viewportId !== action.payload);
        },

        setClickedSeries(state, action: PayloadAction<string | null>) {
            state.clickedSeriesInstanceUid = action.payload;
        },
        removeClickedSeries(state) {
            state.clickedSeriesInstanceUid = null;
        },

        setClickedViewport(state, action: PayloadAction<string | null>) {
            state.clickedViewportId = action.payload;
        },
        removeClickedViewport(state) {
            state.clickedViewportId = null;
        },

        setStudyData(state, action: PayloadAction<any>) {
            state.studyData = action.payload;
        },
    },
});

export const {
    addViewport,
    updateViewport,
    removeViewport,
    setClickedSeries,
    removeClickedSeries,
    setClickedViewport,
    removeClickedViewport,
    setStudyData,
} = viewportsSlice.actions;

export default viewportsSlice;
