import './ViewportOverlay.scss';
import { IStore } from '@/models';
import { useSelector } from 'react-redux';
import getMetadataByImageId from '@utilities/wadoMetaDataProvider.ts';
import { DicomUtil, HelpersUtil } from '@/utilities';
import { IVolumeViewport } from '@cornerstonejs/core/dist/cjs/types';

type TViewportOverlayProps = {
    currentImageId: string;
    viewport: IVolumeViewport | null;
};

const ViewportOverlay = ({ currentImageId, viewport }: TViewportOverlayProps) => {
    if (!currentImageId || !viewport) return null;

    const { isInfoOnViewportsShown } = useSelector((store: IStore) => store.viewer);

    const { rows, columns, sliceThickness, sliceLocation } = getMetadataByImageId(
        'imagePlaneModule',
        currentImageId
    );
    const { seriesNumber, seriesDescription } = getMetadataByImageId('generalSeriesModule', currentImageId);
    const { studyDate, studyTime, studyDescription } = getMetadataByImageId(
        'generalStudyModule',
        currentImageId
    );
    const { patientId, patientName } = getMetadataByImageId('patientStudyModule', currentImageId);
    const { instanceNumber, frameTime } = getMetadataByImageId('imageModule', currentImageId);
    const compression = DicomUtil.getDicomCompressionType(currentImageId);

    const frameRate = HelpersUtil.formatNumberPrecision(1000 / frameTime, 1);
    const windowWidth = 0;
    const windowCenter = 0;
    const wwwc = `W: ${HelpersUtil.formatNumberPrecision(windowWidth, 0)} L: ${HelpersUtil.formatNumberPrecision(windowCenter, 0)}`;
    const imageDimensions = `${columns?.value} x ${rows?.value}`;

    const zoom = viewport.getZoom() * 100;
    const imageIds = viewport.getImageIds();
    const imageIndex = imageIds.indexOf(currentImageId) + 1;
    const numImages = imageIds.length;

    const metadataOverlay = () => {
        return (
            <>
                <div className={`absolute top-0 left-0 text-sm text-white p-2`}>
                    <div>{DicomUtil.formatPatientName(patientName?.value)}</div>
                    <div>{patientId?.value}</div>
                </div>

                <div className={`absolute top-0 right-0 text-right text-sm text-white p-2`}>
                    <div>{studyDescription?.value}</div>
                    <div>
                        {DicomUtil.formatDate(studyDate?.value)} {DicomUtil.formatTime(studyTime?.value)}
                    </div>
                    <div>{seriesDescription?.value}</div>
                </div>

                <div className={`absolute bottom-0 left-0 text-sm text-white p-2`}>
                    <div>{seriesNumber?.value >= 0 ? `Ser: ${seriesNumber?.value}` : ''}</div>

                    <div>
                        {numImages > 1 ? `Img: ${instanceNumber?.value} ${imageIndex}/${numImages}` : ''}
                    </div>
                    <div>
                        {frameRate && frameRate >= 0 ? `${frameRate} FPS` : ''}
                        <div>{imageDimensions}</div>
                        <div>
                            {HelpersUtil.isValidNumber(sliceLocation?.value)
                                ? `Loc: ${HelpersUtil.formatNumberPrecision(sliceLocation?.value, 2)} mm `
                                : ''}
                            {sliceThickness
                                ? `Thick: ${HelpersUtil.formatNumberPrecision(sliceThickness?.value, 2)} mm`
                                : ''}
                        </div>
                    </div>
                </div>

                <div className={`absolute bottom-0 right-0 text-right text-sm text-white p-2`}>
                    <div>Zoom: {HelpersUtil.formatNumberPrecision(zoom, 0)}%</div>
                    <div>{wwwc}</div>
                    <div className="compressionIndicator">{compression}</div>
                </div>

                <div className={`absolute top-1/2 right-0 text-white p-2`}>L</div>
                <div className={`absolute top-1/2 left-0 text-white p-2`}>R</div>

                <div className={`absolute top-0 left-1/2 text-white p-2`}>P</div>
                <div className={`absolute bottom-0 left-1/2 text-white p-2`}>A</div>
            </>
        );
    };

    return isInfoOnViewportsShown ? metadataOverlay() : <></>;
};

export default ViewportOverlay;
