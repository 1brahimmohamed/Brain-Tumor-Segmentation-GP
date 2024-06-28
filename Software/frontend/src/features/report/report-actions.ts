import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';

const REPORTING_API_URL = import.meta.env.VITE_REPORTING_API_URL;

/**
 * Creates a new report for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The report content.
 */
export const createReport = (studyInstanceUid: string, reportContent: string) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'POST',
            url: `${REPORTING_API_URL}/report`,
            data: {
                studyId: studyInstanceUid,
                content: reportContent
            }
        });

        if (!res) {
            return;
        }

        dispatch(
            uiSliceActions.setNotification({
                type: 'success',
                content: 'Report has been created successfully!'
            })
        );
    };
};

/**
 * Updates the report content for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The new report content.
 */
export const updateReport = (reportId: string, studyId: string, reportContent: string) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'PUT',
            url: `${REPORTING_API_URL}/report/${reportId}`,
            data: {
                studyId: studyId,
                content: reportContent
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
