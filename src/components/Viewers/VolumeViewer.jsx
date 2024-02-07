import React, { useEffect, useRef, useState } from "react";
import {
    setCtTransferFunctionForVolumeActor,
    addToggleButtonToToolbar,
    createImageIdsAndCacheMetaData,
    initDemo,
} from "../../../helpers";
import * as cornerstoneTools from "@cornerstonejs/tools";
import * as cornerstone from "@cornerstonejs/core";
import { cornerstoneNiftiImageVolumeLoader } from "@cornerstonejs/nifti-volume-loader";
import {
    annotationToolGroup,
    annotationToolsNames,
} from "../Annotations/AnnotationTools";
import {
    addSegmentationsToState,
    segmentationToolGroup,
    segmentationToolsNames,
    segmentationRepresentationUIDs,
    changeBrushSize,
    selectSegment,
    downloadSegmentation,
} from "../Segmentations/SegmentationTools";
import * as nifti from "nifti-js";
import * as niftiReader from "nifti-reader-js";

//Initialize viewports
const viewportId1 = "CT_NIFTI_AXIAL";
const viewportId2 = "CT_NIFTI_SAGITTAL";
const viewportId3 = "CT_NIFTI_CORONAL";
const viewportIds = [viewportId1, viewportId2, viewportId3];

const renderingEngineId = "myRenderingEngine";

const { Enums: csToolsEnums, init: csTools3dInit } = cornerstoneTools;

const { MouseBindings } = csToolsEnums;
let viewportInputArray = [];

let volumeId = "";
let dataBuffer = null;

let niftiHeader;
let niftiImage;
let niftiExt;

