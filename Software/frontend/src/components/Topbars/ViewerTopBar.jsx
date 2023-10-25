import {useContext} from "react";
import {Link} from "react-router-dom";

// MUI
import {Box, IconButton, InputBase, useTheme}  from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationImportantOutlined from "@mui/icons-material/NotificationImportantOutlined";
import ContrastIcon from '@mui/icons-material/Contrast';
import GridViewIcon from '@mui/icons-material/GridView';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PanToolIcon from '@mui/icons-material/PanTool';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import PolylineIcon from '@mui/icons-material/Polyline';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import HistoryIcon from '@mui/icons-material/History';
import PreviewIcon from '@mui/icons-material/Preview';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
// Theme
import {ColorModeContext, tokens} from "../../assets/theme/theme";
import Logo from "../Logo/Logo.jsx";
import NavLogo from "../Logo/NavLogo.jsx";
import ViewerCustomIconButton from "../CustomNativeComponents/CustomIconButtons/ViewerCustomIconButton.jsx";


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
                    <ViewerCustomIconButton icon={<ContrastIcon />} text={"Window"}/>
                    <ViewerCustomIconButton icon={<PanToolIcon />}  text={"Pan"}/>
                    <ViewerCustomIconButton icon={<ZoomInIcon />} text={"Zoom"}/>
                    <ViewerCustomIconButton icon={<RotateLeftIcon />} text={"Rotate"}/>
                    <ViewerCustomIconButton icon={<PolylineIcon />} text={" Segmentation"} isClickable={false}/>
                    <ViewerCustomIconButton icon={<GridViewIcon />} text={"Layout"} isClickable={false}/>
                    <ViewerCustomIconButton icon={<ZoomOutMapIcon />} text={"Full Screen"} doPopDown={false}/>
                    <ViewerCustomIconButton icon={<ViewComfyIcon />} text={" Thumbnails"} isClickable={false}/>
                    <ViewerCustomIconButton icon={<VerticalAlignBottomIcon />} text={"Export"}/>
                    <ViewerCustomIconButton icon={<PreviewIcon />} text={"Info"} doPopDown={false}/>
                    <ViewerCustomIconButton icon={<ViewInArIcon />} text={"3D"} doPopDown={false}/>
                    <ViewerCustomIconButton icon={<HistoryIcon />} text={"Reset"} doPopDown={false} isClickable={false}/>
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
