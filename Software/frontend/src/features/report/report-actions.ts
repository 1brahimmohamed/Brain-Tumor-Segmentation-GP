import { Dispatch } from '@reduxjs/toolkit';
import { AxiosUtil } from '@/utilities';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { viewerSliceActions } from '@features/viewer/viewer-slice';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';

/**
 * The URL for the reporting API.
 */
const REPORTING_API_URL = import.meta.env.VITE_REPORTING_API_URL;
const templateReportContent = `[
    {"id":"1","children":[{"text":"{Doctor's info}\\n"}],"type":"p"},
    {"children":[{"children":[{"children":[{"children":[{"text":"Patient's name: {patientName}"}],"type":"p","id":"6tjqr"}],"type":"td","id":"4nkmv"},
    {"children":[{"children":[{"text":"Branch: {branchInstitution}"}],"type":"p","id":"e82lq"}],"type":"td","id":"e7917"}],"type":"tr","id":"72zj3"},
    {"children":[{"children":[{"children":[{"text":"Date of Examination: {examinationDate}"}],"type":"p","id":"hdvz3"}],"type":"td","id":"f6hox"},
    {"children":[{"children":[{"text":"{Body parts}"}],"type":"p","id":"e9cb4"}],"type":"td","id":"s4vob"}],"type":"tr","id":"mqt5s"}],"type":"table","id":"j2bl1"},
    {"children":[{"text":"CLINICAL HISTORY: {clinicalHistory} \\n\\nCOMPARISON: {comparison}\\n\\nTECHNIQUE: {technique}\\n\\n FINDINGS: {findings}\\n\\nIMPRESSION: {impression}\\n"}],"type":"p","id":"flr32"}
]`;

/**
 * Creates a new report for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The report content.
 */
export const createReportThunk = (studyInstanceUid: string, navigate: any) => {
    return async (dispatch: Dispatch) => {
        const res = await AxiosUtil.sendRequest({
            method: 'POST',
            url: `${REPORTING_API_URL}/report`,
            data: {
                studyId: studyInstanceUid,
                content: templateReportContent
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

        navigate(`/report/${res.result.id}/study/${studyInstanceUid}`);
    };
};

/**
 * Updates the report content for the specified study.
 *
 * @param {string} studyInstanceUid - The study instance UID.
 * @param {string} reportContent - The new report content.
 */
export const updateReport = (reportId: number, studyId: string, reportContent: string) => {
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
