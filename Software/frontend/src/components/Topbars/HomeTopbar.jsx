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
import {ColorModeContext, tokens} from "../../assets/theme/theme";

// Custom Components
import GeneralCustomIconButton from "../CustomNativeComponents/CustomIconButtons/GeneralCustomIconButton.jsx";
import DateRangesButtonsGroup from "../../pages/Home/Components/DateRangesButtonsGroup/DateRangesButtonsGroup";
import ModalityButtonsGroup from "../../pages/Home/Components/ModalityButtonsGroup/ModalityButtonsGroup";


const { RangePicker } = DatePicker;

const HomeTopbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box className={"flex justify-between w-full"}>

            {/* Left Side */}
            <Box className={"flex"}>
                {/* Date Picker */}
                <Box className={"flex"} >
                    <RangePicker
                        allowClear={false}
                        style={{
                            color: "white",
                            backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : colors.primary[900],
                            border: "1px solid" + `${theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[800]}`,
                        }}
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
