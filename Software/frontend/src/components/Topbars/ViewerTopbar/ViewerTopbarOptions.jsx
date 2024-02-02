// Icons

// Contrast
import ContrastIcon from '@mui/icons-material/Contrast';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

// Pan
import PanToolIcon from '@mui/icons-material/PanTool';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';

// Zoom
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

// Measurements
import StraightenIcon from '@mui/icons-material/Straighten';
import CallMadeIcon from '@mui/icons-material/CallMade';
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import {RxAngle} from "react-icons/rx";
import {IoEllipseOutline} from "react-icons/io5";
import {LiaVectorSquareSolid} from "react-icons/lia";

// Rotate
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import {TbFlipHorizontal, TbFlipVertical} from "react-icons/tb";
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';

// Segmentation
import PolylineIcon from '@mui/icons-material/Polyline';

// Layout
import GridViewIcon from '@mui/icons-material/GridView';
import {TfiLayoutColumn2Alt, TfiLayoutColumn3Alt, TfiLayoutColumn4Alt, TfiLayoutGrid2Alt} from "react-icons/tfi";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

// Full Screen
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

// Thumbnails
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import {VscLayoutMenubar, VscLayoutPanel, VscLayoutSidebarLeft, VscLayoutSidebarRight} from "react-icons/vsc";

// Export
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

// info
import PreviewIcon from '@mui/icons-material/Preview';

// 3D
import ViewInArIcon from '@mui/icons-material/ViewInAr';

// Reset
import HistoryIcon from '@mui/icons-material/History';

import * as topbarFunctions from "./ViewerTopBarFunctions.js"

import {CONSTANTS} from "@cornerstonejs/core";

import {annotationToolsNamesObj} from "../../../utils/AnnotationTools.jsx";


const getCornerstonePresets = () => {

    return CONSTANTS.VIEWPORT_PRESETS.map((preset) => {
        return {
            icon: <ViewInArIcon/>,
            text: preset.name,
        }
    })
};


