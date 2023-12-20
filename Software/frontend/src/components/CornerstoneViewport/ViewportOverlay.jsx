import React from 'react';
import * as cornerstone from "@cornerstonejs/core";
import { helpers } from "../../helpers/index";

import { Box } from '@mui/material';

import "../../styles/ViewportOverlay/ViewportOverlay.scss";

import { VolumeViewport } from "@cornerstonejs/core";

const ViewportOverlay = ({scale, windowWidth, windowCenter, imageId, imageIndex, stackSize}) => {

    if (!imageId) {
        console.log("imageId is null")
        return null;
    }


    const zoomPercentage = helpers.formatNumberPrecision(scale * 100, 0);
    const seriesMetadata = cornerstone.metaData.get('generalSeriesModule', imageId) || {};
    const { seriesNumber, seriesDescription } = seriesMetadata;

    const imagePlaneMetadata = cornerstone.metaData.get('imagePlaneModule', imageId) || {};
    const { rows, columns, sliceThickness, sliceLocation } = imagePlaneMetadata;

    const generalStudyMetadata = cornerstone.metaData.get('generalStudyModule', imageId) || {};
    const { studyDate, studyTime, studyDescription } = generalStudyMetadata;

    const patientMetadata = cornerstone.metaData.get('patientStudyModule', imageId) || {};
    const { patientName, patientId, patientSex } = patientMetadata;

    const generalImageMetadata = cornerstone.metaData.get('generalImageModule', imageId) || {};
    const { instanceNumber } = generalImageMetadata;

    const cineMetadata = cornerstone.metaData.get('cineModule', imageId) || {};
    const { frameTime } = cineMetadata;
    const frameRate = helpers.formatNumberPrecision(1000 / frameTime, 1);

    const compressionType = helpers.getImageCompressionType(imageId);

    const windowWidthLengthStr =
        `W: ${windowWidth} 
         L: ${windowCenter}`;

    const imageDimensionsStr = `${rows} x ${columns} x ${stackSize}`;


    return (
        <Box>
            <>
                <Box>

                </Box>

                <Box className="top-left overlay-element">
                    <Box> {helpers.formatPatientName(patientName['Alphabetic'])} </Box>
                    <Box> {patientId} </Box>
                </Box>

                <Box className="top-right overlay-element">
                    <Box> {studyDescription} </Box>
                    <Box> {helpers.formatDate(studyDate)} {helpers.formatDicomTime(studyTime)} </Box>
                </Box>

                <Box className="bottom-right overlay-element">
                    <Box>Zoom: {zoomPercentage}%</Box>
                    <Box>{ windowWidthLengthStr }</Box>
                    <Box className="compressionIndicator">{compressionType}</Box>
                </Box>

                <Box className="bottom-left overlay-element">
                    <Box>{seriesNumber >= 0 ? `Ser: ${seriesNumber}` : ''}</Box>
                    <Box>
                        {stackSize > 1
                            ? `Img: ${instanceNumber} ${imageIndex}/${stackSize}`
                            : ''}
                    </Box>
                    <Box>
                        {frameRate >= 0 ? `${helpers.formatNumberPrecision(frameRate, 2)} FPS` : ''}
                        <Box>{imageDimensionsStr}</Box>
                        <Box>
                            {helpers.isValidNumber(sliceLocation)
                                ? `Loc: ${helpers.formatNumberPrecision(sliceLocation, 2)} mm `
                                : ''}
                            {sliceThickness
                                ? `Thick: ${helpers.formatNumberPrecision(sliceThickness, 2)} mm`
                                : ''}
                        </Box>
                        <Box>{seriesDescription}</Box>
                    </Box>
                </Box>
            </>
        </Box>
    )
};

export default ViewportOverlay;
