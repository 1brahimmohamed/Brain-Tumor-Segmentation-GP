import { Button } from '@mui/material';
import { usePlateStore } from '@udecode/plate-common';
import store from '@/redux/store.ts';
import { createReport, updateReport } from '../report-actions';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';

export default function SaveButton() {
    const value = usePlateStore().get.value();
    const { studyId } = useParams();
    const selectedStudyReport = useSelector((store: IStore) => store.studies.selectedStudyReport);

    const onSaveReport = () => {
        if (studyId) {
            if (selectedStudyReport) {
                store.dispatch(updateReport(selectedStudyReport.id, studyId, JSON.stringify(value)));
            } else {
                store.dispatch(createReport(studyId, JSON.stringify(value)));
            }
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={onSaveReport}>
            Save
        </Button>
    );
}
