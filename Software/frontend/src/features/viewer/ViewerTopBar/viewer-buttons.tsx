import {
    Contrast as ContrastIcon,
    ZoomIn as ZoomToolIcon,
    Straighten as MeasurementToolIcon,
    RotateLeft as RotationToolIcon,
    GridView as LayoutIcon,
    ZoomOutMap as FullScreenIcon,
    ImageSearch as MagnifyIcon,
    VerticalAlignBottom as ExportIcon,
    Info as InfoIcon,
    ViewInAr as ThreeDIcon,
    History as ResetIcon,
    NotificationImportantOutlined as NotificationOutlinedIcon,
    DarkModeOutlined as DarkModeOutlinedIcon,
    LightModeOutlined as LightModeOutlinedIcon,
    Translate as LanguagesIcon,
    SettingsOutlined as SettingsOutlinedIcon,
    Upload as UploadIcon
} from '@mui/icons-material';
import { LuAxis3D } from 'react-icons/lu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUpDownLeftRight, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FaPaintBrush } from 'react-icons/fa';

import store from '@/redux/store.ts';
import {
    handleColorModeChange,
    handleLanguageChange,
    handleSettingsItemClick
} from '@features/top-bars/topbars-actions.ts';
import { ANNOTATION_TOOLS, SEGMENTATION_TOOLS } from '@/features/viewer/CornerstoneToolManager/';

import LayoutSelector from '@features/viewer/components/LayoutSelector.tsx';
import {
    handleToolClick,
    toggleFullScreen,
    toggleViewportOverlayShown
} from '@features/viewer/ViewerTopBar/viewer-top-bar-actions.ts';
import NotificationsMenu from '@features/notifications/NotificationsMenu.tsx';
import ViewerButtonMenu from '@features/viewer/components/ViewerButtonMenu.tsx';
import { LANGUAGE_MENU_ITEMS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import {
    MeasurementsButtonItems,
    PanButtonItems,
    RotateButtonItems,
    ZoomButtonItems,
    WindowButtonItems
} from '@features/viewer/ViewerTopBar/options-menu-items';
import CornerstoneToolManager from '@/features/viewer/CornerstoneToolManager/CornerstoneToolManager';

export const VIEWER_SETTINGS_MENU_ITEMS = ['About', 'License Agreement', 'Help', 'Shortcuts'];

const VIEWER_TOOLS_BUTTONS = [
    {
        title: ANNOTATION_TOOLS['Window'].toolName,
        onClick: handleToolClick,
        icon: <ContrastIcon />,
        menuComponent: <ViewerButtonMenu items={WindowButtonItems} />
    },
    {
        title: ANNOTATION_TOOLS['Pan'].toolName,
        onClick: handleToolClick,
        icon: <FontAwesomeIcon icon={faUpDownLeftRight} />,
        menuComponent: <ViewerButtonMenu items={PanButtonItems} />
    },
    {
        title: ANNOTATION_TOOLS['Zoom'].toolName,
        onClick: handleToolClick,
        icon: <ZoomToolIcon />,
        menuComponent: <ViewerButtonMenu items={ZoomButtonItems} />
    },
    {
        title: 'Measurements',
        onClick: handleToolClick,
        icon: <MeasurementToolIcon />,
        menuComponent: <ViewerButtonMenu items={MeasurementsButtonItems} />
    },
    {
        title: 'Rotate',
        onClick: handleToolClick,
        icon: <RotationToolIcon />,
        menuComponent: <ViewerButtonMenu items={RotateButtonItems} />
    },
    {
        title: 'Magnify',
        onClick: handleToolClick,
        icon: <MagnifyIcon />
    },
    {
        title: 'Scroll',
        icon: <FontAwesomeIcon icon={faLayerGroup} />,
        onClick: handleToolClick
    },
    {
        title: 'Layout',
        icon: <LayoutIcon />,
        menuComponent: <LayoutSelector rows={4} columns={4} />
    },
    {
        title: 'Cine',
        icon: <FontAwesomeIcon icon={faCirclePlay} />,
        onClick: handleToolClick
    },
    {
        title: 'Full Screen',
        icon: <FullScreenIcon />,
        onClick: toggleFullScreen
    },
    {
        title: 'SEG',
        onClick: () => {
            CornerstoneToolManager.uploadSegmentation();
        },
        icon: <UploadIcon />
    },
    {
        icon: <InfoIcon />,
        title: 'Info',
        onClick: toggleViewportOverlayShown
    },
    {
        title: 'MPR',
        icon: <LuAxis3D />
    },
    {
        icon: <ThreeDIcon />,
        title: '3D'
    },
    {
        icon: <ResetIcon />,
        title: 'Reset'
    }
];

const VIEWER_OPTION_BUTTONS = [
    {
        onClick: () => {},
        icon: <NotificationOutlinedIcon />,
        menuComponent: <NotificationsMenu />
    },
    {
        onClick: handleColorModeChange,
        icon: store.getState().ui.themeMode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />
    },
    {
        onClick: handleLanguageChange,
        icon: <LanguagesIcon />,
        menuItems: LANGUAGE_MENU_ITEMS
    },
    {
        onClick: handleSettingsItemClick,
        icon: <SettingsOutlinedIcon />,
        menuItems: VIEWER_SETTINGS_MENU_ITEMS
    }
];
export { VIEWER_TOOLS_BUTTONS, VIEWER_OPTION_BUTTONS };
