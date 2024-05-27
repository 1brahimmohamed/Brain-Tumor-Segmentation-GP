import { utilities as csUtils } from '@cornerstonejs/core';

const scalingPerImageId: { [key: string]: object } = {};

/**
 * Adds an instance of scaling metadata to the scalingPerImageId object using the provided image ID and scaling metadata.
 *
 * @param {string} imageId - The ID of the image.
 * @param {object} scalingMetaData - The scaling metadata to be added.
 */
function addInstance(imageId: string, scalingMetaData: object) {
    const imageURI = csUtils.imageIdToURI(imageId);
    scalingPerImageId[imageURI] = scalingMetaData;
}

/**
 * Retrieves the scaling metadata for a given image ID if the type is 'scalingModule'.
 *
 * @param {string} type - The type of scaling metadata to retrieve.
 * @param {string} imageId - The ID of the image.
 * @return {object | undefined} The scaling metadata for the image ID if the type is 'scalingModule', otherwise undefined.
 */
function get(type: string, imageId: string): object | undefined {
    if (type === 'scalingModule') {
        const imageURI = csUtils.imageIdToURI(imageId);
        return scalingPerImageId[imageURI];
    }
}

export default { addInstance, get };
