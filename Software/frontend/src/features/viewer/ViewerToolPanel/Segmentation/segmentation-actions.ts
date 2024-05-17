import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';

/**
 * Sends a new segmentation request using the provided model URL, study instance UID, and sequences.
 *
 * @param {string} modelUrl - The URL of the segmentation model.
 * @param {string} studyInstanceUid - The study instance UID for the segmentation request.
 * @param {{ [key: string]: string }} sequences - The sequences for the segmentation request.
 */
export const postNewSegmentationRequestThunk = (
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
                content: 'Segmentation request has been sent successfully!'
            })
        );
    };
};
