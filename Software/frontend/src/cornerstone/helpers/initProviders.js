import * as cornerstone from '@cornerstonejs/core';
import ptScalingMetaDataProvider from './ptScalingMetaDataProvider';
import generalMetaDataProvider from "./wadoMetaDataProvider.js";

const { calibratedPixelSpacingMetadataProvider } = cornerstone.utilities;

export default function initProviders() {
  cornerstone.metaData.addProvider(
    ptScalingMetaDataProvider.get.bind(ptScalingMetaDataProvider),
    10000
  );
  cornerstone.metaData.addProvider(
    calibratedPixelSpacingMetadataProvider.get.bind(
      calibratedPixelSpacingMetadataProvider
    ),
    11000
  );
  cornerstone.metaData.addProvider(
    generalMetaDataProvider.get.bind(generalMetaDataProvider),
    13000
  );
  cornerstone.metaData.addProvider(
      generalMetaDataProvider.getUri.bind(generalMetaDataProvider),
        12000
  );
}
