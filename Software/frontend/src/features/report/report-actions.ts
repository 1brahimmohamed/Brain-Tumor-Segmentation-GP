import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice';
import store from '@/redux/store';

/**
 * The URL for the reporting API.
 */
const REPORTING_API_URL = import.meta.env.VITE_REPORTING_API_URL;

/**
 * Creates a new report for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The report content.
 */
export const createReportThunk = (studyInstanceUid: string, reportContent: string) => {
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

        store.dispatch(fetchStudyReportByIdThunk(studyInstanceUid));

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

/**
 * Fetches the report for the specified study.
 *
 * @param {string} studyInstanceUID - The study instance UID.
 */
export const fetchStudyReportByIdThunk = (studyInstanceUID: string) => {
    return async (dispatch: Dispatch) => {
        const report = await AxiosUtil.sendRequest({
            method: 'GET',
            url: `${REPORTING_API_URL}/report/${studyInstanceUID}`
        });

        if (!report) {
            return;
        }

        dispatch(viewerSliceActions.setSelectedStudyReports(report.result));
    };
};

/**
 * Deletes the report for the specified study.
 *
 * @param {string} reportId - The report ID.
 */
export const deleteReportbyIdThunk = (reportId: number, studyId: string) => {
    return async (dispatch: Dispatch) => {
        const result = await AxiosUtil.sendRequest({
            method: 'DELETE',
            url: `${REPORTING_API_URL}/report/${reportId}/study/${studyId}`
        });

        if (!result) {
            return;
        }

        store.dispatch(fetchStudyReportByIdThunk(studyId));
        dispatch(
            uiSliceActions.setNotification({
                type: 'success',
                content: 'Report has been deleted successfully!'
            })
        );
    };
};
