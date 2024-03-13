import store from "@/redux/store.ts";
import * as cornerstoneTools from '@cornerstonejs/tools';
import {Enums} from "@cornerstonejs/core";
import {viewerSliceActions} from "@features/viewer/viewer-slice.ts";

const ANNOTATION_TOOLS = {
    "Angle": cornerstoneTools.AngleTool,
    "Arrow Annotate": cornerstoneTools.ArrowAnnotateTool,
    "Bidirectional": cornerstoneTools.BidirectionalTool,
    "Circle ROI": cornerstoneTools.CircleROITool,
    "Cobb Angle": cornerstoneTools.CobbAngleTool,
    "Cross-hairs": cornerstoneTools.CrosshairsTool,
    "Elliptical ROI": cornerstoneTools.EllipticalROITool,
    "Length": cornerstoneTools.LengthTool,
    "Pan": cornerstoneTools.PanTool,
    "Probe": cornerstoneTools.ProbeTool,
    "Rectangle ROI": cornerstoneTools.RectangleROITool,
    "Stack Scroll": cornerstoneTools.StackScrollMouseWheelTool,
    "Trackball Rotate Tool": cornerstoneTools.TrackballRotateTool,
    "Window": cornerstoneTools.WindowLevelTool,
    "Zoom": cornerstoneTools.ZoomTool,
};

class AnnotationTools {
    toolGroupId: string;
    annotationToolGroup: any;
    viewportsType?: any;


    constructor(toolGroupId: string, viewportsType?: string) {
        this.toolGroupId = toolGroupId;
        this.annotationToolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId);
        this.viewportsType = viewportsType;

        if (!this.annotationToolGroup) {
            throw new Error(`Failed to create tool group with ID '${toolGroupId}'`);
        }

        store.dispatch(
            viewerSliceActions.addAnnotationToolGroupId({
                annotationToolGroupId: this.toolGroupId
            })
        );

        Object.values(ANNOTATION_TOOLS).forEach((tool) => {
            this.annotationToolGroup.addTool(tool.toolName);
        });

        switch (this.viewportsType) {
            case (Enums.ViewportType.ORTHOGRAPHIC):
                // Set initial active state for some tools
                AnnotationTools.setToolActive(
                    cornerstoneTools.WindowLevelTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Primary,
                    this.toolGroupId
                );
                // Set the stack scroll tool as active for the middle mouse button;
                AnnotationTools.setToolActive(
                    cornerstoneTools.StackScrollMouseWheelTool.toolName,
                    0,
                    this.toolGroupId
                );
                AnnotationTools.setToolActive(
                    cornerstoneTools.PanTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Auxiliary,
                    this.toolGroupId
                );
                AnnotationTools.setToolActive(
                    cornerstoneTools.ZoomTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Secondary,
                    this.toolGroupId
                );
                break;
            case (Enums.ViewportType.VOLUME_3D):

                AnnotationTools.setToolActive(
                    cornerstoneTools.TrackballRotateTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Primary,
                    this.toolGroupId
                );

                AnnotationTools.setToolActive(
                    cornerstoneTools.PanTool.toolName,
                    cornerstoneTools.Enums.MouseBindings.Auxiliary,
                    this.toolGroupId
                );

                AnnotationTools.setToolActive(
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

    static setToolActive = ( toolName: string, mouseButton: number, toolGroupId?: string) => {
        const state = store.getState();
        const {currentAnnotationToolGroupId} = state.viewer;
        const currentToolGroupId = toolGroupId || currentAnnotationToolGroupId;
        const annotationToolGroup = cornerstoneTools.ToolGroupManager.getToolGroup(currentToolGroupId);
        const {selectedAnnotationTools} = state.viewer;

        try {
            if (!annotationToolGroup) {
                console.error('Annotation tool group is not initialized');
                return;
            }
            const existingToolIndex = selectedAnnotationTools.findIndex(
                (tool) => tool.mouseBinding === mouseButton
            );
            if (existingToolIndex !== -1) {
                annotationToolGroup.setToolPassive(selectedAnnotationTools[existingToolIndex].toolName);
            }

            annotationToolGroup.setToolActive(toolName, {
                bindings: [{mouseButton}]
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
    }
}


export default AnnotationTools;
export {ANNOTATION_TOOLS};
