import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { Theme } from '@mui/material';
import { TAppDispatch } from '@/redux/store.ts';
import { useDispatch } from 'react-redux';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationImportantOutlined from '@mui/icons-material/NotificationImportantOutlined';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import { languageMenuOptions, settingMenuOptions } from '@features/top-bars/HomeTopBar/options-menu-lists.ts';

const RightOptions = ({ theme }: { theme: Theme }) => {

    const dispatch = useDispatch<TAppDispatch>();

    const handleColorModeChange = () => {
        dispatch(uiSliceActions.toggleTheme());
    };

    const handleLanguageChange = (lang: string) => {
        dispatch(uiSliceActions.setCurrentLanguage(lang));
    };

    const handleSettingsItemClick = (setting: string) => {
        switch (setting) {
            case 'About':
                // dispatch(uiSliceActions.toggleSettings());
                break;
            case 'License Agreement':
                // dispatch(uiSliceActions.toggleProfile());
                break;
            case 'Help':
                // dispatch(uiSliceActions.toggleSettings());
                break;
            case 'Logout':
                // dispatch(uiSliceActions.toggleLogout());
                break;
            default:
                break;
        }
    };


    return (
        <>
            <CustomButton
                onClick={() => {
                }}
                icon={<VerticalAlignBottomIcon />}
            />

            <CustomButton
                onClick={() => {
                }}
                icon={<NotificationImportantOutlined />}
            />


            <CustomButton
                onClick={handleColorModeChange}
                icon={theme.palette.mode === 'dark' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)}
            />

            <CustomButton
                onClick={handleLanguageChange}
                icon={<TranslateIcon />}
                menuItems={languageMenuOptions}
            />

            <CustomButton
                onClick={handleSettingsItemClick}
                icon={<SettingsOutlinedIcon />}
                menuItems={settingMenuOptions}
            />

        </>
    );
};

export default RightOptions;
