import * as cornerstone from '@cornerstonejs/core';
import ptScalingMetaDataProvider from './ptScalingMetaDataProvider.ts';
import * as wadoMetaDataProvider from '@utilities/wadoMetaDataProvider';

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

/**
 * Initializes the providers for the application.
 *
 * This function adds the necessary providers to the cornerstone.metaData object.
 * The providers include ptScalingMetaDataProvider and calibratedPixelSpacingMetadataProvider.
 *
 * @return {void} This function does not return anything.
 */
const initProviders = (): void => {
    // cornerstone.metaData.addProvider(wadoMetaDataProvider.get.bind(wadoMetaDataProvider), 10001);
    cornerstone.metaData.addProvider(ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider), 10000);
    cornerstone.metaData.addProvider(
        calibratedPixelSpacingMetadataProvider.get.bind(calibratedPixelSpacingMetadataProvider),
        11000
    );
};

export default initProviders;
