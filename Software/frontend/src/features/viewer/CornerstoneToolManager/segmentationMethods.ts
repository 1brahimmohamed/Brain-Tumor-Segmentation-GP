import store from '@/redux/store.ts';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { viewerSliceActions } from '@features/viewer/viewer-slice.ts';
import { adaptersSEG, helpers } from '@cornerstonejs/adapters';
import * as cornerstoneDicomImageLoader from '@cornerstonejs/dicom-image-loader';
import dcmjs from 'dcmjs';
import { api } from 'dicomweb-client';
import { getAndSetSeriesInstances } from '../viewer-viewport-reducers';

const { wadouri } = cornerstoneDicomImageLoader;

const { downloadDICOMData } = helpers;
const { Cornerstone3D } = adaptersSEG;

// Constants for DICOMWeb client
const DICOM_URL = import.meta.env.VITE_ORTRHANC_PROXY_URL;
const SINGLEPART = true;

/**
 * Helper function to get rendering engine and viewport dynamically
 *
 * This function is used to get the rendering engine and viewport based on the selected viewport
 *
 * @param {number} selectedViewportId - The selected viewport ID.
 * @returns {void}
 */
const getRenderingAndViewport = (selectedViewportId: string) => {
    // Get the current application state
    const state = store.getState();
    const { segmentations, renderingEngineId, currentToolGroupId } = state.viewer;

    // Get the rendering engine and viewport using the selected viewport ID
    const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId);
    const viewport = renderingEngine?.getViewport(selectedViewportId) as cornerstone.Types.IVolumeViewport;

    // Return the rendering engine, viewport, current tool group ID, and selected viewport ID
    return { segmentations, renderingEngine, viewport, currentToolGroupId, selectedViewportId };
};

/**
 * Adds a segment to a specific segmentation representation.
 *
 * This function is called when the user clicks on the add segment button in the segmentation panel.
 *
 * @param {number} numberOfSegments - The number of segments to add to the segmentation.
 * @returns {void}
 */
export const addSegmentToSegmentation = (numberOfSegments: number) => {
    const { segmentations } = store.getState().viewer;

    // Get the current active segmentation
    const segmentation = segmentations.find((segmentation) => segmentation.isActive === true);

    if (segmentation) {
        // Dispatch action to add the specified number of segments to the active segmentation
        store.dispatch(viewerSliceActions.addSegment({ segmentationId: segmentation.id, numberOfSegments }));

        // Set the active segment index to the newly added segment
        cornerstoneTools.segmentation.segmentIndex.setActiveSegmentIndex(
            segmentation.id,
            segmentation.segments.length + 1
        );
    }
};

/**
 * Add a new segmentation to the viewer state
 *
 * This function is called when the user clicks on the add segmentation button in the segmentation panel
 */
export const addSegmentation = async () => {
    const state = store.getState();
    const { selectedViewportId } = state.viewer;
    const { viewport, currentToolGroupId, segmentations } = getRenderingAndViewport(selectedViewportId);

    const newSegmentationId = `SEGMENTATION_${segmentations.length}`;

    addSegmentationsToState(newSegmentationId, viewport, currentToolGroupId, 1);

    viewport.render();
};

/**
 * Downloads the current segmentation mask as a DICOM (.dcm) file.
 *
 * This function is called when the user clicks on the download button in the segmentation panel.
 *
 * @returns {Promise<void>} A promise that resolves when the segmentation mask has been downloaded.
 */
