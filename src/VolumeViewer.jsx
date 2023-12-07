import React, { useEffect, useRef, useState } from 'react';
import { setCtTransferFunctionForVolumeActor, addToggleButtonToToolbar, createImageIdsAndCacheMetaData } from '../helpers';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import {
  cornerstoneNiftiImageVolumeLoader,
} from '@cornerstonejs/nifti-volume-loader' 
import { cornerstoneStreamingImageVolumeLoader } from '@cornerstonejs/streaming-image-volume-loader'
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';


// Test Data
const niftiURL =
    'https://ohif-assets.s3.us-east-2.amazonaws.com/nifti/CTACardio.nii.gz';
const volumeId = 'nifti:' + niftiURL;

//Initialize viewports
const viewportId1 = 'CT_NIFTI_AXIAL';
const viewportId2 = 'CT_NIFTI_SAGITTAL';
const viewportId3 = 'CT_NIFTI_CORONAL';
const viewportIds = [viewportId1, viewportId2, viewportId3];

const toolGroupId = 'STACK_TOOL_GROUP_ID';
const renderingEngineId = 'myRenderingEngine';

// CornerstoneJS tool initialization
const {
    LengthTool,
    ToolGroupManager,
    StackScrollMouseWheelTool,
    ZoomTool,
    Enums: csToolsEnums,
    init: csTools3dInit,
    ProbeTool,
    RectangleROITool,
    EllipticalROITool,
    CircleROITool,
    WindowLevelTool,
    PanTool,
    BidirectionalTool,
    AngleTool,
    CobbAngleTool,
    ArrowAnnotateTool,
    annotation,
} = cornerstoneTools;

const toolsNames = [
  WindowLevelTool.toolName,
  PanTool.toolName,
  LengthTool.toolName,
  ProbeTool.toolName,
  RectangleROITool.toolName,
  EllipticalROITool.toolName,
  CircleROITool.toolName,
  BidirectionalTool.toolName,
  AngleTool.toolName,
  CobbAngleTool.toolName,
  ArrowAnnotateTool.toolName,
];

const { locking, selection, state } = annotation;
const { MouseBindings } = csToolsEnums;


    // Add tools to Cornerstone3D
    cornerstoneTools.addTool(WindowLevelTool);
    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.addTool(ZoomTool);
    cornerstoneTools.addTool(ProbeTool);
    cornerstoneTools.addTool(RectangleROITool);
    cornerstoneTools.addTool(EllipticalROITool);
    cornerstoneTools.addTool(CircleROITool);
    cornerstoneTools.addTool(BidirectionalTool);
    cornerstoneTools.addTool(AngleTool);
    cornerstoneTools.addTool(CobbAngleTool);
    cornerstoneTools.addTool(ArrowAnnotateTool);

    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    // Add the tools to the tool group and specify which volume they are pointing at
    toolGroup.addTool(WindowLevelTool.toolName);
    toolGroup.addTool(PanTool.toolName);
    toolGroup.addTool(ZoomTool.toolName);
    toolGroup.addTool(RectangleROITool.toolName);
    toolGroup.addTool(EllipticalROITool.toolName);
    toolGroup.addTool(StackScrollMouseWheelTool.toolName , { loop: true });
    toolGroup.addTool(LengthTool.toolName);
    toolGroup.addTool(ProbeTool.toolName);
    toolGroup.addTool(RectangleROITool.toolName);
    toolGroup.addTool(CircleROITool.toolName);
    toolGroup.addTool(BidirectionalTool.toolName);
    toolGroup.addTool(AngleTool.toolName);
    toolGroup.addTool(CobbAngleTool.toolName);
    toolGroup.addTool(ArrowAnnotateTool.toolName);
    

