import {useContext} from "react";
import {Link} from "react-router-dom";

// MUI
import {Box, IconButton, InputBase, useTheme}  from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";
// Theme
import {ColorModeContext, tokens} from "../../assets/theme/theme";
import NavLogo from "../Logo/NavLogo.jsx";
import ViewerCustomIconButton from "../CustomNativeComponents/CustomIconButtons/ViewerCustomIconButton.jsx";

import ViewerTopbarOptions  from "./ViewerTopbarOptions.jsx";

const ViewerTopbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            className={"flex justify-between w-full"}
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
                height: "4.1rem",
            }}
        >

            <Box className={"ml-9 flex"}>

                {/* Logo */}
                <Box className={"w-44 bg-transparent p-2"}>
                    <Link to={"/"}>
                        <NavLogo />
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
                                />
                            )
                        })
                    }
                </Box>
            </Box>

            {/* Icons */}

            <Box className={"flex mr-4"}>
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

    )
};

export default ViewerTopbar;
