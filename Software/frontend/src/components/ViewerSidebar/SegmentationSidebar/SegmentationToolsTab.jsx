import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {Box, IconButton, Slider, Tooltip} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp.js";
import {IoBrushOutline} from "react-icons/io5";
import {LuPaintbrush} from "react-icons/lu";
import {LuEraser} from "react-icons/lu";
import {LuShapes} from "react-icons/lu";
import {IoIosOptions} from "react-icons/io";
import GeneralCustomIconButton from "../../CustomNativeComponents/CustomIconButtons/GeneralCustomIconButton.jsx";

const SegmentationToolsTab = () => {
    const theme = useTheme();

    const [isCardOpen, setIsCardOpen] = useState(true);

    const StudyArrowClickHandler = () => {
        setIsCardOpen(!isCardOpen);
    };

    return (
        <Box>

            {/* Card Header */}
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.lighter,
                }}
                className={"flex justify-between items-center text-base cursor-pointer px-2 py-2"}
                onClick={StudyArrowClickHandler}>

                <Box className={"text-sm"}>
                    Segmentation Tools
                </Box>

                <Box>
                    {
                        isCardOpen ? <KeyboardArrowDownIcon/> :
                            <KeyboardArrowUpIcon/>
                    }
                </Box>
            </Box>


            {/* Middle bar */}

            {
                isCardOpen &&
                <Box className={"p-3"}>

                    <Box className={"flex text-base justify-between  cursor-pointer"}>

                        <GeneralCustomIconButton icon={<IoBrushOutline/>} tooltipName={"Brush"}/>

                        <GeneralCustomIconButton icon={<LuEraser/>} tooltipName={"Eraser"}/>

                        <GeneralCustomIconButton icon={<LuShapes/>} tooltipName={"Shapes"}/>

                        <GeneralCustomIconButton icon={<IoIosOptions/>} tooltipName={"Options"}/>
                    </Box>

                    <Box className={"mt-4"}>
                        <Box className={"flex-col items-center"}>
                            <Box className={"flex justify-between"}>
                                <Box>
                                    Radius (mm)
                                </Box>
                                <Box>
                                    Value
                                </Box>
                            </Box>

                            <Box>
                                <Slider
                                    size="small"
                                    defaultValue={15}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                />
                            </Box>
                        </Box>
                        <Box className={"flex justify-between"}>
                            <Box>
                                Mode
                            </Box>
                            <Box>
                                Circle
                                Sphere
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }

        </Box>
    );
}

export default SegmentationToolsTab