export const downloadSegmentation = async () => {
    // Get the current application state and selected viewport ID.
    const state = store.getState();
    const { selectedViewportId } = state.viewer;

    // Retrieve the rendering engine and viewport using the selected viewport ID.
    const { viewport, currentToolGroupId } = getRenderingAndViewport(selectedViewportId);

    // Get the volume ID from the viewport.
    const viewportVolumeId = viewport.getActorUIDs()[0];

    // Retrieve the cached volume data.
    const cacheVolume = cornerstone.cache.getVolume(viewportVolumeId);
    const csImages = cacheVolume.getCornerstoneImages();

    // Get the active segmentation representation for the current tool group.
    const activeSegmentationRepresentation =
        cornerstoneTools.segmentation.activeSegmentation.getActiveSegmentationRepresentation(
            currentToolGroupId
        );

    // Retrieve the cached segmentation volume data.
    const cacheSegmentationVolume = cornerstone.cache.getVolume(
        activeSegmentationRepresentation.segmentationId
    );

    // Generate 2D label maps from the 3D segmentation volume.
    const labelmapData = Cornerstone3D.Segmentation.generateLabelMaps2DFrom3D(cacheSegmentationVolume);

    // Initialize metadata array for segments.
    labelmapData.metadata = [];

    // Generate metadata for each segment in the label map.
    labelmapData.segmentsOnLabelmap.forEach((segmentIndex) => {
        const color = cornerstoneTools.segmentation.config.color.getColorForSegmentIndex(
            currentToolGroupId,
            activeSegmentationRepresentation.segmentationRepresentationUID,
            segmentIndex
        );
        const segmentMetadata = generateMockMetadata(segmentIndex, color);
        labelmapData.metadata[segmentIndex] = segmentMetadata;
    });

    // Generate the segmentation dataset for DICOM export.
    const generatedSegmentation = Cornerstone3D.Segmentation.generateSegmentation(
        csImages,
        labelmapData,
        cornerstone.metaData
    );

    // Download the generated segmentation dataset as a DICOM file.
    downloadDICOMData(generatedSegmentation.dataset, `${viewportVolumeId} SEG.dcm`);
};

/**
 * Generates mock metadata for a segment based on the segment index and color.
 *
 * @param {number} segmentIndex - The index of the segment.
 * @param {any} color - The color of the segment in RGB format.
 * @returns {object} The mock metadata for the segment.
 */
