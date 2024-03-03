import * as cornerstoneTools from '@cornerstonejs/tools';

export const AnnotationToolsNames = {
    window: cornerstoneTools.WindowLevelTool.toolName,
    pan: cornerstoneTools.PanTool.toolName,
    length: cornerstoneTools.LengthTool.toolName,
    probe: cornerstoneTools.ProbeTool.toolName,
    rectangleROI: cornerstoneTools.RectangleROITool.toolName,
    ellipticalROI: cornerstoneTools.EllipticalROITool.toolName,
    circleROI: cornerstoneTools.CircleROITool.toolName,
    bidirectional: cornerstoneTools.BidirectionalTool.toolName,
    angle: cornerstoneTools.AngleTool.toolName,
    cobbAngle: cornerstoneTools.CobbAngleTool.toolName,
    arrowAnnotate: cornerstoneTools.ArrowAnnotateTool.toolName,
    crosshairs: cornerstoneTools.CrosshairsTool.toolName,
    zoom: cornerstoneTools.ZoomTool.toolName,
    stackScroll: cornerstoneTools.StackScrollMouseWheelTool.toolName
};

class CornerstoneToolInitializer {
    private readonly toolGroupId: string;
    public static annotationToolsNames = AnnotationToolsNames;
    private annotationToolGroup: any;

    constructor(toolGroupId: string = 'AnnotationTools') {
        this.toolGroupId = toolGroupId;

        // Add all the necessary tools to cornerstoneTools
        this.initializeTools();

        // Create and configure the tool group
        this.createAndConfigureToolGroup();
    }

    private initializeTools() {
        cornerstoneTools.addTool(cornerstoneTools.WindowLevelTool);
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(cornerstoneTools.LengthTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.ProbeTool);
        cornerstoneTools.addTool(cornerstoneTools.RectangleROITool);
        cornerstoneTools.addTool(cornerstoneTools.EllipticalROITool);
        cornerstoneTools.addTool(cornerstoneTools.CircleROITool);
        cornerstoneTools.addTool(cornerstoneTools.BidirectionalTool);
        cornerstoneTools.addTool(cornerstoneTools.AngleTool);
        cornerstoneTools.addTool(cornerstoneTools.CobbAngleTool);
        cornerstoneTools.addTool(cornerstoneTools.ArrowAnnotateTool);
        cornerstoneTools.addTool(cornerstoneTools.CrosshairsTool);
        // Add other tools here...
    }

    private createAndConfigureToolGroup() {
        this.annotationToolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(this.toolGroupId);

        if (!this.annotationToolGroup) {
            console.error(`Failed to create tool group with ID '${this.toolGroupId}'`);
            return;
        }

        // Add tools to the group and configure them
        this.annotationToolGroup.addTool(cornerstoneTools.WindowLevelTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.PanTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.ZoomTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.RectangleROITool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.EllipticalROITool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.StackScrollMouseWheelTool.toolName, {
            loop: true
        });
        this.annotationToolGroup.addTool(cornerstoneTools.LengthTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.ProbeTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.RectangleROITool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.CircleROITool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.BidirectionalTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.AngleTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.CobbAngleTool.toolName);
        this.annotationToolGroup.addTool(cornerstoneTools.ArrowAnnotateTool.toolName);
        // Add other tools and configurations here...

        // Set initial active state for some tools
        this.setToolActive(
            cornerstoneTools.WindowLevelTool.toolName,
            cornerstoneTools.Enums.MouseBindings.Primary
        );
        this.setToolActive(cornerstoneTools.PanTool.toolName, cornerstoneTools.Enums.MouseBindings.Auxiliary);
        this.setToolActive(
            cornerstoneTools.ZoomTool.toolName,
            cornerstoneTools.Enums.MouseBindings.Secondary
        );

        // Set the stack scroll tool as active for the middle mouse button;
        this.setToolActive(cornerstoneTools.StackScrollMouseWheelTool.toolName, 0);
        // Set other tools as active here...
    }

    private setToolActive(toolName: string, mouseButton: number) {
        this.annotationToolGroup.setToolActive(toolName, {
            bindings: [{ mouseButton }]
        });
    }

    public getToolGroup() {
        return this.annotationToolGroup;
    }

    public getToolNames() {
        return CornerstoneToolInitializer.annotationToolsNames;
    }
}

// Export the class for use elsewhere
export { CornerstoneToolInitializer };

export default CornerstoneToolInitializer;
