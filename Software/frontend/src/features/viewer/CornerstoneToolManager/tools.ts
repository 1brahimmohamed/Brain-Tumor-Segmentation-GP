import * as cornerstoneTools from '@cornerstonejs/tools';

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
const BRUSH_INSTANCE_NAMES: { [key: string]: string } = {
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

export { ANNOTATION_TOOLS, SEGMENTATION_TOOLS, BRUSH_STRATEGIES, BRUSH_INSTANCE_NAMES, BRUSH_VALUES };
