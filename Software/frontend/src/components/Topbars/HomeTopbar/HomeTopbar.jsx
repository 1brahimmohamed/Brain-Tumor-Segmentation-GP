import {useContext} from "react";
import { DatePicker } from 'antd';

// MUI
import {Box, useTheme} from "@mui/material";

// Icons
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// Theme
import {ColorModeContext} from "../../../assets/theme/theme.js";

// Custom Components
import GeneralCustomIconButton from "../../CustomNativeComponents/CustomIconButtons/GeneralCustomIconButton.jsx";
import DateRangesButtonsGroup from "../../../pages/Home/Components/DateRangesButtonsGroup/DateRangesButtonsGroup.jsx";
import ModalityButtonsGroup from "../../../pages/Home/Components/ModalityButtonsGroup/ModalityButtonsGroup.jsx";

import '../../../styles/DateRange.scss'



const { RangePicker } = DatePicker;

const HomeTopbar = () => {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box className={"flex justify-between w-full"}>

            {/* Left Side */}
            <Box className={"flex"}>

                {/* Date Picker */}
                <Box className={"flex"} >
                    <RangePicker
                        className={`createDateRangePicker ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                        popupClassName={`createDateRangePickerPopup ${theme.palette.mode === 'light' ? 'light-mode' : ''}`}
                        allowClear={true}
                    />
                </Box>

                {/* Date Ranges Buttons */}
                <Box className={"flex ml-2 "} >
                    <DateRangesButtonsGroup />
                </Box>

                {/* Modality Buttons */}
                <Box className={"flex ml-2 "} >
                    <ModalityButtonsGroup />
                </Box>
            </Box>

            {/* Right Side */}
            <Box className={"flex space-x-1"}>

                <GeneralCustomIconButton
                    icon={ <VerticalAlignBottomIcon/>}
                />

                <GeneralCustomIconButton
                    icon={<NotificationImportantOutlined/>}
                />

                <GeneralCustomIconButton
                    icon={
                            theme.palette.mode === 'dark' ?
                                (<LightModeOutlinedIcon/>) :
                                (<DarkModeOutlinedIcon/>)
                    }
                    onClick={colorMode.toggleColorMode}
                />

                <GeneralCustomIconButton
                    doPopDown={true}
                    icon={<SettingsOutlinedIcon/>}
                />
            </Box>
        </Box>
    )
};

export default HomeTopbar;
