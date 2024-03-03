import * as cornerstoneTools from '@cornerstonejs/tools';

const {
    LengthTool,
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
    PlanarRotateTool
} = cornerstoneTools;

export const annotationToolsNames = {
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
    stackScroll: StackScrollMouseWheelTool.toolName,
    annotation: annotation
};
