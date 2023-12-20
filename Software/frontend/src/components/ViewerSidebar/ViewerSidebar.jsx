import {useTheme} from "@mui/material/styles";
import {useLocation} from "react-router-dom";

import {Box} from "@mui/material";
import StudyCard from "./StudyCard.jsx";
import "../../helpers/getMetadata.js"
import CustomLinearProgress from "../LoadingBars/styles";

import * as metadata from "../../helpers/getMetadata.js"
import {useEffect, useState} from "react";

const ViewerSidebar = ({className, sx, children}) => {
    const theme = useTheme();
    const location = useLocation();
    const [allSeriesData, setAllSeriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const urlParams = new URLSearchParams(location.search);
    const studyInstanceUID = urlParams.get('StudyInstanceUID');

    useEffect(() => {
        metadata.getSeriesInStudy(studyInstanceUID).then((allSeries) => {
            let seriesData = metadata.parseSeriesMetadata(allSeries);
            setAllSeriesData(seriesData);
            setLoading(false);
        });
    }, [studyInstanceUID]);

    console.log(allSeriesData)
    return (
        <Box
            className={`${className}`}
            sx={{
                backgroundColor: theme.palette.primary.dark,
            }}
        >
            {loading &&  <CustomLinearProgress variant={"indeterminate"} /> }
            {allSeriesData.length > 0 && <StudyCard studyData={allSeriesData}/>}
        </Box>
    )
};

export default ViewerSidebar;
