import {useState} from "react";
import {Box} from "@mui/material";
import SeriesCard from "./SeriesCard";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import PermMediaIcon from '@mui/icons-material/PermMedia';

import {useTheme} from "@mui/material/styles";

const StudyCard = ({ studyData }) => {

    const theme = useTheme();

    const [isStudyOpen, setIsStudyOpen] = useState(true);
    const [selectedSeries, setSelectedSeries] = useState(0);

    const getTotalNumberOfInstances = () => {
        let totalInstances = 0;
        studyData.forEach((series) => {
            totalInstances += series.numberOfInstances;
        });
        return totalInstances;
    };

    const StudyArrowClickHandler = () => {
        setIsStudyOpen(!isStudyOpen);
    };

    const seriesSelectHandler = (index) => {
        setSelectedSeries(index);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.lighter,
            }}
        >

            {/* Study Card Header */}
            <Box className={"flex justify-between text-base cursor-pointer"} onClick={StudyArrowClickHandler}>

                <Box className={"text-AAprimary"}>
                    {
                        isStudyOpen ? <KeyboardArrowDownIcon/> :
                            <KeyboardArrowUpIcon />
                    }
                </Box>

                <Box className={"flex w-11/12 justify-between px-2"} >
                    <Box className={"w-11/12 whitespace-nowrap truncate"}>
                        {studyData[0].patientName}
                    </Box>
                    <Box>
                        <CloseIcon />
                    </Box>
                </Box>

            </Box>


            {/* Study Middle Par */}
            <Box className={"flex text-base justify-between p-2 cursor-pointer"} onClick={StudyArrowClickHandler}>
                <Box>
                    <Box className={"text-lg font-bold text-AAprimary"}>
                        {studyData[0].modality}
                    </Box>

                    <Box className={"text-sm"}>
                        {studyData[0].studyDate}
                    </Box>
                </Box>

                <Box>
                    <Box>
                        <PermMediaIcon fontSize={"small"}/>
                    </Box>
                    <Box>
                        {getTotalNumberOfInstances()}
                    </Box>
                </Box>
            </Box>

            {
                isStudyOpen &&
                <Box className={"max-h-[84vh] overflow-y-auto"}>
                    {
                        studyData.map((series, index) => {
                            return (
                                <SeriesCard
                                    key={index}
                                    seriesIndex={index}
                                    selectedIndex={selectedSeries}
                                    seriesData={series}
                                    onSelectedSeriesChange={seriesSelectHandler}
                                />
                            );
                        })
                    }
                </Box>
            }
        </Box>
    );
};

export default StudyCard;
