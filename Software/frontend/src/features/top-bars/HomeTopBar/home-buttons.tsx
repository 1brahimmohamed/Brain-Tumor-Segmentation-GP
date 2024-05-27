import store from '@/redux/store.ts';
import { handleColorModeChange, handleLanguageChange, handleSettingsItemClick } from '../topbars-actions.ts';

import {
    VerticalAlignBottom as ExportIcon,
    NotificationImportantOutlined as NotificationOutlinedIcon,
    DarkModeOutlined as DarkModeOutlinedIcon,
    LightModeOutlined as LightModeOutlinedIcon,
    Translate as LanguagesIcon,
    SettingsOutlined as SettingsOutlinedIcon
} from '@mui/icons-material';

import NotificationsMenu from '@features/notifications/NotificationsMenu.tsx';

export const HOME_SETTINGS_MENU_ITEMS = ['Settings', 'License Agreement', 'Help', 'Logout'];

export const LANGUAGE_MENU_ITEMS = ['EN', 'AR', 'ES', 'DE', 'FR', 'IT'];

export const TIME_INTERVALS = [
    { id: 0, label: '1d' },
    { id: 1, label: '3d' },
    { id: 2, label: '1w' },
    { id: 3, label: '1m' },
    { id: 4, label: '1y' },
    { id: 5, label: 'Any' }
];

export const MODALITIES = [
    { id: 0, label: 'CT' },
    { id: 1, label: 'MR' },
    { id: 2, label: 'US' },
    { id: 3, label: 'PET' },
    { id: 4, label: 'XA' }
];

// buttons configuration
export const OPTIONS = [
    {
        onClick: () => {},
        icon: <ExportIcon />
    },
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
        menuItems: HOME_SETTINGS_MENU_ITEMS
    }
];