const VolumeViewer = () => {
    const contentRef1 = useRef(null);
    const contentRef2 = useRef(null);
    const contentRef3 = useRef(null);

    const renderingEngine = useRef(null);
    const [selectedToolName, setSelectedToolName] = useState(toolsNames[0]);


    useEffect(() => {
        setup();
    }, []);

  // Setup the viewport
    async function setup() {
        // Initialize Cornerstone and related libraries
        await cornerstone.init();
        await csTools3dInit();

        cornerstone.volumeLoader.registerVolumeLoader('nifti', cornerstoneNiftiImageVolumeLoader);


        // Set the initial state of the tools, here all tools are active and bound to
        // Different mouse inputs
        toolGroup.setToolActive(WindowLevelTool.toolName, {
            bindings: [
            {
                mouseButton: MouseBindings.Primary, // Left Click
            },
            ],
        });
        toolGroup.setToolActive(PanTool.toolName, {
        bindings: [
            {
                mouseButton: MouseBindings.Auxiliary, // Middle Click
            },
            ],
        });
        toolGroup.setToolActive(ZoomTool.toolName, {
            bindings: [
            {
                mouseButton: MouseBindings.Secondary, // Right Click
            },
            ],
        });

        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

        // Instantiate a rendering engine
        
        renderingEngine.current = new cornerstone.RenderingEngine(renderingEngineId);

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
        viewportIds.forEach((viewportId) =>
            toolGroup.addViewport(viewportId, renderingEngineId)
        );

        console.log('Loading Volume')
        await cornerstone.volumeLoader.createAndCacheVolume(volumeId);
        console.log('Volume Loaded')
            
        cornerstone.setVolumesForViewports(
            renderingEngine.current,
            [{volumeId, callback: setCtTransferFunctionForVolumeActor}],
            viewportInputArray.map((v) => v.viewportId)
        );

        renderingEngine.current.render();
    };

    

    const saveAnnotations = (element) => {

        const allAnnotations = {};
        toolsNames.forEach(toolsName => {
            const annotations = annotation.state.getAnnotations(toolsName, element);
                if (annotations && annotations.length > 0) {
                    allAnnotations[toolsName] = annotations;
                }
        });
        console.log(allAnnotations);
        // Serialize the annotations to JSON
        const annotationsString = JSON.stringify(allAnnotations);

        // Create a Blob from the JSON string
        const blob = new Blob([annotationsString], { type: 'application/json' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'annotations.json';

        // Append the link to the document
        document.body.appendChild(downloadLink);

        // Trigger a click on the link to start the download
        downloadLink.click();

        // Remove the link from the document
        document.body.removeChild(downloadLink);
        
        annotation.state.removeAllAnnotations(element);

        // Update the canvas
        renderingEngine.current.render();
    };

    const uploadAnnotations = (element) => {
        // --- To put the tool data back ---

        // Create an input element
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = '.json';

        // Listen for the change event on the input element
        inputElement.addEventListener('change', (event) => {
            // Read the content of the selected file
            const reader = new FileReader();
            reader.onload = (loadEvent) => onReaderLoad(loadEvent, element);
            reader.readAsText(event.target.files[0])
            
        })

        // Trigger a click on the input element to open the file dialog
        inputElement.click();
    }

    const onReaderLoad = (event, element) => {
        const fileContent = event.target.result;

        try {
            const allToolData = JSON.parse(fileContent);
            console.log(allToolData)
            for (const toolType in allToolData) {
                if (allToolData.hasOwnProperty(toolType)) {
                    for (let i = 0; i < allToolData[toolType].length; i++) {
                        annotation.state.addAnnotation(allToolData[toolType][i], element);
                    }
                }
            }

            // Update the canvas
            renderingEngine.current.render();
        } catch (error) {
            console.error('Error parsing JSON file:', error);
        }
    };

    const createHandleMenuClick = (e) => {
        const newSelectedToolName = e.target.value;

        const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);

        // Set the new tool active
        toolGroup.setToolActive(newSelectedToolName, {
        bindings: [
            {
            mouseButton: MouseBindings.Primary, // Left Click
            },
        ],
        });

        // Set the old tool passive
        toolGroup.setToolPassive(selectedToolName);
        setSelectedToolName(newSelectedToolName);
    }

  return (
    <div>
      <h1>Volume Cornerstone 3D Viewer</h1>
      
        {/* <div>
          <input
          type="file"
          accept=".dcm, .nii, .nii.gz, .dcm.gz"
          onChange={handleFileInputSelection}
          />
        </div> */}
        <div>
            <select onChange={createHandleMenuClick}>
                  {toolsNames.map((toolName) => (
                    <option key={toolName} value={toolName}>
                        {toolName}
                    </option>
                  ))}
            </select>
        </div>
      
        <div id="content" style={{display: 'flex'}}>
            <div
            id="cornerstone-element1"
            ref={contentRef1}
            style={{ width: '500px', height: '500px' }}
            />
            
            <div
            id="cornerstone-element2"
            ref={contentRef2}
            style={{ width: '500px', height: '500px' }}/>
              
            <div
            id="cornerstone-element3"
            ref={contentRef3}
            style={{ width: '500px', height: '500px' }}
            />
              
          
          </div>

          <div>
              <button onClick={() => saveAnnotations((contentRef1.current))}>Save annotations</button>
              <button onClick={() => uploadAnnotations((contentRef1.current))}>Upload annotations</button>
          </div>
          <p>Middle Click: Pan. Right Click: Zoom. Mouse Wheel: Stack Scroll.</p>
      </div>
  );
}

export default VolumeViewer;