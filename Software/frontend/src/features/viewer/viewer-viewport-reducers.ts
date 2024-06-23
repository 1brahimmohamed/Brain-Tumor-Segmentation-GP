import { PayloadAction } from '@reduxjs/toolkit';
import { IStoreViewerSlice } from '@/models';
import axios from 'axios';

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
    }
};

// Thunk to get series instances
export const getAndSetSeriesInstances = async (
    currentStudyInstanceUid: string,
    seriesInstanceUID: string
) => {
    let SOPinstanceUIDs: string[] = [];
    await axios
        .get(
            `${orthanc_url}/dicom-web/studies/${currentStudyInstanceUid}/series/${seriesInstanceUID}/metadata`
        )
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                SOPinstanceUIDs.push(response.data[i]['00080018'].Value[0]);
            }
        })
        .catch((error) => {
            console.error('Error fetching series instances:', error);
        });

    return SOPinstanceUIDs;
};

export default viewerViewportReducer;
