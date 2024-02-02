import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    leftMouseTool: "WindowLevel",
    prevLeftMouseTool: null,

    rightMouseTool: "Zoom",
    prevRightMouseTool: null,

    mouseWheelTool: "Pan",
    prevMouseWheelTool: null,

    isFullScreen: false,
    layout: "1x1",
    thumbnail: "left",
    isInfoShow: true,

    isSegmentationTabOpen: false
}

const viewerpageSlice = createSlice({
    name: 'viewerpage',
    initialState,
    reducers: {
        setRightMouseTool(state, action){
            state.prevRightMouseTool = state.rightMouseTool
            state.rightMouseTool = action.payload
        },
        setLeftMouseTool(state, action){
            state.prevLeftMouseTool = state.leftMouseTool
            state.leftMouseTool = action.payload
        },
        setMouseWheelTool(state, action){
            state.prevLeftMouseTool = state.mouseWheelTool
            state.mouseWheelTool = action.payload
        },
        setViewerLayout(state, action){

        },
        setThumbnailsLayout(state, action){

        },
        toggleFullScreen(state, action){

        },
        toggleInfo(state, action){
            state.isInfoShow = !state.isInfoShow
        },
        reset(state, action){
            state = initialState
        },
        toggleSegmentationTab(state, action){
            state.isSegmentationTabOpen = !state.isSegmentationTabOpen
        }
    }
})


export default viewerpageSlice.reducer;

export const {
    setRightMouseTool,
    setLeftMouseTool,
    setMouseWheelTool,
    setViewerLayout,
    setThumbnailsLayout,
    toggleFullScreen,
    toggleInfo,
    reset,
    toggleSegmentationTab
} = viewerpageSlice.actions;


