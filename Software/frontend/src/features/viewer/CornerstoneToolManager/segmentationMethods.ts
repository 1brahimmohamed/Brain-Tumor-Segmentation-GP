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

    await cornerstone.volumeLoader.createAndCacheDerivedVolume(volumeId, {
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

    store.dispatch(
        viewerSliceActions.addSegmentation({
            newSegmentationId
        })
    );
    store.dispatch(
        viewerSliceActions.addSegmentationUID({
            uid
        })
    );

    viewport.render();
};

// Download the current segmentation mask as a dcm file
export const downloadSegmentation = async () => {
    const state = store.getState();
    const { renderingEngineId, currentToolGroupId, segmentationUIDs } = state.viewer;
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);

    const segmentationData = cornerstoneTools.segmentation.state.getSegmentations();

    if (!segmentationData.length) {
        console.error('No segmentation data available');
        return;
    }

    segmentationData.forEach(async (segmentation, index) => {
        const { segmentationId } = segmentation;
        const volumeId = segmentationId;
        const volume = cornerstone.cache.getVolume(volumeId);
        const imageIds = volume.imageIds;

        const labelmapObj = Cornerstone3D.Segmentation.generateLabelMaps2DFrom3D(volume);

        // Generate fake metadata as an example
        labelmapObj.metadata = [];
        labelmapObj.segmentsOnLabelmap.forEach((segmentIndex) => {
            const color = cornerstoneTools.segmentation.config.color.getColorForSegmentIndex(
                currentToolGroupId,
                segmentationUIDs[index],
                segmentIndex
            );

            const segmentMetadata = generateMockMetadata(segmentIndex, color);
            labelmapObj.metadata[segmentIndex] = segmentMetadata;
        });

        const generatedSegmentation = Cornerstone3D.Segmentation.generateSegmentation(
            imageIds,
            labelmapObj,
            cornerstone.metaData
        );

        console.log(generatedSegmentation);

        // downloadDICOMData(generatedSegmentation.dataset, "mySEG.dcm");
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
