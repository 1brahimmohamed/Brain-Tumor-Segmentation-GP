import {Box} from "@mui/material";
import {helpers} from "../../helpers/index.js";
import React from "react";
import {useSelector} from "react-redux";

const ViewportFrame = ({children}) => {

    let {
        isInfoShow
    } = useSelector((store)=> store.viewerpage)

    return (
        <div className={"m-0.5 relative"} style={{width: "100%", height: 425}}>

            <div className="absolute w-full h-full">
                {children}
            </div>

            {
                isInfoShow &&
                <div>
                    <div className="absolute p-2 rounded">
                        <Box> patientName </Box>
                        <Box> patientId </Box>
                    </div>

                    <div className="absolute right-10 p-2 rounded text-right">
                        <Box> studyDescription </Box>
                        <Box> studyDate studyTime </Box>
                    </div>

                    <div className="absolute bottom-1 p-2 rounded">
                        <Box>Zoom: zoomPercentage %</Box>
                        <Box> windowWidthLengthStr </Box>
                        <Box className="compressionIndicator">compressionType</Box>
                    </div>

                    <div className="absolute bottom-1 right-10 p-2 rounded text-right">
                        <Box>Ser: seriesNumber </Box>
                        <Box>
                            Img: instanceNumber
                        </Box>
                        <Box>
                            <Box>imageDimensionsStr</Box>
                            <Box>seriesDescription</Box>
                        </Box>
                    </div>
                </div>
            }


        </div>
    );
};

export default ViewportFrame;
