import { Box } from '@mui/material';
import CornerstoneViewport from "../../components/CornerstoneViewport/CornerstoneViewport.jsx";
import ViewerSidebar from "../../components/ViewerSidebar/StudySidebar/ViewerSidebar.jsx";
import SegmentationSidebar from "../../components/ViewerSidebar/SegmentationSidebar/SegmentationSidebar.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleSegmentationTab} from "../../redux/reducers/viewerpagereducer.js";

const RegularViewer= () => {

    const {
        isSegmentationTabOpen
    } = useSelector((store)=> store.viewerpage)

    return (

        // left Sidebar Layout
        <Box className={"flex w-full"}>

            {/* Sidebar*/}
            <ViewerSidebar className={"w-60 h-[94vh]"}/>

            {/* Body*/}
            <Box className={`flex-1 bg-black h-[94vh] ${isSegmentationTabOpen ? 'mr-60' : ''} transition-transform duration-500`}>
                <CornerstoneViewport/>
            </Box>


            <SegmentationSidebar
                id={"slidingSegmentation"}
                className={`fixed right-0 w-60 h-[94vh] bg-black bg-opacity-50 transition-transform duration-500 transform 
                ${isSegmentationTabOpen? '': 'translate-x-52'} `}
            />

        </Box>

        // right Sidebar Layout
        // <Box className={"flex w-full"}>
        //     {/* Body*/}
        //     <Box className={"flex-1 bg-black h-[94vh]"}>
        //         BODY
        //     </Box>
        //
        //     {/* Sidebar*/}
        //     <Box className={"w-60 h-[94vh]"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         SIDEBAR
        //     </Box>
        // </Box>

        // top Sidebar Layout
        // <Box className={"flex flex-col w-full"}>
        //
        //     {/* Sidebar*/}
        //     <Box className={"h-64"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         TOP BAR
        //     </Box>
        //
        //     {/* Body*/}
        //     <Box className={"flex-2 bg-black h-[94vh]"}>
        //         BODY
        //     </Box>
        // </Box>

        // Bottom Sidebar Layout
        // <Box className={"flex flex-col w-full h-screen"}>
        //
        //     {/* Body*/}
        //     <Box className={"flex-1 bg-black"}>
        //         BODY
        //     </Box>
        //
        //     {/* Sidebar*/}
        //     <Box className={"h-64"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         BOTTOM BAR
        //     </Box>
        // </Box>

    );
};

export default RegularViewer;