function generateMockMetadata(segmentIndex: number, color: any) {
    // Convert the RGB color values to CIELab values and round them
    const RecommendedDisplayCIELabValue = dcmjs.data.Colors.rgb2DICOMLAB(
        color.slice(0, 3).map((value: number) => value / 255)
    ).map((value: number) => Math.round(value));

    // Return the mock metadata object for the segment
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

/**
 * Creates an input element for file selection and triggers a click to open the file dialog.
 * This function is called when the user clicks on the upload button in the segmentation panel.
 *
 * @returns {Promise<void>} A promise that resolves when the segmentation files have been selected and processed.
 */
export const uploadSegmentation = async () => {
    // Create an input element for file selection
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.dcm';
    inputElement.multiple = true;

    // Add an event listener to handle file selection
    inputElement.addEventListener('change', async (event) => {
        let eventTarget = (event.target as HTMLInputElement) || null;
        if (eventTarget?.files) {
            // Process each selected file
            for (let i = 0; i < eventTarget.files.length; i++) {
                const file = eventTarget.files[i];
                await readSegmentation(file);
            }
        }
    });

    // Trigger a click on the input element to open the file dialog
    inputElement.click();
};

/**
 * Reads the segmentation input and loads it into the viewer.
 *
 * @param {File | string} input - The input segmentation data, either as a File object or a Series UID string.
 * @returns {Promise<void>} A promise that resolves when the segmentation has been loaded into the viewer.
 */
export const readSegmentation = async (input: File | string) => {
    let imageId, arrayBuffer;
    const state = store.getState();
    const { currentStudyInstanceUid } = state.viewer;

    if (typeof input === 'string') {
        // If input is a string, assume it's a Series UID
        const seriesInstanceUID = input;

        // Construct URL to fetch DICOM image based on seriesInstanceUID
        const client = new api.DICOMwebClient({
            url: DICOM_URL,
            singlepart: SINGLEPART
        });

        // Retrieve the SOP Instance UIDs for the specified series
        const SOPInstanceUIDs = await getAndSetSeriesInstances(currentStudyInstanceUid, seriesInstanceUID);

        // Fetch the instance data as an array buffer
        arrayBuffer = await client.retrieveInstance({
            studyInstanceUID: currentStudyInstanceUid,
            seriesInstanceUID: seriesInstanceUID,
            sopInstanceUID: SOPInstanceUIDs[0]
        });
    } else {
        // If input is a File object, add it to wadouri file manager
        imageId = wadouri.fileManager.add(input);

        // Load and cache the image from the file
        const image = await cornerstone.imageLoader.loadAndCacheImage(imageId);

        // Retrieve instance metadata to verify the modality
        const instance = cornerstone.metaData.get('instance', imageId);
        if (instance.Modality !== 'SEG' && instance.Modality !== 'seg') {
            console.error('This is not segmentation');
            return;
        }

        // Extract the array buffer from the image data
        arrayBuffer = image.data.byteArray.buffer;
    }

    if (!arrayBuffer) {
        console.error('Failed to load segmentation due to missing array buffer');
        return;
    }

    // Load the segmentation into the viewer using the array buffer
    await loadSegmentation(arrayBuffer);
};

/**
 * Loads a segmentation into the viewer.
 *
 * @param {ArrayBuffer} arrayBuffer - The array buffer containing the segmentation data.
 * @returns {Promise<void>} A promise that resolves when the segmentation has been loaded and applied.
 */
async function loadSegmentation(arrayBuffer: ArrayBuffer) {
    const state = store.getState();
    const { selectedViewportId } = state.viewer;

    // Retrieve the rendering engine and viewport using the selected viewport ID.
    const { viewport, currentToolGroupId } = getRenderingAndViewport(selectedViewportId);

    // Generate a new unique segmentation ID.
    const newSegmentationId = 'LOAD_SEGMENTATION_ID:' + cornerstone.utilities.uuidv4();

    // Generate the tool state for the segmentation from the provided array buffer.
    const generateToolState = await Cornerstone3D.Segmentation.generateToolState(
        viewport.getImageIds(),
        arrayBuffer,
        cornerstone.metaData
    );

    // Add the segmentation to the application state and associate it with the tool group.
    const derivedVolume = await addSegmentationsToState(
        newSegmentationId,
        viewport,
        currentToolGroupId,
        generateToolState.segMetadata.data.length - 1
    );

    // Get the scalar data of the derived volume and set it with the generated labelmap buffer.
    const derivedVolumeScalarData = derivedVolume.getScalarData();
    derivedVolumeScalarData.set(new Uint8Array(generateToolState.labelmapBufferArray[0]));
}

/**
 * Adds segmentations to the application state and associates them with a tool group.
 *
 * @param {string} segmentationId - The unique identifier for the segmentation.
 * @param {cornerstone.Types.IVolumeViewport} viewport - The viewport where the segmentation is to be applied.
 * @param {string} currentToolGroupId - The ID of the current tool group to associate the segmentation with.
 * @param {number} numberOfSegments - The number of segments to add to the segmentation.
 * @returns {Promise<cornerstone.Volume>} A promise that resolves to the derived segmentation volume.
 */
async function addSegmentationsToState(
    segmentationId: string,
    viewport: cornerstone.Types.IVolumeViewport,
    currentToolGroupId: string,
    numberOfSegments: number
) {
    // Retrieve the volume ID from the viewport.
    const viewportVolumeId = viewport.getActorUIDs()[0];

    // Create a derived segmentation volume with the same resolution as the source data.
    const derivedVolume = await cornerstone.volumeLoader.createAndCacheDerivedSegmentationVolume(
        viewportVolumeId,
        {
            volumeId: segmentationId
        }
    );

    // Add the segmentations to the application state.
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

    // Add the segmentation representation to the specified tool group.
    const [uid] = await cornerstoneTools.segmentation.addSegmentationRepresentations(currentToolGroupId, [
        {
            segmentationId,
            type: cornerstoneTools.Enums.SegmentationRepresentations.Labelmap
        }
    ]);

    // Set the active segmentation representation for the tool group.
    cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        currentToolGroupId,
        uid
    );

    // Update the application state with the new segmentation information.
    store.dispatch(
        viewerSliceActions.addSegmentation({
            id: segmentationId,
            volumeId: viewportVolumeId,
            uid
        })
    );

    // Add the specified number of segments to the segmentation.
    addSegmentToSegmentation(numberOfSegments);

    // Return the derived segmentation volume.
    return derivedVolume;
}

export default getRenderingAndViewport;
