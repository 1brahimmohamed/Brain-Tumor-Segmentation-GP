import { format, parse } from 'date-fns';
import store from '@/redux/store';
import { uiSliceActions } from '@ui/ui-slice';
import { Enums, metaData } from '@cornerstonejs/core';
import { OrientationAxis } from '@cornerstonejs/core/src/enums';

interface IPatientName {
    Alphabetic?: string;
}

class DicomUtil {
    /**
     * Formats a given dicom date string into the specified format.
     *
     * @param {string} date - The date string to be formatted.
     * @param {string} [strFormat='MMM dd, yyyy'] - The format to be applied to the date string. Defaults to 'MMM dd, yyyy'.
     * @return {string | undefined} - The formatted date string, or undefined if the input date is falsy.
     */
    public static formatDate(date: string, strFormat: string = 'MMM dd, yyyy'): string | undefined {
        if (!date) {
            return;
        }

        // Goal: 'Apr 5, 2023'
        try {
            const parsedDateTime = parse(date, 'yyyyMMdd', new Date());
            return format(parsedDateTime, strFormat);
        } catch (err: unknown) {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: (err as Error).message
                })
            );
        }
    }

    /**
     * Formats a given dicom time string into the specified format.
     *
     * @param {string} time - The time string to be formatted.
     * @param {string} [strFormat='HH:mm:ss'] - The format to be applied to the time string. Defaults to 'HH:mm:ss'.
     * @return {string | undefined} - The formatted time string, or undefined if the input time is falsy.
     */
    public static formatTime(time: string, strFormat: string = 'HH:mm:ss'): string | undefined {
        if (!time) {
            return;
        }

        // DICOM Time is stored as HHmmss.SSS, where:
        //      HH 24 hour time:
        //      m mm    0..59   Minutes
        //      s ss    0..59   Seconds
        //      S SS SSS    0..999  Fractional seconds
        //
        // Goal: '24:12:12'

        try {
            const inputFormat = 'HHmmss.SSS';
            const strTime = time.toString().substring(0, inputFormat.length);
            const parsedDateTime = parse(strTime, inputFormat.substring(0, strTime.length), new Date(0));

            return format(parsedDateTime, strFormat);
        } catch (err: unknown) {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: (err as Error).message
                })
            );
        }
    }

    /**
     * Formats the given dicom patient name by cleaning it and adding a comma between the first and last name.
     *
     * @param {any} patientName - The patient name to be formatted.
     * @return {string | undefined} - The formatted patient name, or undefined if the input is falsy.
     */
    public static formatPatientName(
        patientName: string | IPatientName | null | undefined
    ): string | undefined {
        if (!patientName) {
            return;
        }

        let cleaned = patientName;

        if (typeof patientName === 'object') {
            if (patientName.Alphabetic) {
                cleaned = patientName.Alphabetic;
            }
        }

        if (typeof cleaned !== 'string') {
            return;
        }

        const commaBetweenFirstAndLast = cleaned.replace('^', ', ');

        cleaned = commaBetweenFirstAndLast.replace(/\^/g, ' ');

        return cleaned.trim();
    }

    /**
     * Detects the orientation of an image based on its dicom orientation array values.
     *
     * @param {number[]} orientation - An array of numbers representing the orientation values of the image.
     * @return {OrientationAxis} The orientation axis of the image. Returns OrientationAxis.AXIAL if the image is oriented axially, OrientationAxis.SAGITTAL if the image is oriented sagittally, OrientationAxis.CORONAL if the image is oriented coronally, and OrientationAxis.ACQUISITION if the orientation cannot be determined.
     */
    public static detectImageOrientation(orientation: number[]): OrientationAxis {
        // Convert orientation values to numbers and take absolute values
        const orientation_array = orientation.map(Number).map(Math.abs);

        // Define unit vectors for axial, sagittal, and coronal orientations
        const axial = [1, 0, 0, 0, 1, 0];
        const sagittal = [0, 1, 0, 0, 0, 1];
        const coronal = [1, 0, 0, 0, 0, 1];

        // Compute the dot products of orientation array with unit vectors
        const dot_axial = DicomUtil.dotProduct(orientation_array, axial);
        const dot_sagittal = DicomUtil.dotProduct(orientation_array, sagittal);
        const dot_coronal = DicomUtil.dotProduct(orientation_array, coronal);

        // Determine the orientation based on the maximum dot product
        const max_dot = Math.max(dot_axial, dot_sagittal, dot_coronal);
        if (max_dot === dot_axial) {
            return Enums.OrientationAxis.AXIAL;
        } else if (max_dot === dot_sagittal) {
            return Enums.OrientationAxis.SAGITTAL;
        } else if (max_dot === dot_coronal) {
            return Enums.OrientationAxis.CORONAL;
        } else {
            return Enums.OrientationAxis.ACQUISITION;
        }
    }

    /**
     * Calculates the dot product of two arrays of numbers.
     *
     * @param {number[]} a - The first array of numbers.
     * @param {number[]} b - The second array of numbers.
     * @return {number} The dot product of the two arrays.
     */
    private static dotProduct(a: number[], b: number[]): number {
        return a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
    }

    /**
     * Gets the DICOM compression type of image.
     *
     * @param {string} imageId - The cornerstone image ID of the image.
     * @return {string} The DICOM compression type of the image.
     */
    public static getDicomCompressionType(imageId: string): string {
        const lossyImageCompression = metaData.get('x00282110', imageId);
        const lossyImageCompressionRatio = metaData.get('x00282112', imageId);
        const lossyImageCompressionMethod = metaData.get('x00282114', imageId);

        if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
            const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
            return compressionMethod + lossyImageCompressionRatio + ' : 1';
        }

        return 'Lossless / Uncompressed';
    }
}

export default DicomUtil;
