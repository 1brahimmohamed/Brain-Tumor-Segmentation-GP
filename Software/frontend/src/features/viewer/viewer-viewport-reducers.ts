import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';
import { AxiosUtil } from '@/utilities';
import { IStudyReport } from '@/models';

const orthanc_url = import.meta.env.VITE_ORTRHANC_PROXY_URL || 'http://localhost:8042';

const viewerViewportReducer = {
    setCurrentStudy(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.currentStudyInstanceUid = action.payload;
    },
    setClickedSeries(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.selectedSeriesInstanceUid = action.payload;
    },
    removeClickedSeries(state: IStoreViewerSlice) {
        state.selectedSeriesInstanceUid = '';
    },
    setSelectedViewport(state: IStoreViewerSlice, action: PayloadAction<string>) {
        state.selectedViewportId = action.payload;
    },
    removeClickedViewport(state: IStoreViewerSlice) {
        state.selectedViewportId = '';
    },
    setStudyData(state: IStoreViewerSlice, action: PayloadAction<any>) {
        state.studyData = action.payload;
    },
    setSelectedStudyReports: (state: IStoreViewerSlice, action: PayloadAction<IStudyReport[]>) => {
        state.selectedStudyReports = action.payload;
    }
};

// Thunk to get series instances
export const getAndSetSeriesInstances = async (
    currentStudyInstanceUid: string,
    seriesInstanceUID: string
) => {
    let SOPinstanceUIDs: string[] = [];

    await AxiosUtil.sendRequest({
        method: 'GET',
        url: `${orthanc_url}/studies/${currentStudyInstanceUid}/series/${seriesInstanceUID}/metadata`
    })
        .then((metadata) => {
            for (let i = 0; i < metadata.length; i++) {
                SOPinstanceUIDs.push(metadata[i]['00080018'].Value[0]);
            }
        })
        .catch((error) => {
            console.error('Error fetching series instances:', error);
        });

    return SOPinstanceUIDs;
};

// Thunk to get series metadata
export const getSeriesModality = async (studyInstanceUID: string, seriesInstanceUID: string) => {
    let Modality = '';

    // Fetch series metadata from the backend
    await AxiosUtil.sendRequest({
        method: 'GET',
        url: `${orthanc_url}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/metadata`
    })
        .then((metadata) => {
            Modality = metadata[0]['00080060'].Value[0];
        })
        .catch((error) => {
            console.error('Error fetching series metadata:', error);
        });

    return Modality;
};

export default viewerViewportReducer;
