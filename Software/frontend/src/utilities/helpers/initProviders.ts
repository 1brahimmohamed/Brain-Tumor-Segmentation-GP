import * as cornerstone from '@cornerstonejs/core';
import ptScalingMetaDataProvider from './ptScalingMetaDataProvider.ts';
import * as wadoMetaDataProvider from '@utilities/wadoMetaDataProvider';

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

const initProviders = () => {
    // cornerstone.metaData.addProvider(wadoMetaDataProvider.get.bind(wadoMetaDataProvider), 10001);
    cornerstone.metaData.addProvider(ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider), 10000);
    cornerstone.metaData.addProvider(
        calibratedPixelSpacingMetadataProvider.get.bind(calibratedPixelSpacingMetadataProvider),
        11000
    );
};

export default initProviders;
