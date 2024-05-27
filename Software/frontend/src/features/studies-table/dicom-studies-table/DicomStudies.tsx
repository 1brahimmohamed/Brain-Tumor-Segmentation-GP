import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fetchDicomStudiesThunk } from '@features/studies-table/dicom-studies-table/dicom-studies-actions.ts';
import { IStore } from '@models/store.ts';
import { TAppDispatch } from '@/redux/store.ts';
import DicomStudiesTable from '@features/studies-table/dicom-studies-table/DicomStudiesTable.tsx';

const DicomStudies = () => {
    const dispatch = useDispatch<TAppDispatch>();

    useEffect(() => {
        dispatch(fetchDicomStudiesThunk());
    }, []);

    const { dicomStudies } = useSelector((store: IStore) => store.studies);

    return (
        <Box className={'flex-col mt-4 space-y-5'}>
            <Box className={'h-3/4'}>
                <DicomStudiesTable data={dicomStudies} />
            </Box>
        </Box>
    );
};

export default DicomStudies;
