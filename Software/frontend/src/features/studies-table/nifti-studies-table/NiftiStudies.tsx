import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fetchNiftiStudiesThunk } from '@features/studies-table/nifti-studies-table/nifti-studies-actions.ts';
import { IStore } from '@models/store.ts';
import { TAppDispatch } from '@/redux/store.ts';
import NiftiStudiesTable from '@features/studies-table/nifti-studies-table/NiftiStudiesTable.tsx';

const NiftiStudies = () => {
    const dispatch = useDispatch<TAppDispatch>();

    useEffect(() => {
        dispatch(fetchNiftiStudiesThunk());
    }, []);

    const { niftiStudies } = useSelector((store: IStore) => store.studies);

    return (
        <Box className={'flex-col mt-4 space-y-5'}>
            <Box className={'h-3/4'}>
                <NiftiStudiesTable data={niftiStudies} />
            </Box>
        </Box>
    );
};

export default NiftiStudies;
