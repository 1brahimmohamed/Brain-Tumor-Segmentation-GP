// MUI
import {Box, MenuItem, Popover, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setLeftMouseTool} from "../../../../redux/reducers/viewerpagereducer"

const ViewerPopover = ({anchorElement, open, closePopoverHandler,popDownChildren}) => {

    const theme = useTheme();

    const id = open ? 'simple-popover' : undefined;

    const dispatch = useDispatch();

    const {
        rightMouseTool,
        leftMouseTool,
        mouseWheelTool,
    } = useSelector((store) => store.viewerpage )


    const popDownStyle = {

        backgroundColor: theme.palette.primary.lighter,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    }

    const onMouseDownHandler = (action, toolName, event) => {
        action()
        dispatch(setLeftMouseTool(toolName))
        closePopoverHandler()
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
                            onClick={(e)=> onMouseDownHandler(child.onClickAction, child.toolName, e)}
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