const ViewerTopbarOptions = [
    {
        icon: <ContrastIcon />,
        text: "Window",
        doPopDown: true,
        isClickable: true,
        toolName: annotationToolsNamesObj.window,
        onClickAction: () =>{ console.log("contrast") },
        children: [
            {
                icon: <InvertColorsIcon/>,
                text: "Invert",
                onClickAction: () => {console.log("invert")}
            }
        ]
    },
    {
        icon: <PanToolIcon />,
        text: "Pan",
        doPopDown: true,
        isClickable: true,
        toolName: annotationToolsNamesObj.pan,
        onClickAction: () =>{ console.log("Pan") },
        children: [
            {
                icon: <AlignHorizontalCenterIcon/>,
                text: "Align Center",
                onClickAction: () => {console.log("align center")}
            },
            {
                icon: <AlignHorizontalLeftIcon/>,
                text: "Align Left",
                onClickAction: () => {console.log("align left")}
            },
            {
                icon: <AlignHorizontalRightIcon/>,
                text: "Align Right",
                onClickAction: () => {console.log("align right")}
            }
        ]
    },
    {
        icon: <ZoomInIcon />,
        text: "Zoom",
        doPopDown: true,
        isClickable: true,
        toolName: annotationToolsNamesObj.zoom,
        onClickAction: () =>{ console.log("Zoom") },
        children: [
            {
                icon: <FitScreenIcon/>,
                text: "Fit Screen",
                onClickAction: () => {console.log("fit screen")}
            },
            {
                icon: <CropOriginalIcon/>,
                text: "Original Size",
                onClickAction: () => {console.log("Original Size")}
            }
        ]
    },
    {
        icon: <StraightenIcon/>,
        text: "Measurements",
        doPopDown: true,
        isClickable: false,
        children: [
            {
                icon: <RxAngle/>,
                text: "Angle",
                toolName: annotationToolsNamesObj.angle,
                onClickAction: () => {console.log("angle")}
            },
            {
                icon: <LiaVectorSquareSolid/>,
                text: "Area",
                onClickAction: () => {console.log("Area")}
            },
            {
                icon: <IoEllipseOutline/>,
                text: "Ellipse",
                toolName: annotationToolsNamesObj.ellipse,
                onClickAction: () => {console.log("ellipse")}
            },
            {
                icon: <RectangleOutlinedIcon/>,
                text: "Rectangle",
                toolName: annotationToolsNamesObj.rectangle,
                onClickAction: () => {console.log("rectangle")}
            },
            {
                icon: <CallMadeIcon/>,
                text: "arrow",
                toolName: annotationToolsNamesObj.arrow,
                onClickAction: () => {console.log("arrow")}
            },
            {
                icon: <TextFormatOutlinedIcon/>,
                text: "Text",
                onClickAction: () => {console.log("text annotation")}
            },
        ]
    },
    {
        icon: <RotateLeftIcon />,
        text: "Rotate",
        doPopDown: true,
        isClickable: true,
        toolName: annotationToolsNamesObj.rotate,
        children: [
            {
                icon: <TbFlipHorizontal/>,
                text: "Flip Horizontal",
                onClickAction: () => {console.log("flip horizontal")}
            },
            {
                icon: <TbFlipVertical/>,
                text: "Flip Vertical",
                onClickAction: () => {console.log("flip vertical")}
            },
            {
                icon: <Rotate90DegreesCcwOutlinedIcon/>,
                text: "Rotate Left",
                onClickAction: () => {console.log("rotate left")}
            },
            {
                icon: <Rotate90DegreesCwOutlinedIcon/>,
                text: "Rotate Right",
                onClickAction: () => {console.log("rotate right")}
            },
            {
                icon: <SyncDisabledIcon/>,
                text: "Reset",
                onClickAction: () => {console.log("reset")}
            },

        ]
    },
    {
        icon: <PolylineIcon />,
        text: "Segmentation",
        doPopDown: false,
        isClickable: true,
    },
    {
        icon: <GridViewIcon />,
        text: "Layout",
        doPopDown: true,
        isClickable: false,
        children: [
            {
                icon: <TfiLayoutColumn2Alt/>,
                text: "1 x 2 Screen Layout",
                onClickAction: () => {console.log("1 x 2 Screen Layout")}
            },
            {
                icon: <TfiLayoutColumn3Alt/>,
                text: "1 x 3 Screen Layout",
                onClickAction: () => {console.log("1 x 3 Screen Layout")}
            },
            {
                icon: <TfiLayoutColumn4Alt/>,
                text: "1 x 4 Screen Layout",
                onClickAction: () => {console.log("1 x 4 Screen Layout")}
            },
            {
                icon: <TfiLayoutGrid2Alt/>,
                text: "2 x 2 Screen Layout",
                onClickAction: () => {console.log("2 x 2 Screen Layout")}
            },
            {
                icon: <TableRowsIcon/>,
                text: "3 x 1 Screen Layout",
                onClickAction: () => {console.log("3 x 1 Screen Layout")}
            },
            {
                icon: <ViewHeadlineIcon/>,
                text: "4 x 1 Screen Layout",
                onClickAction: () => {console.log("4 x 1 Screen Layout")}
            },
        ],
    },
    {
        icon: <ZoomOutMapIcon />,
        text: "Full Screen",
        doPopDown: false,
        isClickable: true,
        onClickAction: topbarFunctions.fullScreenToggle
    },
    {
        icon: <ViewComfyIcon />,
        text: "Thumbnails",
        doPopDown: true,
        isClickable: false,
        children: [
            {
                icon: <VscLayoutSidebarLeft/>,
                text: "Left",
                onClickAction: () => {console.log("left thumbnails")}
            },
            {
                icon: <VscLayoutSidebarRight/>,
                text: "Right",
                onClickAction: () => {console.log("right thumbnails")}
            },
            {
                icon: <VscLayoutPanel className={"rotate-180"}/>,
                text: "Top",
                onClickAction: () => {console.log("top thumbnails")}
            },
            {
                icon: <VscLayoutPanel/>,
                text: "Bottom",
                onClickAction: () => {console.log("bottom thumbnails")}
            },
            {
                icon: <VscLayoutMenubar/>,
                text: "Hide Side Panel",
                onClickAction: () => {console.log("hide side panel")}
            },
        ]
    },
    {
        icon: <VerticalAlignBottomIcon />,
        text: "Export",
        doPopDown: false,
        isClickable: true,
        onClickAction: () => {console.log("export")}
    },
    {
        icon: <PreviewIcon />,
        text: "Info",
        doPopDown: false,
        isClickable: true,
        onClickAction: () => {console.log("toogle info")}
    },
    {
        icon: <ViewInArIcon />,
        text: "3D",
        doPopDown: true,
        isClickable: true,
        onClickAction: () => {console.log("3D")},
        children: getCornerstonePresets()
    },
    {
        icon: <HistoryIcon />,
        text: "Reset",
        doPopDown: false,
        isClickable: false,
        onClickAction: () => {console.log("reset viewer")}
    }
];

export default ViewerTopbarOptions;
