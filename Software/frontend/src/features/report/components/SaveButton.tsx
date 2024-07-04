import { Button } from '@mui/material';
import { usePlateStore } from '@udecode/plate-common';
import store from '@/redux/store.ts';
import { updateReport } from '../report-actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';

export default function SaveButton() {
    const value = usePlateStore().get.value();
    const navigate = useNavigate();
    const { reportId, studyId } = useParams();
    const selectedStudyReports = useSelector((store: IStore) => store.viewer.selectedStudyReports || []);

    const selectedStudyReport = selectedStudyReports.find((report) => String(report.id) === reportId);

    const onSaveReport = () => {
        if (studyId && selectedStudyReport) {
            store.dispatch(updateReport(selectedStudyReport.id, studyId, JSON.stringify(value)));
            navigate(-1);
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={onSaveReport}>
            Save
        </Button>
    );
}
