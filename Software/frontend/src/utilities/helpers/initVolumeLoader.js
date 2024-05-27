import { volumeLoader } from '@cornerstonejs/core';
import {
    cornerstoneStreamingImageVolumeLoader,
    cornerstoneStreamingDynamicImageVolumeLoader
} from '@cornerstonejs/streaming-image-volume-loader';

/**
 * Initializes the volume loader by registering the unknown volume loader and the specific volume loaders.
 *
 * @return {void} This function does not return anything.
 */
export default function initVolumeLoader() {
    volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader);
    volumeLoader.registerVolumeLoader(
        'cornerstoneStreamingImageVolume',
        cornerstoneStreamingImageVolumeLoader
    );
    volumeLoader.registerVolumeLoader(
        'cornerstoneStreamingDynamicImageVolume',
        cornerstoneStreamingDynamicImageVolumeLoader
    );
}
