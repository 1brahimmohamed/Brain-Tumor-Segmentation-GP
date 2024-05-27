import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { Enums } from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { ANNOTATION_TOOLS, SEGMENTATION_TOOLS, BRUSH_STRATEGIES, BRUSH_INSTANCE_NAMES } from './tools';
import { downloadAnnotations, loadAnnotations } from './annotationMethods';
import {
    addSegmentToSegmentation,
    addSegmentation,
    downloadSegmentation,
    uploadSegmentation
} from './segmentationMethods';
import { setToolActive, setCurrentToolGroupId } from './toolsMethods';

// Class that manages the cornerstone tools and tool groups for the viewer
class CornerstoneToolManager {
    toolGroupId: string;
    toolGroup: cornerstoneTools.Types.IToolGroup | undefined;
    viewportsType?: any;

    // Constructor for the CornerstoneToolManager class that initializes the tool group
    // and adds all the annotation and segmentation tools to it based on the provided tool group ID
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
            this.toolGroup?.addTool(tool.toolName);
        });
        Object.values(SEGMENTATION_TOOLS).forEach((tool) => {
            this.toolGroup?.addTool(tool.toolName);
        });

        // add the segmentation brush instances
        Object.values(BRUSH_INSTANCE_NAMES).forEach((instance: string) => {
            this.toolGroup?.addToolInstance(
                BRUSH_INSTANCE_NAMES[instance],
                cornerstoneTools.BrushTool.toolName,
                {
                    activeStrategy: BRUSH_STRATEGIES[instance]
                }
            );
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

    // Initialize the cornerstone annotation tools
    static initCornerstoneAnnotationTool() {
        Object.values(ANNOTATION_TOOLS).forEach((tool) => {
            cornerstoneTools.addTool(tool);
        });
    }

    // Initialize the cornerstone segmentation tools
    static initCornerstoneSegmentationTool() {
        Object.values(SEGMENTATION_TOOLS).forEach((tool) => {
            cornerstoneTools.addTool(tool);
        });
    }

    // Add a new segmentation to the viewer state
    static addSegmentation = addSegmentation;

    // Add Segment to a specific segmentation representation
    static addSegmentToSegmentation = addSegmentToSegmentation;

    // Set the active tool for a specific mouse button
    static setToolActive = setToolActive;

    // Set the current annotation tool group ID in the store
    static setCurrentToolGroupId = setCurrentToolGroupId;

    // Download the current annotations as a JSON file and remove all the annotations from the rendering engine
    // and re-renders the viewport
    static downloadAnnotations = downloadAnnotations;

    // Load annotations from a JSON file and add them to the rendering engine
    static loadAnnotations = loadAnnotations;

    // Download the current segmentation mask as a dcm file
    static downloadSegmentation = downloadSegmentation;

    // Upload segmentation mask from a dcm file
    static uploadSegmentation = uploadSegmentation;
}

export default CornerstoneToolManager;
