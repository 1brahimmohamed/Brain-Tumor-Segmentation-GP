import * as DICOMwebClient from "dicomweb-client";
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import { helpers } from "./index.js";

const { getValue, getNumberValue } = cornerstoneDICOMImageLoader.wadors.metaData

const URL = "http://localhost:4000/proxy/?target=http://orthanc:8042/dicom-web";
const client = new DICOMwebClient.api.DICOMwebClient({
    url: URL,
});


const getAllStudies = async () => {
    return client.searchForStudies();
};


const parseStudiesMetadata = (studiesMetadata) => {
    // get StudyID, StudyDate, PatientName, PatientID, AccessionNumber, StudyDescription, StudyModality, InstitutionName,
    return studiesMetadata.map((study) => {
        return {
            studyID : getNumberValue(study["00200010"]) || "",
            studyDate: helpers.formatDate(getValue(study["00080020"])) || "",
            studyTime: helpers.formatDicomTime(getValue(study["00080030"])) || "",
            patientName: helpers.formatPatientName(getValue(study["00100010"])) || "",
            patientID: getNumberValue(study["00100020"]) || "",
            accessionNumber: getNumberValue(study["00080050"]) || "",
            studyDescription: getValue(study["00081030"]) || "",
            studyModality: getValue(study["00080061"]) || "",
            institutionName: getValue(study["00080080"]) || "",
        };
    });
};

const getSeriesInStudy = async (studyInstanceUID) => {
    return client.searchForSeries({
        studyInstanceUID: studyInstanceUID,
    });
};

const parseSeriesMetadata = (seriesMetadata) => {
    return seriesMetadata.map((series) => {
        return {
            seriesThumbnail: getSeriesThumbnail(series["0020000D"].Value[0], series["0020000E"].Value[0]),
            patientName: helpers.formatPatientName(getValue(series["00100010"])),
            seriesInstanceUID: getValue(series["0020000E"]),
            modality: getValue(series["00080060"]),
            seriesDescription: getValue(series["0008103E"]),
            seriesNumber: getNumberValue(series["00200011"]),
            numberOfInstances: getNumberValue(series["00201209"]),
            studyDate: helpers.formatDate(getValue(series["00080020"])),
        };
    });
};

const getSeriesThumbnail = async (studyInstanceUID, seriesInstanceUID) => {
    let response = await fetch(`${URL}/studies/${studyInstanceUID}/series/${seriesInstanceUID}/rendered`);
    return response.blob();
};


export { getSeriesInStudy, parseSeriesMetadata, getSeriesThumbnail, getAllStudies, parseStudiesMetadata };


