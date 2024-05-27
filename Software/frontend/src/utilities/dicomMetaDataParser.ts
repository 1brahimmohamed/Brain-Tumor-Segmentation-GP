import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import DicomMapper from './dicomMapper';

interface DICOMInfo {
    tag: string;
    vr: string;
    value?: string | string[];
    BulkDataURI?: string;
}

const getDICOMMetaData = (imageId: string) => {
    const dicomData: { [key: string]: DICOMInfo } = {};

    try {
        const metadata = cornerstoneDICOMImageLoader.wadors.metaDataManager.get(imageId);
        if (!metadata) {
            return dicomData;
        }

        for (const tag in metadata) {
            const tagData = metadata[tag];

            if (tag === 'isMultiframe') {
                continue;
            }

            const label = DicomMapper.getLabel(tag);

            const vr = tagData.vr;
            const BulkDataURI = tagData.BulkDataURI;

            if (tagData.Value && tagData.Value.length >= 1 && label) {
                let value: string | string[];

                // Check if the value is an array and get its length
                if (Array.isArray(tagData.Value)) {
                    if (tagData.Value.length === 1) {
                        // If it's an array of length 1, extract the single value
                        value = tagData.Value[0];
                    } else {
                        // If it's an array with more than one value, stringify the array
                        value = tagData.Value.join(', ');
                    }
                } else {
                    // If it's not an array, simply assign the value
                    value = tagData.Value;
                }

                dicomData[label] = { tag, vr, value, BulkDataURI };
            }
        }
    } catch (error) {
        console.error('Failed to retrieve DICOM metadata:', error);
    }

    return dicomData;
};

export default getDICOMMetaData;
