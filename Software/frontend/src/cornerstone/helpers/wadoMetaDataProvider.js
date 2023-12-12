import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import dicomParser from "dicom-parser";


const { getValue, getNumberValue } = cornerstoneDICOMImageLoader.wadors.metaData

const get = (type, imageId) => {

    // Get the metadata for this imageId
    const metadata =  cornerstoneDICOMImageLoader.wadors.metaDataManager.get(imageId);

    if (!metadata) {
        console.log("no metadata")
        return;
    }

    if (
        metadata[type] !== undefined &&
        metadata[type].Value !== undefined &&
        metadata[type].Value.length
    ){
        return metadata[type].Value[0];
    }

    const typeCleaned = type.replace('x', '');

    if (
        metadata[typeCleaned] !== undefined &&
        metadata[typeCleaned].Value !== undefined &&
        metadata[typeCleaned].Value.length
    ){
        return metadata[typeCleaned].Value[0];
    }

    if (type === 'generalImageModule') {
        return {
            sopInstanceUid: getValue(metadata['00080018']),
            instanceNumber: getNumberValue(metadata['00200013']),
            lossyImageCompression: getValue(metadata['00282110']),
            lossyImageCompressionRatio: getValue(metadata['00282112']),
            lossyImageCompressionMethod: getValue(metadata['00282114']),
        }
    }


    if (type === 'patientStudyModule') {
        return {
            patientName: getValue(metadata['00100010']),
            patientId: getValue(metadata['00100020']),
            patientSex: getValue(metadata['00100040']),
            patientBirthDate: getValue(metadata['00100030']),
        }
    }

    if (type === 'spacingBetweenSlices') {
        return getValue(metadata['00180088']);
    }

    if (type === 'generalStudyModule') {
        return {
            studyDescription: getValue(metadata['00081030']),
            studyDate: getValue(metadata['00080020']),
            studyTime: getValue(metadata['00080030']),
            accessionNumber: getValue(metadata['00080050']),
        };
    }

    if (type === 'cineModule') {
        return {
            frameTime: getNumberValue(metadata['00181063']),
        };
    }
}

const getUri = (type, imageId) => {

    const {
        parseImageId,
        dataSetCacheManager,
    } = cornerstoneDICOMImageLoader.wadouri;

    const parsedImageId = parseImageId(imageId);
    const dataSet = dataSetCacheManager.get(parsedImageId.url);

    if (!dataSet) {
        return;
    }

    if (type === 'generalImageModule') {
        return {
            sopInstanceUid: dataSet.string('x00080018'),
            instanceNumber: dataSet.intString('x00200013'),
            lossyImageCompression: dataSet.string('x00282110'),
            lossyImageCompressionRatio: dataSet.string('x00282112'),
            lossyImageCompressionMethod: dataSet.string('x00282114'),
        }
    }

    if (type === 'patientStudyModule') {
        return {
            patientName: dataSet.string('x00100010'),
            patientId: dataSet.string('x00100020'),
            patientSex: dataSet.string('x00100040'),
            patientBirthDate: dataSet.string('x00100030'),
        }
    }

    if (type === 'cineModule') {
        return {
            frameTime: dataSet.floatString('x00181063'),
        };
    }

    if (dataSet.elements[type] !== undefined) {
        const element = dataSet.elements[type];
        if (!element.vr) {
            return;
        }

        return dicomParser.explicitElementToString(dataSet, element);
    }
};

export default { get, getUri };
