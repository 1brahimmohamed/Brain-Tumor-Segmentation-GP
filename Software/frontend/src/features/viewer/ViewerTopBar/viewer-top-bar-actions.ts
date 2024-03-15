import store from '@/redux/store.ts';
import {viewerSliceActions} from '@features/viewer/viewer-slice.ts';
import AnnotationTools, {ANNOTATION_TOOLS} from "@features/viewer/AnnotationTool/AnnotationTools.ts";

export const toggleFullScreen = () => {
    const state = store.getState();
    const {isFullScreen} = state.viewer;
    const elem = document.getElementById('root') as HTMLElement & {
        exitFullscreen(): Promise<void>;
        requestFullscreen(): Promise<void>;
    };

    if (isFullScreen) {
        document.exitFullscreen().then(() => {
            store.dispatch(viewerSliceActions.toggleFullScreen());
        });
    } else {
        elem!.requestFullscreen().then(() => {
            store.dispatch(viewerSliceActions.toggleFullScreen());
        });
    }
};

export const toggleViewportOverlayShown = () => {
    store.dispatch(viewerSliceActions.toggleInfoOnViewports());
};


export const handleToolClick = (toolName: string, mouseEvent: any) => {

    let clickedMouseButton = 1;
    console.log('handleToolClick', toolName, mouseEvent.button)

    switch (mouseEvent.button) {
        case 0:
            clickedMouseButton = 1;
            break;
        case 1:
            clickedMouseButton = 4;
            break;
        case 2:
            clickedMouseButton = 2;
            break;
        default:
            return;
    }

    switch (toolName) {
        case ANNOTATION_TOOLS['Window'].toolName:
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Window'].toolName, clickedMouseButton);
            break;
        case ANNOTATION_TOOLS['Zoom'].toolName:
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Zoom'].toolName, clickedMouseButton);
            break;
        case ANNOTATION_TOOLS['Pan'].toolName:
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Pan'].toolName, clickedMouseButton);
            break;
        case 'Measurements':
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Length'].toolName, clickedMouseButton);
            break;
        case 'Rotate':
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Planar Rotate'].toolName, clickedMouseButton);
            break;
        case 'Magnify':
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Magnify'].toolName, clickedMouseButton);
            break;
        case 'Scroll':
            AnnotationTools.setToolActive(ANNOTATION_TOOLS['Stack Scroll'].toolName, clickedMouseButton);
            break;
        case 'Cine':
            store.dispatch(viewerSliceActions.toggleCine());
    }
}