const VolumeViewer = () => {
    // Viewport References
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);

    const [selectedFileType, setSelectedFileType] = useState("nifti");

    // Segmentation Variables
    const [segmentationIds, setSegmentationIds] = useState([]);
    const [activeSegmentation, setActiveSegmentation] = useState(null);
    const [segmentationMap, setSegmentationMap] = useState(
        new Map(segmentationIds.map((id) => [id, [1]]))
    );

    // RenderingEngine Reference
    const renderingEngine = useRef(null);

    // Annotation Tool Variables
    const [selectedAnnotationToolName, setSelectedAnnotationToolName] =
        useState(annotationToolsNames[0]);

    // Segmentation Tool Variables
    const [selectedSegmentationToolName, setSelectedSegmentationToolName] =
        useState(segmentationToolsNames[0]);

    const handleViewerTypeChange = (event) => {
        setSelectedFileType(event.target.value);
    };

    // Handle file input change
    const handleFileInputSelection = async (e) => {
        const file = e.target.files[0];

        if (file) {
            if (selectedFileType === "dicom") {
                volumeId = "cornerstoneStreamingImageVolume:myVolumeId";
            } else if (selectedFileType === "nifti") {
                const niftiURL = URL.createObjectURL(file);
                volumeId = "nifti:" + niftiURL;
            }

            const fileReader = new FileReader();
            // Set up an event listener to handle when the file is loaded
            fileReader.onload = function (e) {
                // e.target.result contains the array buffer
                dataBuffer = e.target.result;

                if (niftiReader.isCompressed(dataBuffer))
                    dataBuffer = niftiReader.decompress(dataBuffer);

                if (niftiReader.isNIFTI(dataBuffer)) {
                    niftiHeader = niftiReader.readHeader(dataBuffer);
                    niftiImage = niftiReader.readImage(niftiHeader, dataBuffer);

                    if (niftiReader.hasExtension(niftiHeader)) {
                        niftiExt = niftiReader.readExtensionData(
                            niftiHeader,
                            dataBuffer
                        );
                    }

                    console.log("Nifti Header -> ", niftiHeader);
                    console.log("Nifti Image -> ", niftiImage);
                    console.log("Nifti Ext -> ", niftiExt);
                }
            };

            // Read the file as an array buffer
            fileReader.readAsArrayBuffer(file);

            // Set up the viewer with the new NIfTI file
            await setup();
            await loadVolume();
        }
    };

    // Setup the viewport
    async function setup() {
        // Initialize Cornerstone and related libraries
        await initDemo();
        await csTools3dInit();

        if (selectedFileType === "nifti") {
            // Add the NIfTI loader
            cornerstone.volumeLoader.registerVolumeLoader(
                "nifti",
                cornerstoneNiftiImageVolumeLoader
            );
        }

        // Instantiate a rendering engine
        renderingEngine.current = new cornerstone.RenderingEngine(
            renderingEngineId
        );

        // Create a stack viewport
        viewportInputArray = [
            {
                viewportId: viewportId1,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: contentRef1.current,
                defaultOptions: {
                    orientation: cornerstone.Enums.OrientationAxis.AXIAL,
                },
            },
            {
                viewportId: viewportId2,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: contentRef2.current,
                defaultOptions: {
                    orientation: cornerstone.Enums.OrientationAxis.SAGITTAL,
                },
            },
            {
                viewportId: viewportId3,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: contentRef3.current,
                defaultOptions: {
                    orientation: cornerstone.Enums.OrientationAxis.CORONAL,
                },
            },
        ];

        renderingEngine.current.setViewports(viewportInputArray);

        // Set the tool group on the viewports
        viewportIds.forEach((viewportId) => {
            annotationToolGroup.addViewport(viewportId, renderingEngineId);
        });
    }

    async function loadVolume() {
        console.log("Loading Volume");
        await cornerstone.volumeLoader.createAndCacheVolume(volumeId);
        console.log("Volume Loaded");

        cornerstone.setVolumesForViewports(
            renderingEngine.current,
            [{ volumeId }],
            viewportInputArray.map((v) => v.viewportId)
        );

        renderingEngine.current.render();
    }

    // Function to activate the annotation tools and change the active annotation tool
    const changeAnnotationTool = (e) => {
        const newSelectedToolName = e.target.value;

        // Set the tool group on the viewports
        viewportIds.forEach((viewportId) => {
            segmentationToolGroup.removeViewports(
                renderingEngineId,
                viewportId
            );
            annotationToolGroup.addViewport(viewportId, renderingEngineId);
        });

        // Set the new tool active
        annotationToolGroup.setToolActive(newSelectedToolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });

        // Set the old tool passive
        annotationToolGroup.setToolPassive(selectedAnnotationToolName);
        setSelectedAnnotationToolName(newSelectedToolName);
    };

    // Function to activate the segmentation tools and change the active segmentation tool
    const changeSegmentationTool = (e) => {
        const newSelectedToolName = e.target.value;

        // Set the tool group on the viewports
        viewportIds.forEach((viewportId) => {
            annotationToolGroup.removeViewports(renderingEngineId, viewportId);
            segmentationToolGroup.addViewport(viewportId, renderingEngineId);
        });

        // Set the new tool active
        segmentationToolGroup.setToolActive(newSelectedToolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });

        // Set the old tool passive
        segmentationToolGroup.setToolPassive(selectedSegmentationToolName);
        setSelectedSegmentationToolName(newSelectedToolName);
    };

    const changeActiveSegmentation = (e) => {
        const name = String(e.target.value);
        setActiveSegmentation(name);
        const index = segmentationIds.indexOf(name);
        const uid = segmentationRepresentationUIDs[index];

        cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
            segmentationToolGroup.id,
            uid
        );
    };

    const addSegmentation = async () => {
        const newSegmentationId = await addSegmentationsToState(
            volumeId,
            segmentationIds
        );

        setSegmentationIds((prevSegmentationIds) => [
            ...prevSegmentationIds,
            newSegmentationId,
        ]);

        setActiveSegmentation(newSegmentationId);

        // addSegmentToSegmentation();
        // console.log(segmentationMap);
    };

    const addSegmentToSegmentation = () => {
        setSegmentationMap((prevSegmentationMap) => {
            const newMap = new Map(prevSegmentationMap);
            const existingSegments = newMap.get(activeSegmentation) || [];

            // Find the maximum number or default to 0
            const maxNumber = Math.max(...existingSegments, 0);

            // Increment the counter for the new segment
            const incrementedSegment = maxNumber + 1;

            newMap.set(activeSegmentation, [
                ...existingSegments,
                incrementedSegment,
            ]);
            return newMap;
        });
    };

    const selectActiveSegment = (e) => {
        const segmentIndex = Number(e.target.value);
        selectSegment(activeSegmentation, segmentIndex);
    };

    return (
        <div>
            <h1>
                Volume Cornerstone 3D Viewer - Annotations and Segmentations _{" "}
                {selectedFileType === "nifti" ? "NIFTI" : ""}
                {selectedFileType === "dicom" ? "DICOM" : ""}
            </h1>

            <label>
                Choose Viewer Type:
                <select
                    value={selectedFileType}
                    onChange={handleViewerTypeChange}
                >
                    <option value="">Select Viewer Type</option>
                    <option value="dicom">DICOM</option>
                    <option value="nifti">NIfTI</option>
                </select>
            </label>

            <div>
                <input
                    type="file"
                    accept=".nii, .nii.gz, .dcm"
                    onChange={handleFileInputSelection}
                />
            </div>
            <div>
                <span> Annotation Tools: </span>
                <select onChange={changeAnnotationTool}>
                    {annotationToolsNames.map((toolName) => (
                        <option key={toolName} value={toolName}>
                            {toolName}
                        </option>
                    ))}
                </select>

                <span> Segmentation Tools: </span>
                <select onChange={changeSegmentationTool}>
                    {segmentationToolsNames.map((toolName) => (
                        <option key={toolName} value={toolName}>
                            {toolName}
                        </option>
                    ))}
                </select>

                <br></br>
                <br></br>

                <button onClick={() => addSegmentation()}>
                    Create new Segmentation on Current Image
                </button>

                <span> Set the Active Segmentation</span>
                <select onChange={changeActiveSegmentation}>
                    {segmentationIds.map((segmentationId) => (
                        <option key={segmentationId} value={segmentationId}>
                            {segmentationId}
                        </option>
                    ))}
                </select>

                <br></br>

                <button onClick={() => addSegmentToSegmentation()}>
                    Add segment on Current Segmentation Group
                </button>

                <span> Select the active segment</span>
                <select onChange={selectActiveSegment}>
                    {Array.from(
                        segmentationMap.get(activeSegmentation) || []
                    ).map((segmentIndex) => (
                        <option key={segmentIndex} value={segmentIndex}>
                            {segmentIndex}
                        </option>
                    ))}
                </select>

                <span> Choose your brush size</span>
                <input
                    type="range"
                    min="1"
                    max="50"
                    defaultValue="1"
                    onChange={(e) => changeBrushSize(e.target.value)}
                />
            </div>

            <div id="content" style={{ display: "flex" }}>
                <div
                    id="cornerstone-element1"
                    ref={contentRef1}
                    style={{ width: "500px", height: "500px" }}
                />

                <div
                    id="cornerstone-element2"
                    ref={contentRef2}
                    style={{ width: "500px", height: "500px" }}
                />

                <div
                    id="cornerstone-element3"
                    ref={contentRef3}
                    style={{ width: "500px", height: "500px" }}
                />
            </div>

            {/* <div>
                <button onClick={() => saveAnnotations(contentRef1.current)}>
                    Save annotations
                </button>
                <button onClick={() => uploadAnnotations(contentRef1.current)}>
                    Upload annotations
                </button>
            </div> */}

            <div>
                <button onClick={() => downloadSegmentation(niftiHeader)}>
                    Save Mask
                </button>
            </div>

            <p>
                Middle Click: Pan. Right Click: Zoom. Mouse Wheel: Stack Scroll.
            </p>
        </div>
    );
};

export default VolumeViewer;
