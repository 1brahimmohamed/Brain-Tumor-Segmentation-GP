import { faEraser, faPaintBrush, faShapes } from '@fortawesome/free-solid-svg-icons';
import { CornerstoneToolManager, SEGMENTATION_TOOLS } from '@features/viewer/CornerstoneToolManager';
import * as cornerstoneTools from '@cornerstonejs/tools';
import store from '@/redux/store.ts';
import { TItem } from '@ui/library/AdvancedToolBox/AdvancedToolBox.tsx';
import { viewerSliceActions } from '../viewer-slice';

const { utilities: cstUtils } = cornerstoneTools;

const { segmentation: segmentationUtils } = cstUtils;

// ---------------------- Toolbox Functions ---------------------- //
const handleToolChange = async (tool: string) => {
    // get cornerstone segmentations
    const segmentations = cornerstoneTools.segmentation.state.getSegmentations();

    if (!segmentations || segmentations.length === 0) {
        await CornerstoneToolManager.addSegmentation();
        CornerstoneToolManager.addSegmentToSegmentation();
    }

    switch (tool) {
        case 'Brush':
            CornerstoneToolManager.setToolActive('CircularBrush', 1);
            break;
        case 'Eraser':
            CornerstoneToolManager.setToolActive('CircularEraser', 1);
            break;
        case 'Shapes':
            CornerstoneToolManager.setToolActive(SEGMENTATION_TOOLS['CircleScissors'].toolName, 1);
            break;
    }
};

const handleSegModeChange = (mode: string) => {
    switch (mode) {
        case 'Circle':
            CornerstoneToolManager.setToolActive('CircularBrush', 1);
            break;
        case 'Sphere':
            CornerstoneToolManager.setToolActive('SphereBrush', 1);
            break;
    }
};

const handleEraserModeChange = (mode: string) => {
    switch (mode) {
        case 'Circle':
            CornerstoneToolManager.setToolActive('CircularEraser', 1);
            break;
        case 'Sphere':
            CornerstoneToolManager.setToolActive('SphereEraser', 1);
            break;
    }
};

const handleShapeChange = (mode: string) => {
    switch (mode) {
        case 'Circle':
            CornerstoneToolManager.setToolActive(SEGMENTATION_TOOLS['CircleScissors'].toolName, 1);
            break;
        case 'Sphere':
            CornerstoneToolManager.setToolActive(SEGMENTATION_TOOLS['SphereScissors'].toolName, 1);
            break;
        case 'Rectangle':
            CornerstoneToolManager.setToolActive(SEGMENTATION_TOOLS['RectangleScissors'].toolName, 1);
    }
};

const handleBrushSizeChange = (size: number) => {
    segmentationUtils.setBrushSizeForToolGroup(store.getState().viewer.currentToolGroupId, size);
};

const advancedToolConfig: TItem[] = [
    {
        name: 'Brush',
        icon: faPaintBrush,
        active: true,
        options: [
            {
                id: 'brush',
                name: 'Radius (mm)',
                type: 'range',
                min: 1,
                max: 10,
                value: 5,
                step: 1,
                onChange: (num: number | string) => handleBrushSizeChange(num as number)
            },
            {
                name: 'Mode',
                type: 'radio',
                value: 'Circle',
                onChange: (mode: number | string) => handleSegModeChange(mode as string),
                values: [
                    {
                        value: 'Circle',
                        label: 'Circle'
                    },
                    {
                        value: 'Sphere',
                        label: 'Sphere'
                    }
                ]
            }
        ],
        onClick: () => handleToolChange('Brush')
    },
    {
        name: 'Eraser',
        icon: faEraser,
        onClick: () => handleToolChange('Eraser'),
        options: [
            {
                id: 'brush',
                name: 'Radius (mm)',
                type: 'range',
                min: 1,
                max: 10,
                value: 5,
                step: 1,
                onChange: (num: number | string) => handleBrushSizeChange(num as number)
            },
            {
                name: 'Mode',
                type: 'radio',
                value: 'Circle',
                onChange: (mode: number | string) => handleEraserModeChange(mode as string),
                values: [
                    {
                        value: 'Circle',
                        label: 'Circle'
                    },
                    {
                        value: 'Sphere',
                        label: 'Sphere'
                    }
                ]
            }
        ]
    },
    {
        name: 'Shapes',
        onClick: () => handleToolChange('Shapes'),
        icon: faShapes,
        active: false,
        options: [
            {
                name: 'Mode',
                type: 'radio',
                value: 'Circle',
                onChange: (mode: number | string) => handleShapeChange(mode as string),
                values: [
                    {
                        value: 'Circle',
                        label: 'Circle'
                    },
                    {
                        value: 'Sphere',
                        label: 'Sphere'
                    },
                    {
                        value: 'Rectangle',
                        label: 'Rectangle'
                    }
                ]
            }
        ]
    }
];

// ---------------------- Segmentation Table Functions ---------------------- //

const handleSegmentationVisibilityToggle = (segmentationId: string) => {
    store.dispatch(viewerSliceActions.handleSegmentationVisibility({ segmentationId }));
};

const handleSegmentVisibilityToggle = (segmentationId: string, segmentIndex: number) => {
    const currentToolGroupId = store.getState().viewer.currentToolGroupId;

    const currentVisibility = cornerstoneTools.segmentation.config.visibility.getSegmentVisibility(
        currentToolGroupId,
        segmentationId,
        segmentIndex
    );

    cornerstoneTools.segmentation.config.visibility.setSegmentVisibility(
        currentToolGroupId,
        segmentationId,
        segmentIndex,
        !currentVisibility
    );
};

const handleSegmentLockToggle = (segmentationId: string, segmentIndex: number) => {
    const currentLock = cornerstoneTools.segmentation.segmentLocking.isSegmentIndexLocked(
        segmentationId,
        segmentIndex
    );

    cornerstoneTools.segmentation.segmentLocking.setSegmentIndexLocked(
        segmentationId,
        segmentIndex,
        !currentLock
    );
};

const handleSegmentationDelete = (segmentationId: string) => {
    const currentToolGroupId = store.getState().viewer.currentToolGroupId;

    cornerstoneTools.segmentation.removeSegmentationsFromToolGroup(currentToolGroupId, [segmentationId]);
};

const handleSegmentClick = (segmentationId: string, segmentIndex: number) => {
    store.dispatch(viewerSliceActions.handleSegmentClick({ segmentationId, segmentIndex }));
    console.log('Segment Clicked', segmentationId, segmentIndex);
};

const onSegmentationClick = (segmentationId: string) => {
    store.dispatch(viewerSliceActions.onSegmentationClick({ segmentationId }));
};

export {
    handleSegmentationVisibilityToggle,
    handleSegmentVisibilityToggle,
    handleSegmentLockToggle,
    handleSegmentationDelete,
    handleSegmentClick,
    onSegmentationClick
};
export default advancedToolConfig;
