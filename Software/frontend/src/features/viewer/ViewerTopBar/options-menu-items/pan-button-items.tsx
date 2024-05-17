import {
    AlignHorizontalCenter as AlignCenter,
    AlignHorizontalLeft as AlignLeft,
    AlignHorizontalRight as AlignRight
} from '@mui/icons-material';
import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import store from '@/redux/store.ts';
import { getRenderingEngine, Types } from '@cornerstonejs/core';

const align = (alignDir: 'l' | 'r' | 'c') => {
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    // Invert the viewport
    if (alignDir === 'l') {
        viewport.setDisplayArea({
            imageCanvasPoint: {
                imagePoint: [0, 0.5], // imageX, imageY
                canvasPoint: [0, 0.5] // canvasX, canvasY
            }
        });
    } else if (alignDir === 'r') {
        viewport.setDisplayArea({
            imageCanvasPoint: {
                imagePoint: [1, 0.5], // imageX, imageY
                canvasPoint: [1, 0.5] // canvasX, canvasY
            }
        });
    } else {
        viewport.setDisplayArea({
            imageCanvasPoint: {
                imagePoint: [0.5, 0.5], // imageX, imageY
                canvasPoint: [0.5, 0.5] // canvasX, canvasY
            }
        });
    }

    viewport.render();
};

const PanButtonItems: TViewerButtonItems[] = [
    {
        icon: <AlignRight />,
        label: 'Align Right',
        onClick: () => align('r')
    },
    {
        icon: <AlignLeft />,
        label: 'Align Left',
        onClick: () => align('l')
    },
    {
        icon: <AlignCenter />,
        label: 'Align Center',
        onClick: () => align('c')
    }
];

export default PanButtonItems;
