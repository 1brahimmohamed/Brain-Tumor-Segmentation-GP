import { Button } from '@mui/material';
import { usePlateStore } from '@udecode/plate-common';
import store from '@/redux/store.ts';
import { updateReport } from '../report-actions';
import { useParams } from 'react-router-dom';

export default function SaveButton() {
    const value = usePlateStore().get.value();
    const { studyId } = useParams();

    const onSaveReport = () => {
        if (studyId) {
            store.dispatch(updateReport(studyId, JSON.stringify(value)));
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={onSaveReport}>
            Save
        </Button>
    );
}
