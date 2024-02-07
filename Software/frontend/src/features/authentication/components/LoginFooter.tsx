// MUI imports
import {IconButton, Tooltip, useTheme} from "@mui/material";

// icons
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "@/redux/store.ts";
import {uiSliceActions} from "@ui/ui-slice.ts";


const LoginFooter = () => {

    const theme = useTheme();
    const dispatch = useDispatch<TAppDispatch>();

    const handleColorModeChange = () => {
        dispatch(uiSliceActions.toggleTheme());
    };

    return (
        <div>

            {/* Dark Mode Toggle Button */}
            <Tooltip title={"Toggle Dark Mode"}>

                <IconButton
                    onClick={handleColorModeChange}
                    // alt={"Toggle color mode"}
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
