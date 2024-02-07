export interface IDicomTableStudy {
    reportId: string | null;
    studyId: string;
    studyInstanceUid: string;
    studyDescription: string;
    studyDate: string;
    studyTime: string;
    patientId: string;
    patientName: string;
    accessionNumber: string;
    institutionName: string;
}
