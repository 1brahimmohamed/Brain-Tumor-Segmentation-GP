import {useContext} from "react";
import {Link} from "react-router-dom";

// MUI
import {Box, IconButton, useTheme}  from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";

import {ColorModeContext} from "../../../assets/theme/theme.js";

import NavLogo from "../../Logo/NavLogo.jsx";
import ViewerCustomIconButton from "../../CustomNativeComponents/CustomIconButtons/ViewerCustomIconButton.jsx";
import ViewerTopbarOptions  from "./ViewerTopbarOptions.jsx";

const ViewerTopbar = () => {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            className={"flex justify-between w-full"}
            sx={{
                backgroundColor: theme.palette.primary.dark,
                height: "4.1rem",
            }}
        >

            <Box className={"ml-9 flex"}>

                {/* Logo */}
                <Box className={"w-44 bg-transparent p-2"}>
                    <Link to={"/"}>
                        <NavLogo  />
                    </Link>
                </Box>


                {/* Options Div */}
                <Box className={"ml-6 flex"} >
                    {
                        ViewerTopbarOptions.map((option, index) => {
                            return (
                                <ViewerCustomIconButton
                                    key={index}
                                    icon={option.icon}
                                    text={option.text}
                                    doPopDown={option.doPopDown}
                                    isClickable={option.isClickable}
                                    onClickAction={option.onClickAction}
                                    popDownChildren={option.children}
                                    toolName={option.toolName}
                                />
                            )
                        })
                    }
                </Box>
            </Box>

            {/* Icons */}

            <Box className={"flex items-center mr-4"}>
                <Box>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {
                            theme.palette.mode === 'dark' ?
                                ( <DarkModeOutlinedIcon/> ) :
                                ( <LightModeOutlinedIcon /> )
                        }
                    </IconButton>
                    <IconButton>
                        <NotificationImportantOutlined />
                    </IconButton>
                </Box>
           </Box>
        </Box>

    )
};

export default ViewerTopbar;
