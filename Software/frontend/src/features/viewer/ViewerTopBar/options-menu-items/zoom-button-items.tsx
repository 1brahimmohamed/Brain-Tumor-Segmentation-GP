import { FitScreen, RawOnOutlined } from '@mui/icons-material';
import store from '@/redux/store';
import { getRenderingEngine, Types } from '@cornerstonejs/core';
import { TViewerButtonItems } from '../../components/ViewerButtonMenu';

const zoom = (opertation: 'fit' | 'original') => {
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    // Zoom the viewport
    if (opertation === 'fit') {
        viewport.resetCamera(true, true);
    } else {
        viewport.setZoom(1);
    }

    viewport.render();
};

const ZoomItems: TViewerButtonItems[] = [
    {
        label: 'Fit to Screen',
        icon: <FitScreen />,
        onClick: () => zoom('fit')
    },
    {
        label: 'Original Resolution',
        icon: <RawOnOutlined />,
        onClick: () => zoom('original')
    }
];

export default ZoomItems;
