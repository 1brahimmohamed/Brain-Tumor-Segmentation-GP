import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { Enums } from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { optionCSS } from 'react-select/dist/declarations/src/components/Option';
import { log } from 'console';

//---------------------------------Annotation Tools--------------------------------
const ANNOTATION_TOOLS = {
    Angle: cornerstoneTools.AngleTool,
    'Arrow Annotate': cornerstoneTools.ArrowAnnotateTool,
    Bidirectional: cornerstoneTools.BidirectionalTool,
    'Circle ROI': cornerstoneTools.CircleROITool,
    'Cobb Angle': cornerstoneTools.CobbAngleTool,
    'Cross-hairs': cornerstoneTools.CrosshairsTool,
    'Elliptical ROI': cornerstoneTools.EllipticalROITool,
    Length: cornerstoneTools.LengthTool,
    'Livewire Contour': cornerstoneTools.LivewireContourTool,
    Magnify: cornerstoneTools.MagnifyTool,
    Pan: cornerstoneTools.PanTool,
    Probe: cornerstoneTools.ProbeTool,
    'Planar Freehand ROI': cornerstoneTools.PlanarFreehandROITool,
    'Planar Rotate': cornerstoneTools.PlanarRotateTool,
    'Rectangle ROI': cornerstoneTools.RectangleROITool,
    'Stack Scroll': cornerstoneTools.StackScrollMouseWheelTool,
    'Spline ROI Tool': cornerstoneTools.SplineROITool,
    'Trackball Rotate': cornerstoneTools.TrackballRotateTool,
    Window: cornerstoneTools.WindowLevelTool,
    Zoom: cornerstoneTools.ZoomTool
};

//---------------------------------Segmentation Tools--------------------------------
const BRUSH_INSTANCE_NAMES = {
    CircularBrush: 'CircularBrush',
    CircularEraser: 'CircularEraser',
    SphereBrush: 'SphereBrush',
    SphereEraser: 'SphereEraser',
    ThresholdCircle: 'ThresholdCircle',
    ScissorsEraser: 'ScissorsEraser'
};

const BRUSH_STRATEGIES = {
    [BRUSH_INSTANCE_NAMES.CircularBrush]: 'FILL_INSIDE_CIRCLE',
    [BRUSH_INSTANCE_NAMES.CircularEraser]: 'ERASE_INSIDE_CIRCLE',
    [BRUSH_INSTANCE_NAMES.SphereBrush]: 'FILL_INSIDE_SPHERE',
    [BRUSH_INSTANCE_NAMES.SphereEraser]: 'ERASE_INSIDE_SPHERE',
    [BRUSH_INSTANCE_NAMES.ThresholdCircle]: 'THRESHOLD_INSIDE_CIRCLE',
    [BRUSH_INSTANCE_NAMES.ScissorsEraser]: 'ERASE_INSIDE'
};

const BRUSH_VALUES = [
    BRUSH_INSTANCE_NAMES.CircularBrush,
    BRUSH_INSTANCE_NAMES.CircularEraser,
    BRUSH_INSTANCE_NAMES.SphereBrush,
    BRUSH_INSTANCE_NAMES.SphereEraser,
    BRUSH_INSTANCE_NAMES.ThresholdCircle
];
const SEGMENTATION_TOOLS = {
    SegmentationDisplay: cornerstoneTools.SegmentationDisplayTool,
    Brush: cornerstoneTools.BrushTool,
    RectangleScissors: cornerstoneTools.RectangleScissorsTool,
    CircleScissors: cornerstoneTools.CircleScissorsTool,
    SphereScissors: cornerstoneTools.SphereScissorsTool,
    PaintFill: cornerstoneTools.PaintFillTool
};

class CornerstoneToolManager {
    toolGroupId: string;
    toolGroup: cornerstoneTools.Types.IToolGroup | undefined;
    viewportsType?: any;
    static segmentationCounter: number = 1;

    constructor(toolGroupId: string, viewportsType?: string) {
        this.toolGroupId = toolGroupId;
        this.toolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId);
        this.viewportsType = viewportsType;

        if (!this.toolGroup) {
            throw new Error(`Failed to create tool group with ID '${toolGroupId}'`);
        }

        store.dispatch(
            viewerSliceActions.addAnnotationToolGroupId({
                annotationToolGroupId: this.toolGroupId
            })
        );

        // Add all the annotation and segmentation tools to the tool group
        Object.values(ANNOTATION_TOOLS).forEach((tool) => {
            this.toolGroup.addTool(tool.toolName);
        });
        Object.values(SEGMENTATION_TOOLS).forEach((tool) => {
            this.toolGroup.addTool(tool.toolName);
        });
        this.toolGroup.setToolEnabled(cornerstoneTools.SegmentationDisplayTool.toolName);

