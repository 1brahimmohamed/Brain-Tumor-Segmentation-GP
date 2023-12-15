import React, { useEffect, useRef, useState } from "react";
import {
    setCtTransferFunctionForVolumeActor,
    addToggleButtonToToolbar,
    createImageIdsAndCacheMetaData,
} from "../helpers";
import * as cornerstoneTools from "@cornerstonejs/tools";
import * as cornerstone from "@cornerstonejs/core";
import { cornerstoneNiftiImageVolumeLoader } from "@cornerstonejs/nifti-volume-loader";
import { annotationToolGroup, annotationToolsNames } from "./AnnotationTools";
import {
    addSegmentationsToState,
    segmentationToolGroup,
    segmentationToolsNames,
    segmentationIds,
    segmentationRepresentationUIDs,
} from "./SegmentationTools";

// Test Data
const niftiURL =
    "https://ohif-assets.s3.us-east-2.amazonaws.com/nifti/CTACardio.nii.gz";
const volumeId = "nifti:" + niftiURL;

//Initialize viewports
const viewportId1 = "CT_NIFTI_AXIAL";
const viewportId2 = "CT_NIFTI_SAGITTAL";
const viewportId3 = "CT_NIFTI_CORONAL";
const viewportIds = [viewportId1, viewportId2, viewportId3];

const renderingEngineId = "myRenderingEngine";

const {
    Enums: csToolsEnums,
    init: csTools3dInit,
    ToolGroupManager,
} = cornerstoneTools;

const { MouseBindings } = csToolsEnums;

const VolumeViewer = () => {
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);

    const renderingEngine = useRef(null);
    const [selectedAnnotationToolName, setSelectedAnnotationToolName] =
        useState(annotationToolsNames[0]);
    const [selectedSegmentationToolName, setSelectedSegmentationToolName] =
        useState(segmentationToolsNames[0]);

    useEffect(() => {
        setup();
    }, []);

    // Setup the viewport
    async function setup() {
        // Initialize Cornerstone and related libraries
        await cornerstone.init();
        await csTools3dInit();

        cornerstone.volumeLoader.registerVolumeLoader(
            "nifti",
            cornerstoneNiftiImageVolumeLoader
        );

        // Instantiate a rendering engine
        renderingEngine.current = new cornerstone.RenderingEngine(
            renderingEngineId
        );

        // Create a stack viewport
        const viewportInputArray = [
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

        console.log("Loading Volume");
        await cornerstone.volumeLoader.createAndCacheVolume(volumeId);
        await addSegmentationsToState(volumeId);
        console.log("Volume Loaded");

        cornerstone.setVolumesForViewports(
            renderingEngine.current,
            [{ volumeId, callback: setCtTransferFunctionForVolumeActor }],
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
        const index = segmentationIds.indexOf(name);
        const uid = segmentationRepresentationUIDs[index];

        cornerstoneTools.segmentation.activeSegmentation.setActiveSegmentationRepresentation(
            segmentationToolGroup.id,
            uid
        );
    };

    useEffect(() => {
        
    }, [segmentationIds]);

    return (
        <div>
            <h1>
                Volume Cornerstone 3D Viewer - Annotations and Segmentations
            </h1>

            {/* <div>
            <input
            type="file"
            accept=".dcm, .nii, .nii.gz, .dcm.gz"
            onChange={handleFileInputSelection}
            />
        </div> */}

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

                <button onClick={() => addSegmentationsToState(volumeId)}>
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

            <p>
                Middle Click: Pan. Right Click: Zoom. Mouse Wheel: Stack Scroll.
            </p>
        </div>
    );
};

export default VolumeViewer;
