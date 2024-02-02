import {Box} from "@mui/material";
import StartIcon from '@mui/icons-material/Start';
import {useDispatch, useSelector} from "react-redux";
import {toggleSegmentationTab} from "../../../redux/reducers/viewerpagereducer.js";
const SegmentationSidebarHeader = ({}) => {

    const {
        isSegmentationTabOpen
    } = useSelector((store)=> store.viewerpage)

    const dispatch = useDispatch();

    const toggleSidebarHandler = () => {
        dispatch(toggleSegmentationTab())
    }

    return (
        <Box className={"flex justify-between text-base cursor-pointer py-1 bg-AASecondShade"} onClick={toggleSidebarHandler}>

            <Box className={"text-AAprimary mx-1"}>
                {
                    isSegmentationTabOpen ?
                        <StartIcon className={'transform rotate-180'}/> :  <StartIcon/>
                }
            </Box>

            <Box className={"flex w-11/12 justify-center px-2"}>
                <Box className={"whitespace-nowrap truncate"}>
                    Segmentation
                </Box>
            </Box>

        </Box>
    )
}

export default SegmentationSidebarHeader
