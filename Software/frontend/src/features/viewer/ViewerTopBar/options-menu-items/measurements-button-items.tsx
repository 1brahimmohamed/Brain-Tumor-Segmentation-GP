import {AlignHorizontalRight as AlignRight} from "@mui/icons-material";
import {TViewerButtonItems} from "../../components/ViewerButtonMenu";
import {
    PanoramaFishEye as EllipseIcon,
    Crop75 as RectangleIcon,
    CallReceived as ArrowIcon
} from '@mui/icons-material';
import AnnotationTools, {ANNOTATION_TOOLS} from "@features/viewer/AnnotationTool/AnnotationTools.ts";

const MeasurementsButtonItems : TViewerButtonItems[] = [
    {
        icon: <AlignRight/>,
        label: ANNOTATION_TOOLS["Length"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Length"].toolName, 1)
    },
    {
        icon: <AlignRight/>,
        label:  ANNOTATION_TOOLS["Angle"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Angle"].toolName, 1)
    }, {
        icon: <AlignRight/>,
        label:  ANNOTATION_TOOLS["Cobb Angle"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Cobb Angle"].toolName, 1)
    },
    {
        icon: <EllipseIcon/>,
        label: ANNOTATION_TOOLS["Elliptical ROI"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Elliptical ROI"].toolName, 1)
    },
    {
        icon: <RectangleIcon/>,
        label: ANNOTATION_TOOLS["Rectangle ROI"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Rectangle ROI"].toolName, 1)
    },
    {
        icon: <AlignRight/>,
        label:  ANNOTATION_TOOLS["Probe"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Probe"].toolName, 1)
    },
    {
        icon: <AlignRight/>,
        label:  ANNOTATION_TOOLS["Bidirectional"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Bidirectional"].toolName, 1)
    },
    {
        icon: <ArrowIcon/>,
        label: ANNOTATION_TOOLS["Arrow Annotate"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Arrow Annotate"].toolName, 1),
        divider: true
    },
    // {
    //     icon: <AlignRight/>,
    //     label: ANNOTATION_TOOLS["Planar Freehand ROI"].toolName,
    //     onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Planar Freehand ROI"].toolName, 1)
    // },
    {
        icon: <AlignRight/>,
        label: ANNOTATION_TOOLS["Spline ROI Tool"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Spline ROI Tool"].toolName, 1)
    },
    {
        icon: <AlignRight/>,
        label: 'Catmull-Rom Spline ROI',
    },
    {
        icon: <AlignRight/>,
        label: 'Linear Spline ROI',
    },
    {
        icon: <AlignRight/>,
        label: 'B Spline ROI',
        divider: true
    },
    {
        icon: <AlignRight/>,
        label: ANNOTATION_TOOLS["Livewire Contour"].toolName,
        onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Livewire Contour"].toolName, 1)
    },
]

export default MeasurementsButtonItems;
