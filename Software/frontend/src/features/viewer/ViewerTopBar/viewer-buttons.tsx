import {
    Contrast as ContrastIcon,
    PanTool as PanToolIcon,
    ZoomIn as ZoomToolIcon,
    Straighten as MeasurementToolIcon,
    RotateLeft as RotationToolIcon,
    Polyline as SegmentationToolIcon,
    GridView as LayoutIcon,
    ZoomOutMap as FullScreenIcon,
    ViewComfy as ThumbnailIcon,
    VerticalAlignBottom as ExportIcon,
    Info as InfoIcon,
    ViewInAr as ThreeDIcon,
    History as ResetIcon,
    NotificationImportantOutlined as NotificationOutlinedIcon,
    DarkModeOutlined as DarkModeOutlinedIcon,
    LightModeOutlined as LightModeOutlinedIcon,
    Translate as LanguagesIcon,
    SettingsOutlined as SettingsOutlinedIcon
} from '@mui/icons-material';

import store from '@/redux/store.ts';
import { LANGUAGE_MENU_ITEMS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import WindowButtonItems from '@features/viewer/ViewerTopBar/options-menu-items/WindowButtonItems.tsx';
import {
    handleColorModeChange,
    handleLanguageChange,
    handleSettingsItemClick
} from '@features/top-bars/topbars-actions.ts';
import { AnnotationToolsNames } from '@features/viewer/AnnotationTool/AnnotationClass';
import LayoutSelector from '@features/viewer/components/LayoutSelector.tsx';
import {toggleFullScreen, toggleViewportOverlayShown} from '@features/viewer/ViewerTopBar/viewer-top-bar-actions.ts';
import NotificationsMenu from "@features/notifications/NotificationsMenu.tsx";
export const VIEWER_SETTINGS_MENU_ITEMS = ['About', 'License Agreement', 'Help', 'Shortcuts'];

const VIEWER_TOOLS_BUTTONS = [
    {
        title: AnnotationToolsNames.window,
        onClick: () => console.log('contrast'),
        icon: <ContrastIcon />,
        menuComponent: <WindowButtonItems />
    },
    {
        title: AnnotationToolsNames.pan,
        onClick: () => console.log('Pan'),
        icon: <PanToolIcon />,
        menuComponent: <WindowButtonItems />
    },
    {
        title: AnnotationToolsNames.zoom,
        onClick: () => console.log('Zoom'),
        icon: <ZoomToolIcon />,
        menuComponent: <WindowButtonItems />
    },
    {
        title: 'Measurement',
        onClick: () => console.log('Measurement'),
        icon: <MeasurementToolIcon />,
        menuComponent: <WindowButtonItems />
    },
    {
        title: 'Rotate',
        onClick: () => console.log('Rotate'),
        icon: <RotationToolIcon />,
        menuComponent: <WindowButtonItems />
    },
    {
        title: 'Segmentation',
        icon: <SegmentationToolIcon />,
        onClick: () => console.log('Segmentation')
    },
    {
        title: 'Layout',
        icon: <LayoutIcon />,
        menuComponent: <LayoutSelector rows={4} columns={4} />
    },
    {
        title: 'Full Screen',
        icon: <FullScreenIcon />,
        onClick: toggleFullScreen
    },
    {
        title: 'Thumbnails',
        icon: <ThumbnailIcon />
    },
    {
        title: 'Export',
        icon: <ExportIcon />
    },
    {
        icon: <InfoIcon />,
        title: 'Info',
        onClick: toggleViewportOverlayShown
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
