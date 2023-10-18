import {Box, IconButton, InputBase, useTheme}  from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../../assets/theme/theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";
import SearchIcon from "@mui/icons-material/Search";


const Topbar = () => {

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

export default Topbar;
