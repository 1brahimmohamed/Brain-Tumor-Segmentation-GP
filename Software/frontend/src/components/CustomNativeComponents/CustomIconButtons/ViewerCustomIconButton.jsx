import {useEffect, useState} from "react";

// MUI
import {IconButton, Box, useTheme} from "@mui/material";

// Icons
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';


import ViewerPopover from "./Popovers/ViewerPopover.jsx";
import {useDispatch, useSelector} from "react-redux";

import {setRightMouseTool, setLeftMouseTool, setMouseWheelTool, reset, toggleInfo} from "../../../redux/reducers/viewerpagereducer"

const ViewerCustomIconButton = ({sx, icon , text, onClickAction, toolName, doPopDown = true, isClickable = true, popDownChildren = []}) => {

    const theme = useTheme();

    // the anchor element is the element that the popover is attached to
    const [anchorElement, setAnchorElement] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const {
        rightMouseTool,
        leftMouseTool,
        mouseWheelTool,
    } = useSelector((store) => store.viewerpage )

    const dispatch = useDispatch();

    useEffect(() => {
        if (isClickable){
            if (toolName === rightMouseTool || toolName === leftMouseTool || toolName === mouseWheelTool )
                setIsClicked(true)
            else
                setIsClicked(false)
        }

    }, [rightMouseTool,leftMouseTool, mouseWheelTool]);

    console.log(rightMouseTool, leftMouseTool, mouseWheelTool)
    const customStyle = {
        ...sx,
        borderRadius: "0",
        height: "4.1rem",
        width: "4rem",
        display: "flex",
        marginLeft: "0.2rem",
        overflow: "hidden",

        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    }

    const handlePopoverClose = () => {
        setAnchorElement(null);
    };

    const onArrowDownButtonHandler = (event) => {
        setIsClicked(false)
        setAnchorElement(event.target.parentNode.parentNode);
    };

    const onButtonClickHandler = (event) => {
        if (text === "Reset"){
            dispatch(reset())
            return;
        }

        if (text === "Info"){
            dispatch(toggleInfo())
            return;
        }

        if (event.button === 1)
            dispatch(setMouseWheelTool(toolName))
        else if (event.button === 2)
            dispatch(setRightMouseTool(toolName))
        else
            dispatch(setLeftMouseTool(toolName))
    };

    // open is true if the anchor element is not null, it's used to open the popover
    const open = Boolean(anchorElement);

    return (
        <div>
            <IconButton
                sx={{...customStyle}}
            >

                {/* Icon & Text */}
               <Box
                   onMouseDown={onButtonClickHandler}
                   className={"flex flex-col w-full justify-center"}
               >
                   <div className={`${isClickable? (isClicked? "text-blue-500" : ""): ""}`}>{icon}</div>
                   <div className={"text-xs truncate"}>{text}</div>

               </Box>

                {/* the component contains the icon and if popDown is true it has a popover element activated */}
                {
                    doPopDown &&

                    <Box className={"flex flex-col justify-center h-full"}>
                        <ArrowDropDownOutlinedIcon
                            onClick={onArrowDownButtonHandler}
                            sx={{color: theme.palette.secondary.main}}
                        />
                    </Box>
                }

            </IconButton>

            {/* Popover if doPopDown is activated */}
            {
                doPopDown &&
                <ViewerPopover
                    open={open}
                    anchorElement={anchorElement}
                    closePopoverHandler={handlePopoverClose}
                    popDownChildren={popDownChildren}
                />
            }

        </div>
    );
};

export default ViewerCustomIconButton;