        switch (this.viewportsType) {
            case Enums.ViewportType.ORTHOGRAPHIC:
                // Set initial active state for some tools
                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.WindowLevelTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Primary,
                    this.toolGroupId
                );
                // Set the stack scroll tool as active for the middle mouse button;
                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.StackScrollMouseWheelTool.toolName,
                    0,
                    this.toolGroupId
                );
                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.PanTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Auxiliary,
                    this.toolGroupId
                );
                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.ZoomTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Secondary,
                    this.toolGroupId
                );

                break;
            case Enums.ViewportType.VOLUME_3D:
                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.TrackballRotateTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Primary,
                    this.toolGroupId
                );

                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.PanTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Auxiliary,
                    this.toolGroupId
                );

                CornerstoneToolManager.setToolActive(
                    cornerstoneTools.ZoomTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Secondary,
                    this.toolGroupId
                );

                break;
            default:
                throw new Error(`Unsupported viewports type: ${viewportsType}`);
        }
    }

    static initCornerstoneAnnotationTool() {
        Object.values(ANNOTATION_TOOLS).forEach((tool) => {
            cornerstoneTools.addTool(tool);
        });
    }

    static initCornerstoneSegmentationTool() {
        Object.values(SEGMENTATION_TOOLS).forEach((tool) => {
            cornerstoneTools.addTool(tool);
        });
    }

    static async addSegmentation() {
        const state = store.getState();
        const { segmentationItems, selectedViewportId, renderingEngineId, currentToolGroupId } = state.viewer;
        const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
        const viewport = renderingEngine.getViewport(selectedViewportId);
        CornerstoneToolManager.segmentationCounter = 1;

        if (!viewport) {
            console.error(`Failed to add segmentation: viewport with ID '${selectedViewportId}' not found`);
            return;
        }

        const volumeId = viewport.getActorUIDs()[0];
        const newSegmentationId = `SEGMENTATION_${segmentationItems.length + 1}`;

        await cornerstone.volumeLoader.createAndCacheDerivedVolume(volumeId, {
            volumeId: newSegmentationId
        });

        cornerstoneTools.segmentation.state.addSegmentation({
            segmentationId: newSegmentationId,
            representation: {
                type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap,
                data: {
                    volumeId: newSegmentationId
                }
            }
        });

        const [uid] = await cornerstoneTools.segmentation.addSegmentationRepresentations(currentToolGroupId, [
            {
                segmentationId: newSegmentationId,
                type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap
            }
        ]);

        await cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
            currentToolGroupId,
            uid
        );

        cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
            newSegmentationId,
            CornerstoneToolManager.segmentationCounter
        );

        store.dispatch(
            viewerSliceActions.addSegmentation({
                newSegmentationId
            })
        );

        viewport.render();
    }

    // Add Segment to a specific segmentation representation
    static addSegmentToSegmentation = () => {
        CornerstoneToolManager.segmentationCounter++;
        cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
            'SEGMENTATION_1',
            CornerstoneToolManager.segmentationCounter
        );
    };

    static setToolActive = (toolName: string, mouseButton: number, toolGroupId?: string) => {
        const state = store.getState();
        const { currentToolGroupId: currentAnnotationToolGroupId } = state.viewer;
        const currentToolGroupId = toolGroupId || currentAnnotationToolGroupId;
        const toolGroup = cornerstoneTools.ToolGroupManager.getToolGroup(currentToolGroupId);
        const { selectedCornerstoneTools } = state.viewer;

        try {
            if (!toolGroup) {
                console.error('tool group is not initialized');
                return;
            }

            // Set the tool as passive if it is already active
            toolGroup.setToolPassive(toolName, { removeAllBindings: true });

            // get the index of the existing tool with the same mouse binding and set the tool indexed to it as passive
            const existingToolIndex = selectedCornerstoneTools.findIndex(
                (tool) => tool.mouseBinding === mouseButton
            );
            if (existingToolIndex !== -1) {
                console.log(selectedCornerstoneTools[existingToolIndex].toolName);
                toolGroup.setToolPassive(selectedCornerstoneTools[existingToolIndex].toolName, {
                    removeAllBindings: true
                });
            }

            console.log(`Setting tool '${toolName}' as active for mouse button ${mouseButton}`);

            toolGroup.setToolActive(toolName, {
                bindings: [{ mouseButton }]
            });

            store.dispatch(
                viewerSliceActions.setSelectedAnnotationTool({
                    toolName,
                    mouseBinding: mouseButton
                })
            );
        } catch (error) {
            console.error(`Failed to set tool '${toolName}' as active: ${error}`);
        }
    };

    static setCurrentAnnotationToolGroupId = (toolGroupId: string) => {
        store.dispatch(
            viewerSliceActions.setCurrentAnnotationToolGroupId({
                currentAnnotationToolGroupId: toolGroupId
            })
        );
    };
}

export default CornerstoneToolManager;
export { ANNOTATION_TOOLS, SEGMENTATION_TOOLS };
