import React, {useEffect, useRef} from 'react';
import {initDemo, createImageIdsAndCacheMetaData, setCtTransferFunctionForVolumeActor} from '../../cornerstone/helpers';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import dicomParser from "dicom-parser";
import ViewportFrame from "./ViewportFrame.jsx";
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import {useLocation} from "react-router-dom";
import ViewportOverlay from "./ViewportOverlay.jsx";

import "../../helpers/getMetadata.js"



const CornerstoneViewport = ({viewportId}) => {

    const [imgId, setImgId] = React.useState(null);

    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);
    // const contentRef4 = useRef(null);

    const renderingEngineRef = useRef(null);

    const viewportId1 = 'CT_AXIAL';
    const viewportId2 = 'CT_SAGITTAL';
    const viewportId3 = 'CT_CORONAL';
    // const viewportId4 = 'CT_3D';

    const [myImageIds, setMyImageIds] = React.useState([]); // [

    // const { state } = useLocation();
    //
    //
    // let customImageIds = []
    // for (const file of state.files) {
    //     customImageIds.push(cornerstoneDICOMImageLoader.wadors.fileManager.add(file)
    // }

    // console.log(customImageIds)

    let globalImgIds = [];

    useEffect(() => {




        // CornerstoneJS tool initialization
        const {
            LengthTool,
            PanTool,
            WindowLevelTool,
            CrosshairsTool,
            StackScrollMouseWheelTool,
            ZoomTool,
            AngleTool,
            PlanarRotateTool,
            TrackballRotateTool,
            ToolGroupManager,
            Enums: csToolsEnums,
        } = cornerstoneTools;

        const { ViewportType } = cornerstoneTools.Enums;
        const {MouseBindings} = csToolsEnums;


        // Define a unique id for the volume

        const volumeName = 'CT_VOLUME_ID'; // Id of the volume less loader prefix
        const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
        const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id

        // Set up the initial state of your application
        const toolGroupId = 'MY_TOOLGROUP_ID';
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
            // Initialize Cornerstone and related libraries
            await initDemo();


            // Get Cornerstone imageIds for the source data and fetch metadata into RAM
            const imageIds = await createImageIdsAndCacheMetaData({
                StudyInstanceUID:
                    '1.2.840.4892943.343.20220204232928.585770',
                SeriesInstanceUID:
                    '1.2.840.113619.2.312.6945.3553526.11449.1643962392.770',
                wadoRsRoot: 'http://localhost:4000/proxy/?target=http://orthanc:8042/dicom-web',
            });

            setImgId(imageIds[0])

            // Define a volume in memory
            const volume = await cornerstone.volumeLoader.createAndCacheVolume(volumeId, {
                imageIds,
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
                // {
                //     viewportId: viewportId4,
                //     type: cornerstone.Enums.ViewportType.VOLUME_3D,
                //     element: contentRef4.current,
                //     defaultOptions: {
                //         orientation: cornerstone.Enums.OrientationAxis.CORONAL,
                //         background: [0, 0, 0],
                //     },
                // },

            ];


            renderingEngineRef.current.setViewports(viewportInputArray);

            // Set the volume to load
            volume.load();

            // Set volumes on the viewportsin
            await cornerstone.setVolumesForViewports(
                renderingEngineRef.current,
                [
                    {
                        volumeId,
                        callback: setCtTransferFunctionForVolumeActor,
                    },
                ],
                [viewportId1,
                    viewportId2,
                    viewportId3,
                    // viewportId4
                ]
            ).then(() => {
                // const volumeActor = renderingEngineRef.current
                //     .getViewport(viewportId4)
                //     .getDefaultActor().actor;
                //
                // cornerstone.utilities.applyPreset(
                //     volumeActor,
                //     cornerstone.CONSTANTS.VIEWPORT_PRESETS.find((preset) => preset.name === "CT-Fat")
                // );
                //
                // const viewport = renderingEngineRef.current.getViewport(viewportId4);
                // viewport.render();
            });


            // Add tools to Cornerstone3D
            cornerstoneTools.addTool(PanTool);
            cornerstoneTools.addTool(LengthTool);
            cornerstoneTools.addTool(WindowLevelTool);
            cornerstoneTools.addTool(StackScrollMouseWheelTool);
            cornerstoneTools.addTool(CrosshairsTool);
            cornerstoneTools.addTool(TrackballRotateTool);
            cornerstoneTools.addTool(ZoomTool);
            cornerstoneTools.addTool(AngleTool);
            // cornerstoneTools.addTool(PlanarRotateTool);


            const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
            // const toolGroup3D = ToolGroupManager.createToolGroup(toolGroup3DId);

            // For the crosshairs to operate, the viewports must currently be
            // added ahead of setting the tool active. This will be improved in the future.
            toolGroup.addViewport(viewportId1, renderingEngineId);
            toolGroup.addViewport(viewportId2, renderingEngineId);
            toolGroup.addViewport(viewportId3, renderingEngineId);

            // toolGroup3D.addViewport(viewportId4, renderingEngineId);

            const isMobile = window.matchMedia('(any-pointer:coarse)').matches;

            // // Add tools to the tool group
            toolGroup.addTool(WindowLevelTool.toolName);
            toolGroup.addTool(LengthTool.toolName);
            toolGroup.addTool(PanTool.toolName);
            toolGroup.addTool(ZoomTool.toolName);
            toolGroup.addTool(AngleTool.toolName);
            toolGroup.addTool(StackScrollMouseWheelTool.toolName, {loop: true});
            // toolGroup.addTool(PlanarRotateTool.toolName);
            toolGroup.addTool(CrosshairsTool.toolName, {
                getReferenceLineColor,
                getReferenceLineControllable,
                getReferenceLineDraggableRotatable,
                getReferenceLineSlabThicknessControlsOn,
                mobile: {
                    enabled: isMobile,
                    opacity: 0.8,
                    handleRadius: 9,
                },
            });

            // toolGroup3D.addTool(TrackballRotateTool.toolName);

            toolGroup.setToolActive(CrosshairsTool.toolName, {
                bindings: [{ mouseButton: MouseBindings.Primary }],
            });
            // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
            // hook instead of mouse buttons, it does not need to assign any mouse button.
            toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
            toolGroup.setToolActive(WindowLevelTool.toolName, {
                bindings: [
                    {
                        mouseButton: MouseBindings.Secondary, // Right Click
                    },
                ],
            });
            toolGroup.setToolActive(PanTool.toolName, {
                bindings: [
                    {
                        mouseButton: MouseBindings.Auxiliary
                    },
                ],
            });

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

               {/*<div className={"w-1/2 flex justify-center"}>*/}
               {/*    <ViewportFrame>*/}
               {/*        <div className={"w-full h-full"}*/}
               {/*             id="cornerstone-element"*/}
               {/*             ref={contentRef4}*/}
               {/*             style={{width: "100%", height: "100%"}}*/}
               {/*             onContextMenu={(e) => {e.preventDefault()}}*/}
               {/*        />*/}
               {/*    </ViewportFrame>*/}
               {/*</div>*/}

                {/*<div>*/}
                {/*    <ViewportOverlay imageId={imgId}/>*/}
                {/*</div>*/}
            </div>

           <div className={"flex"}>
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

           </div>
        </div>

    );
};

export default CornerstoneViewport;
