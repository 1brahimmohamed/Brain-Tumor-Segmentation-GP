import store from '@/redux/store.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';

export const toggleFullScreen = () => {
    const state = store.getState();
    const { isFullScreen } = state.viewer;
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
