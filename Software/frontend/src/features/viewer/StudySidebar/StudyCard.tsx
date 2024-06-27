import { useEffect, useState } from 'react';
import SeriesCard from './SeriesCard.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useDispatch } from 'react-redux';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { IDicomSeriesData, IDicomStudyData } from '@/models';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const StudyCard = ({ studyData }: { studyData: IDicomStudyData }) => {
    const theme = useTheme();

    const [isStudyOpen, setIsStudyOpen] = useState(true);
    const [selectedSeries, setSelectedSeries] = useState(0);

    const dispatch = useDispatch();

    const StudyArrowClickHandler = () => {
        setIsStudyOpen(!isStudyOpen);
    };

    useEffect(() => {
        dispatch(viewerSliceActions.setStudyData(studyData.series));
    }, [studyData]);

    const seriesSelectHandler = (index: number, seriesInstanceUid: string) => {
        dispatch(viewerSliceActions.setClickedSeries(seriesInstanceUid));
        setSelectedSeries(index);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.lighter
            }}
        >
            {/* Study Card Header */}
            <Box className={'flex justify-between text-base cursor-pointer'} onClick={StudyArrowClickHandler}>
                <Box className={'text-AAPrimary'}>
                    {isStudyOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </Box>

                <Box className={'flex w-11/12 justify-between px-2'} title={studyData.patientName}>
                    <Box className={'w-11/12 whitespace-nowrap truncate'}>{studyData.patientName}</Box>
                    <Box>
                        <CloseIcon />
                    </Box>
                </Box>
            </Box>

            {/* Study Middle Par */}
            <Box
                className={'flex text-base justify-between p-2 cursor-pointer'}
                onClick={StudyArrowClickHandler}
            >
                <Box>
                    <Box className={'text-lg font-bold text-AAPrimary'}>{studyData.modality}</Box>

                    <Box className={'text-sm'} title={studyData.studyDate}>
                        {studyData.studyDate}
                    </Box>
                </Box>

                <Box>
                    <Box>
                        <PermMediaIcon fontSize={'small'} />
                    </Box>
                    <Box>{studyData.studyTotalInstances}</Box>
                </Box>
            </Box>

            {isStudyOpen && (
                <Box className={'max-h-[84vh] overflow-y-auto'}>
                    {studyData.series.map((series: IDicomSeriesData, index: number) => {
                        return (
                            <SeriesCard
                                key={index}
                                seriesIndex={index}
                                selectedIndex={selectedSeries}
                                seriesData={series}
                                onSelectedSeriesChange={seriesSelectHandler}
                            />
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default StudyCard;
