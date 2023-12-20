import {useContext} from 'react';

// MUI imports
import {IconButton, Tooltip, useTheme} from "@mui/material";

// icons
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

// theme colors
import { ColorModeContext } from "../../assets/theme/theme";

const LoginFooter = () => {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <div>

            {/* Dark Mode Toggle Button */}
            <Tooltip title={"Toggle Dark Mode"}>

                <IconButton
                    onClick={colorMode.toggleColorMode}
                    alt={"Toggle color mode"}
                >
                    {
                        theme.palette.mode === 'dark' ?
                            (<DarkModeOutlinedIcon/>) :
                            (<LightModeOutlinedIcon/>)
                    }
                </IconButton>

            </Tooltip>

            {/* Contact Support Button */}
            <Tooltip title={"Contact Support"}>

                <IconButton
                    onClick={() => console.log("Help")}
                >
                    <HelpOutlineOutlinedIcon/>
                </IconButton>

            </Tooltip>
        </div>
    )
};

export default LoginFooter;
