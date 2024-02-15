import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the viewport configuration
interface ViewportConfig {
    viewportId: string;
    type: string; // Assuming this is a string, adjust the type as necessary
    element: any; // This could be a reference type
    defaultOptions?: {
        orientation: string; // Adjust the type as necessary
    };
}

// Define the initial state type
interface ViewportSliceState {
    viewports: ViewportConfig[];
    clickedViewportId: string | null;
    clickedSeriesInstanceUid: string | null;
    studyData: any;
}

// Set the initial state
const initialState: ViewportSliceState = {
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
        addViewport(state, action: PayloadAction<ViewportConfig>) {
            state.viewports.push(action.payload);
        },
        // Action to update an existing viewport configuration by viewportId
        updateViewport(state, action: PayloadAction<ViewportConfig>) {
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
