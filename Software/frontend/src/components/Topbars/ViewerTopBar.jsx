import {useContext} from "react";

// MUI
import {Box, IconButton, InputBase, useTheme}  from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";

// Theme
import {ColorModeContext, tokens} from "../../assets/theme/theme";


const ViewerTopbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box className={"flex justify-between p-2 w-full"}>
            <Box
                className={"flex rounded-xl"}
                backgroundColor={colors.primary[400]}
            >
                <InputBase className={"ml-2 flex-1"} placeholder={"Search"} />
                <IconButton type={"button"} className={"p-1"}>
                    <SearchIcon />
                </IconButton>
            </Box>
           <Box className={"flex"}>
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
