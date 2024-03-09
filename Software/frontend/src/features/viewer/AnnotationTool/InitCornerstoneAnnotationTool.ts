import * as cornerstoneTools from '@cornerstonejs/tools';
import { SetToolActive } from '@/features/viewer/AnnotationTool/SetAnnotationToolActive';
import { AnnotationToolsNames } from '@/features/viewer/AnnotationTool/AnnotationToolsNames';

const InitCornerstoneAnnotationTool = () => {
    const initializeTools = () => {
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
    };

    const createAndConfigureToolGroup = (toolGroupId: string) => {
        const annotationToolGroup = cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId);

        if (!annotationToolGroup) {
            console.error(`Failed to create tool group with ID '${toolGroupId}'`);
            return;
        }

        // Add tools to the group and configure them
        Object.values(AnnotationToolsNames).forEach((toolName) => {
            annotationToolGroup.addTool(toolName);
        });

        // Set initial active state for some tools
        SetToolActive(
            cornerstoneTools.WindowLevelTool.toolName,
            cornerstoneTools.Enums.MouseBindings.Primary
        );

        SetToolActive(cornerstoneTools.PanTool.toolName, cornerstoneTools.Enums.MouseBindings.Auxiliary);
        SetToolActive(cornerstoneTools.ZoomTool.toolName, cornerstoneTools.Enums.MouseBindings.Secondary);

        // Set the stack scroll tool as active for the middle mouse button;
        SetToolActive(cornerstoneTools.StackScrollMouseWheelTool.toolName, 0);
    };

    // Add all the necessary tools to cornerstoneTools
    initializeTools();

    // Create and configure the tool group
    createAndConfigureToolGroup('AnnotationTools');
};

// Export the class for use elsewhere
export default InitCornerstoneAnnotationTool;
