import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import CornerstoneToolManager from './CornerstoneToolManager';
import { adaptersSEG, helpers } from '@cornerstonejs/adapters';
import dcmjs from 'dcmjs';

const { downloadDICOMData } = helpers;
const { Cornerstone3D } = adaptersSEG;

// Add Segment to a specific segmentation representation
export const addSegmentToSegmentation = () => {
    CornerstoneToolManager.segmentationCounter++;
    cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
        'SEGMENTATION_1',
        CornerstoneToolManager.segmentationCounter
    );
};

// Add a new segmentation to the viewer state
export const addSegmentation = async () => {
    const state = store.getState();
    const { segmentationItems, selectedViewportId, renderingEngineId, currentToolGroupId } = state.viewer;
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
    const viewport = renderingEngine?.getViewport(selectedViewportId);
    CornerstoneToolManager.segmentationCounter = 1;

    if (!viewport) {
        console.error(`Failed to add segmentation: viewport with ID '${selectedViewportId}' not found`);
        return;
    }

    const volumeId = viewport.getActorUIDs()[0];
    const newSegmentationId = `SEGMENTATION_${segmentationItems.length + 1}`;

    const segmentationVolume = await cornerstone.volumeLoader.createAndCacheDerivedVolume(volumeId, {
        volumeId: newSegmentationId
    });

    cornerstoneTools.segmentation.state.addSegmentation({
        segmentationId: newSegmentationId,
        representation: {
            type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap,
            data: {
                volumeId: newSegmentationId
            }
        }
    });

    const [uid] = await cornerstoneTools.segmentation.addSegmentationRepresentations(currentToolGroupId, [
        {
            segmentationId: newSegmentationId,
            type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap
        }
    ]);

    await cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        currentToolGroupId,
        uid
    );

    cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
        newSegmentationId,
        CornerstoneToolManager.segmentationCounter
    );

    const segmentationMaskData = {
        volumeId: volumeId,
        segmentationId: newSegmentationId,
        uid: uid
    };

    store.dispatch(
        viewerSliceActions.addSegmentation({
            newSegmentationId
        })
    );
    store.dispatch(
        viewerSliceActions.addSegmentationMapper({
            segmentationMaskData
        })
    );

    viewport.render();
};

// Download the current segmentation mask as a dcm file
export const downloadSegmentation = async () => {
    const state = store.getState();
    const { renderingEngineId, currentToolGroupId, segmentationMap, selectedViewportId } = state.viewer;
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

    const viewport: cornerstone.Types.IVolumeViewport = renderingEngine?.getViewport(
        selectedViewportId
    ) as cornerstone.Types.IVolumeViewport;
    if (!viewport) {
        console.error(`Failed to download segmentation: viewport with ID '${selectedViewportId}' not found`);
        return;
    }

    const viewportVolumeId = viewport.getActorUIDs()[0];
    const volume = cornerstone.cache.getVolume(viewportVolumeId);
    const images = volume.getCornerstoneImages();
    console.log(images);

    segmentationMap.forEach((element: any) => {
        const { volumeId, segmentationId, uid } = element;

        if (volumeId !== viewportVolumeId) {
            return;
        }

        const segmentationVolume = cornerstone.cache.getVolume(segmentationId);

        const labelmapObj = Cornerstone3D.Segmentation.generateLabelMaps2DFrom3D(segmentationVolume);

        labelmapObj.metadata = [];
        labelmapObj.segmentsOnLabelmap.forEach((segmentIndex) => {
            const color = cornerstoneTools.segmentation.config.color.getColorForSegmentIndex(
                currentToolGroupId,
                uid,
                segmentIndex
            );
            const segmentMetadata = generateMockMetadata(segmentIndex, color);
            labelmapObj.metadata[segmentIndex] = segmentMetadata;
        });

        const generatedSegmentation = Cornerstone3D.Segmentation.generateSegmentation(
            images,
            labelmapObj,
            cornerstone.metaData
        );

        console.log(generatedSegmentation);

        downloadDICOMData(generatedSegmentation.dataset, `${volumeId} SEG.dcm`);
    });
};

function generateMockMetadata(segmentIndex: any, color: any) {
    const RecommendedDisplayCIELabValue = dcmjs.data.Colors.rgb2DICOMLAB(
        color.slice(0, 3).map((value) => value / 255)
    ).map((value) => Math.round(value));

    return {
        SegmentedPropertyCategoryCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
        },
        SegmentNumber: segmentIndex.toString(),
        SegmentLabel: 'Tissue ' + segmentIndex.toString(),
        SegmentAlgorithmType: 'SEMIAUTOMATIC',
        SegmentAlgorithmName: 'Slicer Prototype',
        RecommendedDisplayCIELabValue,
        SegmentedPropertyTypeCodeSequence: {
            CodeValue: 'T-D0050',
            CodingSchemeDesignator: 'SRT',
            CodeMeaning: 'Tissue'
        }
    };
}
