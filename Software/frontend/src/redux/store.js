import {combineReducers, configureStore} from "@reduxjs/toolkit";
import homepageReducer from "./reducers/homepageReducer.js"
import viewerpageReducer from "./reducers/viewerpagereducer.js";


const store = configureStore({
    reducer: {
        homepage: homepageReducer,
        viewerpage: viewerpageReducer
    }
})


export default store;
