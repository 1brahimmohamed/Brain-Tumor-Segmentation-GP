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
    modality: string;
}

export interface INiftiTableStudy {
    fileName: string;
    category: string;
    projectSub: string;
    sequencey: string;
}

export interface IDicomSeriesData {
    studyInstanceUid: string;
    studyOrthancId: string;
    seriesModality: string;
    seriesDescription: string;
    seriesNumber: string;
    seriesId: string;
    seriesInstanceUid: string;
    numberOfInstances: number;
    retrieveUrl: string;
}

export interface IDicomStudyData {
    patientName: string;
    patientId: string;
    patientBirthDate: string;
    patientSex: string;
    studyDate: string;
    studyTime: string;
    studyInstanceUid: string;
    studyTotalInstances: number;
    modality: string;
    series: IDicomSeriesData[];
}

export interface INiftiStudyData {
    patientName: string;
    patientId: string;
    patientBirthDate: string;
    patientSex: string;
    studyDate: string;
    studyTime: string;
    studyInstanceUid: string;
    studyTotalInstances: number;
    modality: string;
    series: IDicomSeriesData[];
}

export interface IStudyReport {
    patientName: string;
    patientId: string;
    patientBirthDate: string;
    patientSex: string;
    studyDate: string;
    studyTime: string;
    studyInstanceUid: string;
    reportId: string | null;
    studyTotalInstances: number;
    modality: string;
    content: string | null;
}
