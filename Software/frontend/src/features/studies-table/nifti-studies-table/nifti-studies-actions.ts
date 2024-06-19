import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { studiesSliceActions } from '@features/studies-table/studies-slice.ts';

const GATEWAY_URL = import.meta.env.VITE_SERVER_URL;

export const fetchNiftiStudiesThunk = () => {
    console.log(`fetching nifti studies from ${GATEWAY_URL}/nitfti/studies`);

    return async (dispatch: Dispatch) => {
        const studies = await AxiosUtil.sendRequest({
            method: 'GET',
            url: `${GATEWAY_URL}/nifti/studies`
        });

        if (!studies) {
            return;
        }

        dispatch(studiesSliceActions.addNiftiStudies(studies));
    };
};

export const fetchNiftiStudyByIdThunk = (studyInstanceUID: string) => {
    return async (dispatch: Dispatch) => {
        const study = await AxiosUtil.sendRequest({
            method: 'GET',
            url: `${GATEWAY_URL}/nifti/studies/${studyInstanceUID}`
        });

        if (!study) {
            return;
        }

        dispatch(studiesSliceActions.setSelectedNiftiStudy(study));
    };
};
