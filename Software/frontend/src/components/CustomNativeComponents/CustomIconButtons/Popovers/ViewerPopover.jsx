// MUI
import {Box, MenuItem, Popover, useTheme} from "@mui/material";

const ViewerPopover = ({anchorElement, open, closePopoverHandler, popDownChildren}) => {

    const theme = useTheme();

    const id = open ? 'simple-popover' : undefined;

    const popDownStyle = {

        backgroundColor: theme.palette.primary.lighter,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
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
