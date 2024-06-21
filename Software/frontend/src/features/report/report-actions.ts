import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';

/**
 * Updates the report content for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The new report content.
 */
export const updateReport = (studyInstanceUid: string, reportContent: string) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'PUT',
            url: ``,
            data: {
                studyInstanceUid,
                reportContent
            }
        });

        if (!res) {
            return;
        }

        dispatch(
            uiSliceActions.setNotification({
                type: 'success',
                content: 'Report has been updated successfully!'
            })
        );
    };
};
