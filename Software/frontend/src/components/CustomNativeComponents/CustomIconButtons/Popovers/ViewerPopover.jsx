// MUI
import {Box, MenuItem, Popover, useTheme} from "@mui/material";

// Theme
import {tokens} from "../../../../assets/theme/theme.js";

import InvertColorsIcon from '@mui/icons-material/InvertColors';
const ViewerPopover = ({anchorElement, open, closePopoverHandler}) => {

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
            id={id}
            open={open}
            onClose={closePopoverHandler}
            anchorEl={anchorElement}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}

            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem sx={popDownStyle}>
               <InvertColorsIcon className={"mr-2"}/>
                <Box>
                    Feature 1
                </Box>
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                <InvertColorsIcon className={"mr-2"}/>
                Feature 2
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                <InvertColorsIcon className={"mr-2"}/>
                Feature 3
            </MenuItem>

            <MenuItem sx={popDownStyle}>
                <InvertColorsIcon className={"mr-2"}/>
                Feature 4
            </MenuItem>

        </Popover>
    )
};

export default ViewerPopover;
