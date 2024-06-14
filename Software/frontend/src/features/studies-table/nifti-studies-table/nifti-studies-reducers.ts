import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreStudiesSlice, INiftiTableStudy, INiftiStudyData } from '@/models';

const niftiStudiesReducers = {
    addNiftiStudies: (state: IStoreStudiesSlice, action: PayloadAction<INiftiTableStudy[]>) => {
        state.niftiStudies = action.payload;
    },
    addNiftiStudy: (state: IStoreStudiesSlice, action: PayloadAction<INiftiTableStudy>) => {
        state.niftiStudies.push(action.payload);
    },
    removeNiftiStudy: (state: IStoreStudiesSlice, action: PayloadAction<string>) => {
        state.niftiStudies = state.niftiStudies.filter((study) => study.fileName !== action.payload);
    },
    setSelectedNiftiStudy: (state: IStoreStudiesSlice, action: PayloadAction<INiftiStudyData>) => {
        state.selectedNiftiStudy = action.payload;
    }
};

export default niftiStudiesReducers;
