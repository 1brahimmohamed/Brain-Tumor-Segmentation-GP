import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {Box, IconButton, InputLabel, MenuItem, Select, Slider, Tooltip} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp.js";
import {IoBrushOutline} from "react-icons/io5";
import {LuPaintbrush} from "react-icons/lu";
import {LuEraser} from "react-icons/lu";
import {LuShapes} from "react-icons/lu";
import {IoIosOptions} from "react-icons/io";
import GeneralCustomIconButton from "../../CustomNativeComponents/CustomIconButtons/GeneralCustomIconButton.jsx";

const SegmentationDataTab = () => {
    const theme = useTheme();

    const [isCardOpen, setIsCardOpen] = useState(true);
    const [segmentation, setSegmentation] = useState('Segmentation 2');

    const handleChange = (event) => {
        setSegmentation(event.target.value);
    };
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
                    Segmentation
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

                    <Box className={"flex w-full"}>
                        <Select
                            labelId="demo-simple-select-label"
                            label="Segmenation"
                            value={segmentation}
                            fullWidth
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Segmentation 1</MenuItem>
                            <MenuItem value={20}>Segmentation 2</MenuItem>
                            <MenuItem value={30}>Segmentation 3</MenuItem>
                        </Select>

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

export default SegmentationDataTab
