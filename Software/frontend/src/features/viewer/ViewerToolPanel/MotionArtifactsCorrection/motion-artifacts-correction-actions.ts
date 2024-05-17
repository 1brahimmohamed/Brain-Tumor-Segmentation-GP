import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';

/**
 * Sends a new motion correction request to the specified model URL.
 *
 * @param {string} modelUrl - The URL of the model to send the request to.
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} seriesInstanceUid - The series instance UID.
 */
export const postNewMotionCorrectionRequestThunk = (
    modelUrl: string,
    studyInstanceUid: string,
    seriesInstanceUid: string
) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'POST',
            url: modelUrl,
            data: {
                studyInstanceUid,
                seriesInstanceUid
            }
        });

        if (!res) {
            return;
        }

        dispatch(
            uiSliceActions.setNotification({
                type: 'success',
                content: 'Motion Correction request has been sent successfully!'
            })
        );
    };
};
