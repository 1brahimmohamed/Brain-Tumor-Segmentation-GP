import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import DicomMapper from './dicomMapper';

export interface DICOMInfo {
    tag: string;
    valueRepresentation: string;
    value?: string | string[];
    BulkDataURI?: string;
}

/**
 * Retrieves the DICOM metadata for a given image ID.
 *
 * @param {string} imageId - The ID of the image.
 * @return {Object} An object containing the DICOM metadata for the image, with labels as keys and DICOMInfo objects as values.
 */
const getDICOMMetaData = (imageId: string): { [key: string]: DICOMInfo } => {
    const dicomData: { [key: string]: DICOMInfo } = {};

    try {
        // Get the metadata for the image
        const metadata = cornerstoneDICOMImageLoader.wadors.metaDataManager.get(imageId);

        if (!metadata) {
            return dicomData;
        }

        for (const tag in metadata) {
            const tagData = metadata[tag];

            if (tag === 'isMultiframe') {
                continue;
            }

            // Get the label for the tag
            const label = DicomMapper.getLabel(tag);

            // get the value representation for the tag and the bulk data URI
            const valueRepresentation = tagData.vr;
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

                dicomData[label] = { tag, valueRepresentation, value, BulkDataURI };
            }
        }
    } catch (error) {
        console.error('Failed to retrieve DICOM metadata:', error);
    }

    return dicomData;
};

export default getDICOMMetaData;
