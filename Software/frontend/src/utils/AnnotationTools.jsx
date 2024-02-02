import React from 'react';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';

const toolGroupId = 'AnnotationTools';


// CornerstoneJS tool initialization
const {
    LengthTool,
    ToolGroupManager,
    StackScrollMouseWheelTool,
    ZoomTool,
    ProbeTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    WindowLevelTool,
    PanTool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    annotation,
    PlanarRotateTool,
    Enums: csToolsEnums,
} = cornerstoneTools;

const { locking, selection, state } = annotation;
const { MouseBindings } = csToolsEnums;

const annotationToolsNames = [
    WindowLevelTool.toolName,
    PanTool.toolName,
    LengthTool.toolName,
    ProbeTool.toolName,
    RectangleROITool.toolName,
    EllipticalROITool.toolName,
    CircleROITool.toolName,
    BidirectionalTool.toolName,
    AngleTool.toolName,
    CobbAngleTool.toolName,
    ArrowAnnotateTool.toolName,
    ZoomTool.toolName,
    PlanarRotateTool.toolName,
];

const annotationToolsNamesObj = {
    window: WindowLevelTool.toolName,
    pan: PanTool.toolName,
    length: LengthTool.toolName,
    probe: ProbeTool.toolName,
    rectangle: RectangleROITool.toolName,
    ellipse: EllipticalROITool.toolName,
    circleRoi: CircleROITool.toolName,
    biDirectional: BidirectionalTool.toolName,
    angle: AngleTool.toolName,
    cobbAngle: CobbAngleTool.toolName,
    arrow: ArrowAnnotateTool.toolName,
    zoom: ZoomTool.toolName,
    rotate: PlanarRotateTool.toolName,
}

// Add tools to Cornerstone3D
cornerstoneTools.addTool(WindowLevelTool);
cornerstoneTools.addTool(PanTool);
cornerstoneTools.addTool(StackScrollMouseWheelTool);
cornerstoneTools.addTool(LengthTool);
cornerstoneTools.addTool(ZoomTool);
cornerstoneTools.addTool(ProbeTool);
cornerstoneTools.addTool(RectangleROITool);
cornerstoneTools.addTool(EllipticalROITool);
cornerstoneTools.addTool(CircleROITool);
cornerstoneTools.addTool(BidirectionalTool);
cornerstoneTools.addTool(AngleTool);
cornerstoneTools.addTool(CobbAngleTool);
cornerstoneTools.addTool(ArrowAnnotateTool);

const annotationToolGroup = ToolGroupManager.createToolGroup(toolGroupId);

// Add the tools to the tool group and specify which volume they are pointing at
annotationToolGroup.addTool(WindowLevelTool.toolName);
annotationToolGroup.addTool(PanTool.toolName);
annotationToolGroup.addTool(ZoomTool.toolName);
annotationToolGroup.addTool(RectangleROITool.toolName);
annotationToolGroup.addTool(EllipticalROITool.toolName);
annotationToolGroup.addTool(StackScrollMouseWheelTool.toolName , { loop: true });
annotationToolGroup.addTool(LengthTool.toolName);
annotationToolGroup.addTool(ProbeTool.toolName);
annotationToolGroup.addTool(RectangleROITool.toolName);
annotationToolGroup.addTool(CircleROITool.toolName);
annotationToolGroup.addTool(BidirectionalTool.toolName);
annotationToolGroup.addTool(AngleTool.toolName);
annotationToolGroup.addTool(CobbAngleTool.toolName);
annotationToolGroup.addTool(ArrowAnnotateTool.toolName);

const setLeftMouseButton = (tool, prevTool) => {
    annotationToolGroup.setToolActive(tool, {
        bindings: [
            {
                mouseButton: MouseBindings.Primary, // Left Click
            },
        ],
    });

    if (prevTool)
        annotationToolGroup.setToolPassive(prevTool)

}
const setRightMouseButton = (tool, prevTool) => {
    annotationToolGroup.setToolActive(tool, {
        bindings: [
            {
                mouseButton: MouseBindings.Secondary, // Right Click
            },
        ],
    });

    if (prevTool)
        annotationToolGroup.setToolPassive(prevTool)
}
const setMouseWheelButton = (tool, prevTool=null) => {
    annotationToolGroup.setToolActive(tool, {
        bindings: [
            {
                mouseButton: MouseBindings.Auxiliary, // Middle Click
            },
        ],
    });

    if (prevTool)
        annotationToolGroup.setToolPassive(prevTool)
}

// Set the initial state of the tools, here all tools are active and bound to
// Different mouse inputs
annotationToolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

setLeftMouseButton(WindowLevelTool.toolName)

setRightMouseButton(ZoomTool.toolName)

setMouseWheelButton(PanTool.toolName)

export {
    annotationToolGroup,
    annotationToolsNames,
    annotationToolsNamesObj,
    setLeftMouseButton,
    setRightMouseButton,
    setMouseWheelButton,
};
