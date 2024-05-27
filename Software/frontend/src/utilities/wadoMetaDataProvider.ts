import getDICOMMetaData from './dicomMetaDataParser.ts';

/**
 * Retrieves DICOM metadata for the given image ID and maps DICOM tags to their corresponding labels.
 * @param {string} type The type of metadata module to retrieve. Possible values: 'patientStudyModule', 'generalStudyModule', 'generalSeriesModule', 'generalEquipmentModule', 'imagePlaneModule'.
 * @param {string} imageId The ID of the DICOM image.
 * @returns An object containing DICOM metadata based on the specified type.
 */
const getMetadataByImageId = (type: string, imageId: string): any => {
    const dicomData = getDICOMMetaData(imageId);
    if (!dicomData) {
        return {};
    }

    if (type === 'patientStudyModule') {
        return {
            patientName: dicomData['Patient Name'],
            patientId: dicomData['Patient ID'],
            patientBirthDate: dicomData['Patient Birthdate'],
            patientSex: dicomData['Patient Sex'],
            accessionNumber: dicomData['Accession Number']
        };
    }
    if (type === 'generalStudyModule') {
        return {
            studyInstanceUID: dicomData['Study Instance UID'],
            studyDate: dicomData['Study Date'],
            studyTime: dicomData['Study Time'],
            accessionNumber: dicomData['Accession Number'],
            studyDescription: dicomData['Study Description']
        };
    }
    if (type === 'generalSeriesModule') {
        return {
            modality: dicomData['Modality'],
            seriesInstanceUID: dicomData['Series Instance UID'],
            seriesNumber: dicomData['Series Number'],
            seriesDescription: dicomData['Series Description']
        };
    }
    if (type === 'generalEquipmentModule') {
        return {
            manufacturer: dicomData['Manufacturer'],
            manufacturerModelName: dicomData['Manufacturer Model Name'],
            softwareVersion: dicomData['Software Version']
        };
    }
    if (type === 'imagePlaneModule') {
        return {
            pixelSpacing: dicomData['Pixel Spacing'],
            rows: dicomData['Rows'],
            columns: dicomData['Columns'],
            sliceLocation: dicomData['Slice Location'],
            sliceThickness: dicomData['Slice Thickness'],
            imageOrientationPatient: dicomData['Image Orientation Patient'],
            imagePositionPatient: dicomData['Image Position Patient']
        };
    }
    if (type === 'imageModule') {
        return {
            instanceNumber: dicomData['Instance Number'],
            frameTime: dicomData['Frame Time']
        };
    }

    if (type === 'all') return dicomData;
};

export default getMetadataByImageId;
