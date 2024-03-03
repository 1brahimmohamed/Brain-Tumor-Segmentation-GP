import * as cornerstone from '@cornerstonejs/core';
import ptScalingMetaDataProvider from './ptScalingMetaDataProvider.ts';

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

const initProviders = () => {
    cornerstone.metaData.addProvider(ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider), 10000);
    cornerstone.metaData.addProvider(
        calibratedPixelSpacingMetadataProvider.get.bind(calibratedPixelSpacingMetadataProvider),
        11000
    );
};

export default initProviders;
