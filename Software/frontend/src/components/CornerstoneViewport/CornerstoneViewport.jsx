import React, {useEffect, useRef} from 'react';
import {initCornerstone, createImageIdsAndCacheMetaData, setCtTransferFunctionForVolumeActor} from '../../cornerstone/helpers';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import dicomParser from "dicom-parser";
import ViewportFrame from "./ViewportFrame.jsx";
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import {useLocation} from "react-router-dom";
import ViewportOverlay from "./ViewportOverlay.jsx";
import * as metadata from "../../helpers/getMetadata.js"

import "../../helpers/getMetadata.js"
import {getSeriesInStudy} from "../../helpers/getMetadata.js";
import {
    annotationToolGroup,
    setMouseWheelButton,
    setRightMouseButton,
    setLeftMouseButton,
    annotationToolsNamesObj
} from "../../utils/AnnotationTools.jsx"
import {useSelector} from "react-redux";

// CornerstoneJS tool initialization
const {
    ToolGroupManager,
    TrackballRotateTool,
    Enums: csToolsEnums,
} = cornerstoneTools;

const { MouseBindings } = csToolsEnums;


const CornerstoneViewport = ({viewportId}) => {
    const [imgId, setImgId] = React.useState(null);

    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);
    const contentRef4 = useRef(null);

    const renderingEngineRef = useRef(null);

    const viewportId1 = 'CT_AXIAL';
    const viewportId2 = 'CT_SAGITTAL';
    const viewportId3 = 'CT_CORONAL';
    const viewportId4 = 'CT_3D';

    const [myImageIds, setMyImageIds] = React.useState([]); // [


    useEffect(() => {
        // Define a unique id for the volume

        const volumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
        // const volumeName2 = 'CT_VOLUME_ID2'; // Id of the volume less loader prefix
        const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
        const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id
        // const volumeId2 = `${volumeLoaderScheme}:${volumeName2}`; // VolumeId with loader id + volume id
        // Set up the initial state of your application

        const toolGroup3DId = '3D_TOOLGROUP_ID';

        // const leftClickTools = [WindowLevelTool.toolName, PanTool.toolName, PlanarRotateTool.toolName];
        // const defaultLeftClickTool = leftClickTools[1];



        const viewportColors = {
            [viewportId1]: 'rgb(200, 0, 0)',
            [viewportId2]: 'rgb(200, 200, 0)',
            [viewportId3]: 'rgb(0, 200, 0)',
        };

        const viewportReferenceLineControllable = [
            viewportId1,
            viewportId2,
            viewportId3,
        ];

        const viewportReferenceLineDraggableRotatable = [
            viewportId1,
            viewportId2,
            viewportId3,
        ];

        const viewportReferenceLineSlabThicknessControlsOn = [
            viewportId1,
            viewportId2,
            viewportId3,
        ];

        function getReferenceLineColor(viewportId) {
            return viewportColors[viewportId];
        }

        function getReferenceLineControllable(viewportId) {
            const index = viewportReferenceLineControllable.indexOf(viewportId);
            return index !== -1;
        }

        function getReferenceLineDraggableRotatable(viewportId) {
            const index = viewportReferenceLineDraggableRotatable.indexOf(viewportId);
            return index !== -1;
        }

        function getReferenceLineSlabThicknessControlsOn(viewportId) {
            const index =
                viewportReferenceLineSlabThicknessControlsOn.indexOf(viewportId);
            return index !== -1;
        }




        // Run the demo1
        async function run() {
            // Initialize Cornerstone
            await initCornerstone();

            // const urlParams = new URLSearchParams(location.search);
            // const studyInstanceUID = urlParams.get('StudyInstanceUID');

            // const allSeries = await getSeriesInStudy(studyInstanceUID);

            // get the SeriesInstanceUID of the first series in the study
            // const firstSeries = allSeries[0];

            // // Get Cornerstone imageIds for the source data and fetch metadata into RAM
            // const imageIds = await createImageIdsAndCacheMetaData({
            //     StudyInstanceUID: studyInstanceUID,
            //     SeriesInstanceUID:
            //         firstSeries["0020000E"].Value[0],
            //     wadoRsRoot: 'http://localhost:4000/proxy/?target=http://orthanc:8042/dicom-web',
            // });

            // Get Cornerstone imageIds for the source data and fetch metadata into RAM
            const imageIds = await createImageIdsAndCacheMetaData({
                StudyInstanceUID:
                    '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
                SeriesInstanceUID:
                    '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
                wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
            });

            // const imageIds2 = await createImageIdsAndCacheMetaData({
            //     StudyInstanceUID:
            //         '1.2.840.4892943.343.20220204232928.585770',
            //     SeriesInstanceUID:
            //         '1.2.840.113619.2.312.6945.3553526.11449.1643962392.769',
            //     wadoRsRoot: 'http://localhost:4000/proxy/?target=http://orthanc:8042/dicom-web',
            // });




            // Define a volume in memory
            const volume = await cornerstone.volumeLoader.createAndCacheVolume(volumeId, {
                imageIds,
            });

            // const volume2 = await cornerstone.volumeLoader.createAndCacheVolume(volumeId2, {
            //     imageIds: imageIds2,
            // });


            const toolGroup = ToolGroupManager.createToolGroup(toolGroup3DId);

            cornerstoneTools.addTool(TrackballRotateTool);
            // Add the tools to the tool group and specify which volume they are pointing at
            toolGroup.addTool(TrackballRotateTool.toolName, {
                configuration: { volumeId },
            });

            toolGroup.addTool(annotationToolsNamesObj.pan, {
                configuration: { volumeId },
            });



            // Set the initial state of the tools, here we set one tool active on left click.
            // This means left click will draw that tool.
            toolGroup.setToolActive(TrackballRotateTool.toolName, {
                bindings: [
                    {
                        mouseButton: MouseBindings.Primary, // Left Click
                    },
                ],
            });

            toolGroup.setToolActive(annotationToolsNamesObj.pan, {
                bindings: [
                    {
                        mouseButton: MouseBindings.Secondary, // Right Click
                    },
                ],
            });

            // Instantiate a rendering engine
            const renderingEngineId = 'myRenderingEngine';
            renderingEngineRef.current = new cornerstone.RenderingEngine(renderingEngineId);


            // Create the viewports
            const viewportInputArray = [
                {
                    viewportId: viewportId1,
                    type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                    element: contentRef1.current,
                    defaultOptions: {
                        orientation: cornerstone.Enums.OrientationAxis.AXIAL,
                        background:[0, 0, 0],
                    }
                },
                {
                    viewportId: viewportId2,
                    type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                    element: contentRef2.current,
                    defaultOptions: {
                        orientation: cornerstone.Enums.OrientationAxis.SAGITTAL,
                        background: [0, 0, 0],
                    },
                },
                {
                    viewportId: viewportId3,
                    type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                    element: contentRef3.current,
                    defaultOptions: {
                        orientation: cornerstone.Enums.OrientationAxis.CORONAL,
                        background: [0, 0, 0],
                    },
                },
                {
                    viewportId: viewportId4,
                    type: cornerstone.Enums.ViewportType.VOLUME_3D,
                    element: contentRef4.current,
                    defaultOptions: {
                        orientation: cornerstone.Enums.OrientationAxis.AXIAL,
                        background: [0, 0, 0],
                    },
                },
            ];


            renderingEngineRef.current.setViewports(viewportInputArray);

            // Set the volume to load
            volume.load();
            // volume2.load();

            // Set volumes on the viewportsin
            await cornerstone.setVolumesForViewports(
                renderingEngineRef.current,
                [
                    {
                        volumeId,
                        // callback: setCtTransferFunctionForVolumeActor,
                    },
                ],
                [
                    viewportId1,
                    viewportId2,
                    viewportId3,
                    viewportId4
                ]
            ).then(() => {
                const volumeActor = renderingEngineRef.current
                    .getViewport(viewportId4)
                    .getDefaultActor().actor;

                cornerstone.utilities.applyPreset(
                    volumeActor,
                    cornerstone.CONSTANTS.VIEWPORT_PRESETS.find((preset) => preset.name === "CT-Fat")
                );

                const viewport = renderingEngineRef.current.getViewport(viewportId4);
                viewport.render();
            });


            // await cornerstone.setVolumesForViewports(
            //     renderingEngineRef.current,
            // [
            //     {
            //         volumeId: volumeId2,
            //     }
            // ], [
            //     viewportId2
            //     ]
            // )




            annotationToolGroup.addViewport(viewportId1, renderingEngineId);
            annotationToolGroup.addViewport(viewportId2, renderingEngineId);
            annotationToolGroup.addViewport(viewportId3, renderingEngineId);
            toolGroup.addViewport(viewportId4, renderingEngineId);

            // toolGroup3D.addViewport(viewportId4, renderingEngineId);

            // // Add tools to the tool group

            // toolGroup.addTool(CrosshairsTool.toolName, {
            //     getReferenceLineColor,
            //     getReferenceLineControllable,
            //     getReferenceLineDraggableRotatable,
            //     getReferenceLineSlabThicknessControlsOn,
            //     mobile: {
            //         enabled: isMobile,
            //         opacity: 0.8,
            //         handleRadius: 9,
            //     },
            // });

            // toolGroup3D.addTool(TrackballRotateTool.toolName);

                // toolGroup3D.setToolActive(TrackballRotateTool.toolName, {
            //     bindings: [
            //         {
            //             mouseButton: MouseBindings.Primary, // Left Click
            //         },
            //     ],
            // });

        };

        run();

    }, []);


    const {
        rightMouseTool,
        leftMouseTool,
        mouseWheelTool,
        prevRightMouseTool,
        prevLeftMouseTool,
        prevMouseWheelTool
    } = useSelector((store) => store.viewerpage )

    useEffect(()=>{
        setRightMouseButton(rightMouseTool, prevRightMouseTool)
    }, [rightMouseTool])

    useEffect(()=>{
        setLeftMouseButton(leftMouseTool, prevLeftMouseTool)
    },[leftMouseTool])

    useEffect(() => {
        setMouseWheelButton(mouseWheelTool, prevMouseWheelTool)
    }, [mouseWheelTool]);


    return (
        <div className={"flex flex-col h-full bg-black"}>

            <div className={"flex"}>
                <div className={"w-1/2 flex justify-center"}>
                    <ViewportFrame>
                        <div className={"w-full h-full"}
                             id="cornerstone-element"
                             ref={contentRef1}
                             style={{width: "100%", height: "100%"}}
                             onContextMenu={(e) => {e.preventDefault()}}
                        />
                    </ViewportFrame>
                </div>

               <div className={"w-1/2 flex justify-center"}>
                   <ViewportFrame>
                       <div className={"w-full h-full"}
                            id="cornerstone-element"
                            ref={contentRef4}
                            style={{width: "100%", height: "100%"}}
                            onContextMenu={(e) => {e.preventDefault()}}
                       />
                   </ViewportFrame>
               </div>
            </div>

           <div className={"flex"}>
               <div className={"w-1/2 flex justify-center"}>
                   <ViewportFrame>
                       <div className={"w-full h-full"}
                            id="cornerstone-element"
                            ref={contentRef2}
                            style={{width: "100%", height: "100%"}}
                            onContextMenu={(e) => {e.preventDefault()}}
                       />
                   </ViewportFrame>
               </div>
               <div className={"w-1/2 flex justify-center"}>
                   <ViewportFrame>
                       <div className={"w-full h-full"}
                            id="cornerstone-element"
                            ref={contentRef3}
                            style={{width: "100%", height: "100%"}}
                            onContextMenu={(e) => {e.preventDefault()}}
                       />
                   </ViewportFrame>
               </div>


           </div>
        </div>

    );
};

export default CornerstoneViewport;
