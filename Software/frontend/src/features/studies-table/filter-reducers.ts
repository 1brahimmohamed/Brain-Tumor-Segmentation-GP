import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreStudiesSlice } from '@models/store.ts';


const filterStudiesReducers = {
    setDateFilter: (state: IStoreStudiesSlice, action: PayloadAction<{startDate: Date | null, endDate: Date | null}>) => {
        state.startDateFilter = action.payload.startDate;
        state.endDateFilter = action.payload.endDate;
    },
    setFilterPeriod: (state: IStoreStudiesSlice, action: PayloadAction<string>) => {
        state.filterPeriod = action.payload;
    },
    addFilterModality(state: IStoreStudiesSlice, action: PayloadAction<string>) {
        state.selectedModalities.push(action.payload);
    },
    removeFilterModality(state: IStoreStudiesSlice, action: PayloadAction<string>) {
        state.selectedModalities = state.selectedModalities.filter((modality) => modality !== action.payload);
    },
};

export default filterStudiesReducers;

