import { createSlice } from '@reduxjs/toolkit';
import { IStoreStudiesSlice } from '@models/store.ts';
import dicomStudiesReducers from '@features/studies-table/dicom-studies-table/dicom-studies-reducers.ts';
import niftiStudiesReducers from '@features/studies-table/nifti-studies-table/nifti-studies-reducers.ts';
import filterStudiesReducers from '@features/studies-table/filter-reducers.ts';

const initialState: IStoreStudiesSlice = {
    dicomStudies: [],
    selectedDicomStudy: null,
    niftiStudies: [],
    selectedNiftiStudy: null,
    startDateFilter: null,
    endDateFilter: null,
    filterPeriod: 'Any',
    selectedModalities: []
};

const studiesSlice = createSlice({
    name: 'studies',
    initialState: initialState,
    reducers: {
        ...dicomStudiesReducers,
        ...niftiStudiesReducers,
        ...filterStudiesReducers
    }
});

export const studiesSliceActions = studiesSlice.actions;
export default studiesSlice;
