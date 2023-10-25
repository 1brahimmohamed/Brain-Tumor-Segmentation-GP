import * as React from "react";

// MUI
import {MenuItem, Popover, useTheme} from "@mui/material";

// Theme
import {tokens} from "../../../../assets/theme/theme.js";


const GeneralSettingsPopover = ({anchorElement, open, closePopoverHandler}) => {

    const theme = useTheme();
    const colorMode = theme.palette.mode;
    const colors = tokens(colorMode);

    const id = open ? 'simple-popover' : undefined;

    const popDownStyle = {
        backgroundColor: colorMode === 'dark' ? colors.primary[400] : colors.grey[900],
        '&:hover': {
            backgroundColor: colors.blue[500],
        },
    }

    return (

        <Popover
            className={"mt-3 ml-2"}
            id={id}
            open={open}
            onClose={closePopoverHandler}
            anchorEl={anchorElement}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}

            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem sx={popDownStyle}>
                About
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                License Agreement
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                Support
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                Logout
            </MenuItem>

        </Popover>
    )
};

export default GeneralSettingsPopover;
