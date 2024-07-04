import store from '@/redux/store';
import { getRenderingEngine, Types } from '@cornerstonejs/core';

export const refreshSelectedViewport = async () => {
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    if (!viewport) return;

    viewport.render();
};
