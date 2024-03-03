import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import StudyCard from './StudyCard.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '@models/store.ts';
import { useEffect } from 'react';
import { fetchDicomStudyByIdThunk } from '@features/studies-table/dicom-studies-table/dicom-studies-actions.ts';
import { TAppDispatch } from '@/redux/store.ts';

const ViewerSidebar = ({ className }: { className?: string }) => {
    const theme = useTheme();
    const dispatch = useDispatch<TAppDispatch>();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const studyInstanceUID = urlParams.get('StudyInstanceUID');

        if (studyInstanceUID) {
            console.log(studyInstanceUID);
            dispatch(fetchDicomStudyByIdThunk(studyInstanceUID));
        }
    }, []);

    const { selectedDicomStudy } = useSelector((store: IStore) => store.studies);

    return (
        <Box
            className={`${className}`}
            sx={{
                backgroundColor: theme.palette.primary.dark
            }}
        >
            {selectedDicomStudy && <StudyCard studyData={selectedDicomStudy} />}
        </Box>
    );
};

export default ViewerSidebar;
