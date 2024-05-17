import { InvertColors as InvertTool, Sync as SyncTool } from '@mui/icons-material';
import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import store from '@/redux/store';
import { getRenderingEngine, Types } from '@cornerstonejs/core';

const invert = () => {
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    // Invert the viewport
    const { invert } = viewport.getProperties();
    viewport.setProperties({ invert: !invert });

    viewport.render();
};

const WindowItems: TViewerButtonItems[] = [
    {
        label: 'Invert',
        icon: <InvertTool />,
        onClick: invert
    },
    {
        label: 'Sync Window across viewports',
        icon: <SyncTool />
    }
];

export default WindowItems;
