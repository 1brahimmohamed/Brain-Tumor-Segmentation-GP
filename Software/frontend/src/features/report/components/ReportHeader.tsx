import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import { Box } from '@mui/material';
import { DicomUtil } from '@/utilities';

const ReportHeader = () => {
    const selectedStudy = useSelector((store: IStore) => store.studies.selectedDicomStudy);

    return (
        <Box className={'mt-4 -mb-2'}>
            {selectedStudy && (
                <div className={'flex flex-col gap-2'}>
                    <p className={'text-xl font-semibold'}>
                        Patient {selectedStudy.patientId} - {selectedStudy.modality} Report
                    </p>
                    <div className="flex flex-col gap-0.5 text-base">
                        <p>Patient Name: {selectedStudy.patientName}</p>
                        <p>Patient Birthdate: {DicomUtil.formatDate(selectedStudy.patientBirthDate)}</p>
                        <p>Study Date: {DicomUtil.formatDate(selectedStudy.studyDate)}</p>
                    </div>
                </div>
            )}
        </Box>
    );
};

export default ReportHeader;
