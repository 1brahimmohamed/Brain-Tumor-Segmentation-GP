import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { adaptersSEG, helpers } from '@cornerstonejs/adapters';
import * as cornerstoneDicomImageLoader from '@cornerstonejs/dicom-image-loader';
import dcmjs from 'dcmjs';
const { wadouri } = cornerstoneDicomImageLoader;

const { downloadDICOMData } = helpers;
const { Cornerstone3D } = adaptersSEG;

// Helper function to get rendering engine and viewport dynamically
const getRenderingAndViewport = (selectedViewportId: string) => {
    const state = store.getState();
    const { segmentations, renderingEngineId, currentToolGroupId } = state.viewer;
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
    const viewport = renderingEngine?.getViewport(selectedViewportId) as cornerstone.Types.IVolumeViewport;
    return { segmentations, renderingEngine, viewport, currentToolGroupId, selectedViewportId };
};

// Add Segment to a specific segmentation representation
export const addSegmentToSegmentation = (numberOfSegments: number) => {
    const { segmentations } = store.getState().viewer;
    // get the current segmententation
    const segmentation = segmentations.find((segmentation) => segmentation.isActive == true);

    if (segmentation) {
        // Dispatch action to add segment
        store.dispatch(viewerSliceActions.addSegment({ segmentationId: segmentation.id, numberOfSegments }));

        // Set active segment index
        cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
            segmentation.id,
            segmentation.segments.length + 1
        );
    }
};

// Add a new segmentation to the viewer state
export const addSegmentation = async () => {
    const state = store.getState();
    const { selectedViewportId } = state.viewer;
    const { viewport, currentToolGroupId, segmentations } = getRenderingAndViewport(selectedViewportId);

    const newSegmentationId = `SEGMENTATION_${segmentations.length}`;

    addSegmentationsToState(newSegmentationId, viewport, currentToolGroupId, 1);

    viewport.render();
};

// Download the current segmentation mask as a dcm file
export const downloadSegmentation = async () => {
    const state = store.getState();
    const { selectedViewportId } = state.viewer;
    const { viewport, currentToolGroupId } = getRenderingAndViewport(selectedViewportId);

    const viewportVolumeId = viewport.getActorUIDs()[0];
    const cacheVolume = cornerstone.cache.getVolume(viewportVolumeId);
    const csImages = cacheVolume.getCornerstoneImages();

    // Get active segmentation representation
    const activeSegmentationRepresentation =
        cornerstoneTools.segmentation.activeSegmentation.getActiveSegmentationRepresentation(
            currentToolGroupId
        );
    const cacheSegmentationVolume = cornerstone.cache.getVolume(
        activeSegmentationRepresentation.segmentationId
    );

    // Generate label maps
    const labelmapData = Cornerstone3D.Segmentation.generateLabelMaps2DFrom3D(cacheSegmentationVolume);

    // Generate metadata for segments
    labelmapData.metadata = [];
    labelmapData.segmentsOnLabelmap.forEach((segmentIndex) => {
        const color = cornerstoneTools.segmentation.config.color.getColorForSegmentIndex(
            currentToolGroupId,
            activeSegmentationRepresentation.segmentationRepresentationUID,
            segmentIndex
        );
        const segmentMetadata = generateMockMetadata(segmentIndex, color);
        labelmapData.metadata[segmentIndex] = segmentMetadata;
    });

    // Generate segmentation dataset and download as DICOM
    const generatedSegmentation = Cornerstone3D.Segmentation.generateSegmentation(
        csImages,
        labelmapData,
        cornerstone.metaData
    );

    downloadDICOMData(generatedSegmentation.dataset, `${viewportVolumeId} SEG.dcm`);
};

// Generate mock metadata for segment
function generateMockMetadata(segmentIndex: number, color: any) {
    const RecommendedDisplayCIELabValue = dcmjs.data.Colors.rgb2DICOMLAB(
        color.slice(0, 3).map((value: number) => value / 255)
    ).map((value: number) => Math.round(value));

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

// Create input element for file selection and trigger click to open file dialog
export const uploadSegmentation = async () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.dcm';

    inputElement.addEventListener('change', async (event) => {
        let eventTarget = (event.target as HTMLInputElement) || null;
        if (eventTarget?.files) {
            for (let i = 0; i < eventTarget.files.length; i++) {
                const file = eventTarget.files[i];

                await readSegmentation(file);
            }
        }
    });

    // Trigger a click on the input element to open the file dialog
    inputElement.click();
};

// Read the segmentation file and load it into the viewer
export const readSegmentation = async (file: File) => {
    const imageId = wadouri.fileManager.add(file);
    const image = await cornerstone.imageLoader.loadAndCacheImage(imageId);

    if (!image) {
        return;
    }

    const instance = cornerstone.metaData.get('instance', imageId);
    if (instance.Modality !== 'SEG') {
        console.error('This is not segmentation: ' + file.name);
        return;
    }

    const arrayBuffer = image.data.byteArray.buffer;

    loadSegmentation(arrayBuffer);
};

// Load the segmentation into the viewer
async function loadSegmentation(arrayBuffer: ArrayBuffer) {
    const state = store.getState();
    const { selectedViewportId } = state.viewer;
    const { viewport, currentToolGroupId } = getRenderingAndViewport(selectedViewportId);

    // Generate a new segmentation ID
    const newSegmentationId = 'LOAD_SEGMENTATION_ID:' + cornerstone.utilities.uuidv4();

    // Generate the tool state for the segmentation
    const generateToolState = await Cornerstone3D.Segmentation.generateToolState(
        viewport.getImageIds(),
        arrayBuffer,
        cornerstone.metaData
    );

    // Add the segmentation to the state
    const derivedVolume = await addSegmentationsToState(
        newSegmentationId,
        viewport,
        currentToolGroupId,
        generateToolState.segMetadata.data.length - 1
    );
    const derivedVolumeScalarData = derivedVolume.getScalarData();
    derivedVolumeScalarData.set(new Uint8Array(generateToolState.labelmapBufferArray[0]));

    // Update the segmentation state here
}

// Add segmentations to state and toolgroup
async function addSegmentationsToState(
    segmentationId: string,
    viewport: cornerstone.Types.IVolumeViewport,
    currentToolGroupId: string,
    numberOfSegments: number
) {
    const viewportVolumeId = viewport.getActorUIDs()[0];

    // Create a segmentation of the same resolution as the source data
    const derivedVolume = await cornerstone.volumeLoader.createAndCacheDerivedSegmentationVolume(
        viewportVolumeId,
        {
            volumeId: segmentationId
        }
    );

    // Add the segmentations to state
    cornerstoneTools.segmentation.addSegmentations([
        {
            segmentationId,
            representation: {
                // The type of segmentation
                type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap,
                // The actual segmentation data, in the case of labelmap this is a
                // reference to the source volume of the segmentation.
                data: {
                    volumeId: segmentationId
                }
            }
        }
    ]);

    // Add the segmentation representation to the toolgroup
    const [uid] = await cornerstoneTools.segmentation.addSegmentationRepresentations(currentToolGroupId, [
        {
            segmentationId,
            type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap
        }
    ]);

    cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        currentToolGroupId,
        uid
    );

    store.dispatch(
        viewerSliceActions.addSegmentation({
            id: segmentationId,
            volumeId: viewportVolumeId,
            uid
        })
    );

    addSegmentToSegmentation(numberOfSegments);

    return derivedVolume;
}
