import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isDisplayingDicom: true,
    isDataLoading: false,
    filterStartDate: null,
    filterEndDate: null,
    filterPeriod: 'Any',
    selectedModalities: [],
}


const homepageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        changeDisplayedDataTable(state, action) {
            state.isDisplayingDicom = !state.isDisplayingDicom;
        },
        setDateFilter(state, action) {

            if (action.payload.period) {
                state.filterPeriod = action.payload.period
                return;
            }

            state.filterStartDate = action.payload.startDate
            state.filterEndDate = action.payload.endDate
        },
        addFilterModality(state, action) {
            state.selectedModalities.push(action.payload)
        },
        removeFilterModality(state, action) {
            state.selectedModalities = state.selectedModalities.filter(item => item !== action.payload)
        },
        setIsDataLoading(state, action){
            state.isDataLoading = action.payload
        }
    }
})

export const {
    changeDisplayedDataTable,
    setIsDataLoading,
    setDateFilter,
    addFilterModality,
    removeFilterModality,
} = homepageSlice.actions;


export default homepageSlice.reducer;
