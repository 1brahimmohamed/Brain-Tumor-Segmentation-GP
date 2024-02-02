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
import {setDateFilter} from "../../../redux/reducers/homepageReducer.js"
import {useDispatch} from "react-redux";



const { RangePicker } = DatePicker;

const HomeTopbar = () => {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const dispatch = useDispatch()


    const rangePickerChangeHandler = (data) =>{

        if (!data) {
            dispatch(setDateFilter({
                startDate: null,
                endDate: null,
            }))

            return;
        }

        dispatch(setDateFilter({
            startDate: data[0].format('YYYY-MM-DD'),
            endDate: data[1].format('YYYY-MM-DD')
        }))

    }

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
                        onChange={rangePickerChangeHandler}
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
