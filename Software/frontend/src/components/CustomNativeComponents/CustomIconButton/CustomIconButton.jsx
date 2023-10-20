import * as React from "react";

// MUI
import {IconButton, Popover, useTheme} from "@mui/material";

// Icons
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

// Theme
import {tokens} from "../../../assets/theme/theme.js";

// Custom
import SettingsPopover from "../../Topbars/Popovers/SettingsPopover";


const CustomIconButton = ({sx, icon ,doPopDown = false, children, onClick}) => {

    const theme = useTheme();
    const colorMode = theme.palette.mode;
    const colors = tokens(colorMode);


    const customStyle = {
        ...sx,
        borderRadius: "0.2rem",
        border: "1px solid" + `${colorMode === 'dark'? colors.primary[600] : colors.primary[800]}`,
        backgroundColor: colorMode === 'dark' ? colors.primary[400] : colors.primary[900],
    }

    // the anchor element is the element that the popover is attached to
    const [anchorElement, setAnchorElement] = React.useState(null);

    const handlePopoverClose = () => {
        setAnchorElement(null);
    };

    const handleClickOnArrowDownButton = (event) => {
        setAnchorElement(event.currentTarget);
    };

    // open is true if the anchor element is not null, it's used to open the popover
    const open = Boolean(anchorElement);

    return (
        <div>
            <IconButton
                sx={{...customStyle}}
                onClick={onClick}
            >
                {/* the component contains the icon and if popDown is true it has a popover element activated */}
                {icon}

                {
                    doPopDown &&
                    <ArrowDropDownOutlinedIcon onClick={handleClickOnArrowDownButton}/>
                }

            </IconButton>

            <SettingsPopover open={open} anchorEl={anchorElement} closePopoverHandler={handlePopoverClose}/>

        </div>
    );
};

export default CustomIconButton;
