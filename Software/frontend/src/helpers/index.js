import formatPatientName from './formatPatientName';
import formatDate from './formatDate';
import formatDicomTime from './formatDicomTime';
import formatNumberPrecision from './formatNumberPrecision';
import isValidNumber from './isValidNumber';
import getImageCompressionType from './getImageCompressionType';

const overlayHelpers = {
    formatPatientName,
    formatDate,
    formatDicomTime,
    formatNumberPrecision,
    isValidNumber,
    getImageCompressionType
};

export { overlayHelpers };
