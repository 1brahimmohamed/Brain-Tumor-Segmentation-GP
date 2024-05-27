import store from '@/redux/store.ts';
import { uiSliceActions } from '@ui/ui-slice.ts';

const handleColorModeChange = () => {
    store.dispatch(uiSliceActions.toggleTheme());
};

const handleLanguageChange = (lang: string) => {
    store.dispatch(uiSliceActions.setCurrentLanguage(lang));
};

const handleSettingsItemClick = (setting: string) => {
    switch (setting) {
        case 'Settings':
            location.href = '/settings';
            break;
        case 'License Agreement':
            // TODO: Add license agreement modal.
            break;
        case 'Help':
            // TODO: redirect to help page.
            break;
        case 'Logout':
            // TODO: Add logout functionality.
            break;
        default:
            break;
    }
};

export { handleColorModeChange, handleLanguageChange, handleSettingsItemClick };
