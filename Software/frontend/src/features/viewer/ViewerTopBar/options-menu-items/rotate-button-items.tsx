import {
    Rotate90DegreesCcwOutlined,
    Rotate90DegreesCwOutlined,
    FlipOutlined,
    SyncDisabledOutlined
} from '@mui/icons-material';
import store from '@/redux/store';
import { Types, getRenderingEngine } from '@cornerstonejs/core';
import { TViewerButtonItems } from '@features/viewer/components/ViewerButtonMenu.tsx';

const flip = (flipDir: 'h' | 'v') => {
    // Get the rendering engine
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    // Flip the viewport
    if (flipDir === 'h') {
        viewport.flip({
            flipHorizontal: true
        });
    } else {
        viewport.flip({
            flipVertical: true
        });
    }

    viewport.render();
};

const rotate = (rotateDir: 'left' | 'right') => {
    // Get the rendering engine
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    const rotation = viewport.getRotation();

    // Rotate the viewport
    if (rotateDir === 'left') {
        viewport.setProperties({ rotation: rotation - 90 });
    } else {
        viewport.setProperties({ rotation: rotation + 90 });
    }

    viewport.render();
};

const resetFlipAndRotate = () => {
    // Get the rendering engine
    const { selectedViewportId, renderingEngineId } = store.getState().viewer;
    const renderingEngine = getRenderingEngine(renderingEngineId);

    if (!renderingEngine) return;

    // Get the  viewport
    const viewport: Types.IVolumeViewport = renderingEngine.getViewport(
        selectedViewportId
    ) as Types.IVolumeViewport;

    // Reset the viewport
    viewport.setCamera({ flipHorizontal: false, flipVertical: false });
    viewport.resetCamera(false, false, false, true);
    viewport.render();
};

const RotateButtonItems: TViewerButtonItems[] = [
    {
        label: 'Rotate Left',
        icon: <Rotate90DegreesCcwOutlined />,
        onClick: () => rotate('left')
    },
    {
        label: 'Rotate Right',
        icon: <Rotate90DegreesCwOutlined />,
        onClick: () => rotate('right'),
        divider: true
    },
    {
        label: 'Flip Horizontally',
        icon: <FlipOutlined />,
        onClick: () => flip('h')
    },
    {
        label: 'Flip Vertically',
        icon: <FlipOutlined className={'rotate-90'} />,
        onClick: () => flip('v'),
        divider: true
    },
    {
        label: 'Clear Transform',
        icon: <SyncDisabledOutlined />,
        onClick: resetFlipAndRotate
    }
];

export default RotateButtonItems;
