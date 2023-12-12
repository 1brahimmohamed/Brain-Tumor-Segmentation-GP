import formatNumberPrecision from './formatNumberPrecision';
import * as cornerstone from '@cornerstonejs/core';

const getCompression = (imageId) => {
    const generalImageModule =
        cornerstone.metaData.get('generalImageModule', imageId) || {};
    const {
        lossyImageCompression,
        lossyImageCompressionRatio,
        lossyImageCompressionMethod,
    } = generalImageModule;

    if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
        const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
        const compressionRatio = formatNumberPrecision(
            lossyImageCompressionRatio,
            2
        );
        return compressionMethod + compressionRatio + ' : 1';
    }

    return 'Lossless / Uncompressed';
}

export default getCompression;
