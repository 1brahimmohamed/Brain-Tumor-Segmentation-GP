import { format, parse } from 'date-fns';
import store from '@/redux/store';
import { uiSliceActions } from '@ui/ui-slice';
import { Enums, metaData } from '@cornerstonejs/core';
import { OrientationAxis } from '@cornerstonejs/core/src/enums';

class DicomUtil {
    public static formatDate(date: string, strFormat: string = 'MMM dd, yyyy') {
        if (!date) {
            return;
        }

        // Goal: 'Apr 5, 2023'
        try {
            const parsedDateTime = parse(date, 'yyyyMMdd', new Date());
            return format(parsedDateTime, strFormat);
        } catch (err: any) {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: err.message
                })
            );
        }
    }

    public static formatTime(time: string, strFormat: string = 'HH:mm:ss') {
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
        } catch (err: any) {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: err.message
                })
            );
        }
    }

    public static formatPatientName(patientName: any) {
        if (!patientName) {
            return;
        }

        let cleaned = patientName;

        if (typeof patientName === 'object') {
            if (patientName.Alphabetic) {
                cleaned = patientName.Alphabetic;
            }
        }

        const commaBetweenFirstAndLast = cleaned.replace('^', ', ');

        cleaned = commaBetweenFirstAndLast.replace(/\^/g, ' ');

        return cleaned.trim();
    }

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

    private static dotProduct(a: number[], b: number[]) {
        return a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
    }

    public static getDicomCompressionType(imageId: string) {
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
