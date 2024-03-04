import getDICOMMetaData from './dicomMetaData.ts';

interface DICOMInfo {
    label: string | undefined;
    tag: string;
    vr: string;
    value: string;
}

/**
 * Retrieves DICOM metadata for the given image ID and maps DICOM tags to their corresponding labels.
 * @param {string} type The type of metadata module to retrieve. Possible values: 'patientStudyModule', 'generalStudyModule', 'generalSeriesModule', 'generalEquipmentModule', 'imagePlaneModule'.
 * @param {string} imageId The ID of the DICOM image.
 * @returns An object containing DICOM metadata based on the specified type.
 */
const get = (type: string, imageId: string) => {
    const dicomData = getDICOMMetaData(imageId);
    if (!dicomData) {
        return {};
    }
    if (type === 'patientStudyModule') {
        return {
            patientName: dicomData['patientName'],
            patientID: dicomData['patientID'],
            patientBirthDate: dicomData['patientBirthDate'],
            patientSex: dicomData['patientSex'],
            accessionNumber: dicomData['accessionNumber'],
        };
    }
    if (type === 'generalStudyModule') {
        return {
            studyInstanceUID: dicomData['studyInstanceUID'],
            studyDate: dicomData['studyDate'],
            studyTime: dicomData['studyTime'],
            accessionNumber: dicomData['accessionNumber'],
            studyDescription: dicomData['studyDescription'],
        };
    }
    if (type === 'generalSeriesModule') {
        return {
            modality: dicomData['modality'],
            seriesInstanceUID: dicomData['seriesInstanceUID'],
            seriesNumber: dicomData['seriesNumber'],
            seriesDescription: dicomData['seriesDescription'],
        };
    }
    if (type === 'generalEquipmentModule') {
        return {
            manufacturer: dicomData['manufacturer'],
            manufacturerModelName: dicomData['manufacturerModelName'],
            softwareVersion: dicomData['softwareVersion'],
        };
    }
    if (type === 'imagePlaneModule') {
        return {
            pixelSpacing: dicomData['pixelSpacing'],
            sliceThickness: dicomData['sliceThickness'],
            imageOrientationPatient: dicomData['imageOrientationPatient'],
            imagePositionPatient: dicomData['imagePositionPatient'],
        };
    }

    return dicomData;
};

export { get };
