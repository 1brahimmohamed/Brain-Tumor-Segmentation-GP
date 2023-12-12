// MUI
import {Box, MenuItem, Popover, useTheme} from "@mui/material";

// Theme
import {tokens} from "../../../../assets/theme/theme.js";

import InvertColorsIcon from '@mui/icons-material/InvertColors';
const ViewerPopover = ({anchorElement, open, closePopoverHandler, popDownChildren}) => {

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
            {
                popDownChildren.map((child, index) => {
                    return (
                        <MenuItem
                            key={index}
                            sx={popDownStyle}
                            onClick={child.onClickAction}
                        >
                           <div className={"mr-2"}>
                               {child.icon}
                           </div>
                            <div>
                                 {child.text}
                            </div>
                        </MenuItem>
                    )
                })
            }

        </Popover>
    )
};

export default ViewerPopover;
