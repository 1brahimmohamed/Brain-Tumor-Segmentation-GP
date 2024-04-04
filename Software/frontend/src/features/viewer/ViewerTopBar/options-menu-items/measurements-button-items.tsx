import {
    AlignHorizontalRight as AlignRight,
    Upload as UploadIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import {
    PanoramaFishEye as EllipseIcon,
    Crop75 as RectangleIcon,
    CallReceived as ArrowIcon
} from '@mui/icons-material';
import { CornerstoneToolManager, ANNOTATION_TOOLS } from '@/features/viewer/CornerstoneToolManager/';

const MeasurementsButtonItems: TViewerButtonItems[] = [
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Length'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Length'].toolName, 1)
    },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Angle'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Angle'].toolName, 1)
    },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Cobb Angle'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Cobb Angle'].toolName, 1)
    },
    {
        icon: <EllipseIcon />,
        label: ANNOTATION_TOOLS['Elliptical ROI'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Elliptical ROI'].toolName, 1)
    },
    {
        icon: <RectangleIcon />,
        label: ANNOTATION_TOOLS['Rectangle ROI'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Rectangle ROI'].toolName, 1)
    },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Probe'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Probe'].toolName, 1)
    },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Bidirectional'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Bidirectional'].toolName, 1)
    },
    {
        icon: <ArrowIcon />,
        label: ANNOTATION_TOOLS['Arrow Annotate'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Arrow Annotate'].toolName, 1),
        divider: true
    },
    // {
    //     icon: <AlignRight/>,
    //     label: ANNOTATION_TOOLS["Planar Freehand ROI"].toolName,
    //     onClick: () => AnnotationTools.setToolActive(ANNOTATION_TOOLS["Planar Freehand ROI"].toolName, 1)
    // },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Spline ROI Tool'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Spline ROI Tool'].toolName, 1)
    },
    {
        icon: <AlignRight />,
        label: 'Catmull-Rom Spline ROI'
    },
    {
        icon: <AlignRight />,
        label: 'Linear Spline ROI'
    },
    {
        icon: <AlignRight />,
        label: 'B Spline ROI',
        divider: true
    },
    {
        icon: <AlignRight />,
        label: ANNOTATION_TOOLS['Livewire Contour'].toolName,
        onClick: () => CornerstoneToolManager.setToolActive(ANNOTATION_TOOLS['Livewire Contour'].toolName, 1),
        divider: true
    },
    {
        label: 'Save Measurments',
        icon: <DownloadIcon />,
        onClick: () => CornerstoneToolManager.downloadAnnotations()
    },
    {
        label: 'Load Measurments',
        icon: <UploadIcon />,
        onClick: () => CornerstoneToolManager.loadAnnotations()
    }
];

export default MeasurementsButtonItems;
