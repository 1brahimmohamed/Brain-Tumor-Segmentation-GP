import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';

/**
 * Generate a new synthesis request using the provided model URL, study instance UID, and sequences.
 *
 * @param {string} modelUrl - The URL of the model to post the request to.
 * @param {string} studyInstanceUid - The unique identifier of the study.
 * @param {{[key: string]: string}} sequences - An object containing key-value pairs of sequences.
 */

export const postNewSynthesisRequestThunk = (
    modelUrl: string,
    studyInstanceUid: string,
    sequences: { [key: string]: string }
) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'POST',
            url: modelUrl,
            data: {
                studyInstanceUid,
                sequences
            }
        });

        if (!res) {
            return;
        }

        dispatch(
            uiSliceActions.setNotification({
                type: 'success',
                content: 'Synthesis request has been sent successfully!'
            })
        );
    };
};
