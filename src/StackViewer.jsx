import React, { useEffect, useRef, useState } from 'react';
import { initDemo, createImageIdsAndCacheMetaData, setTitleAndDescription, addDropdownToToolbar } from '../helpers';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import { prefetchMetadataInformation, convertMultiframeImageIds } from '../helpers/convertMultiframeImageIds';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';


const Viewer = () => {
    const contentRef = useRef(null);
    const renderingEngineRef = useRef(null);
    const viewport = useRef(null);
    // CornerstoneJS tool initialization
    const {
      PanTool,
      WindowLevelTool,
      StackScrollMouseWheelTool,
      ZoomTool,
      PlanarRotateTool,
      ToolGroupManager,
      Enums: csToolsEnums,
    } = cornerstoneTools;
    
    const { MouseBindings } = csToolsEnums;

    // Set up the initial state of your application
    const toolGroupId = 'STACK_TOOL_GROUP_ID';
    const leftClickTools = [WindowLevelTool.toolName, PlanarRotateTool.toolName];
    const defaultLeftClickTool = leftClickTools[0];

  useEffect(() => {
    run();
  }, []);

  // Run the demo
    async function run() {
      // Initialize Cornerstone and related libraries
      await initDemo();

      // Add tools to Cornerstone3D
      cornerstoneTools.addTool(PanTool);
      cornerstoneTools.addTool(WindowLevelTool);
      cornerstoneTools.addTool(StackScrollMouseWheelTool);
      cornerstoneTools.addTool(ZoomTool);
      cornerstoneTools.addTool(PlanarRotateTool);

      const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

      // Add tools to the tool group
      toolGroup.addTool(WindowLevelTool.toolName);
      toolGroup.addTool(PanTool.toolName);
      toolGroup.addTool(ZoomTool.toolName);
      toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });
      toolGroup.addTool(PlanarRotateTool.toolName);

      // Set the initial state of the tools, here all tools are active and bound to
      // Different mouse inputs
      toolGroup.setToolActive(defaultLeftClickTool, {
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

      const imageIds = await createImageIdsAndCacheMetaData({
        StudyInstanceUID:
          '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
        SeriesInstanceUID:
          '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
        wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
      });

      // Instantiate a rendering engine
      const renderingEngineId = 'myRenderingEngine';
      renderingEngineRef.current = new cornerstone.RenderingEngine(renderingEngineId);

      // Create a stack viewport
      const viewportId = 'CT_STACK';
      const viewportInput = {
        viewportId: viewportId,
        element: contentRef.current,
        type:  cornerstone.Enums.ViewportType.STACK,
      };

      renderingEngineRef.current.enableElement(viewportInput);
      
      // Set the tool group on the viewport
      toolGroup.addViewport(viewportId, renderingEngineId);

      viewport.current = renderingEngineRef.current.getViewport(viewportInput.viewportId);

      viewport.current.setStack(imageIds, 60);

      viewport.current.render();


  };
  
  const handleFileInputSelection = (evt) => {
    const file = evt.target.files[0];
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
    loadAndViewImage(imageId);
  }

  const handleFileSelect = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    const file = evt.dataTransfer.files[0];
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
    loadAndViewImage(imageId);
  };

  const handleDragOver = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  const loadAndViewImage = async (imageId) => {
    try {
    // Prefetch metadata information
    await prefetchMetadataInformation([imageId]);

    // Convert the imageId to a stack
    const stack = convertMultiframeImageIds([imageId]);

    // Set the stack on the viewport
    await viewport.current.setStack(stack);

    // Render the image
    viewport.current.render();
    
    } catch (error) {
      console.error('Error loading and viewing image:', error);
    }
  }

  return (
    <div>
      <h1>Stack Cornerstone Viewer</h1>
      
        <div>
          <input
          type="file"
          accept=".dcm, .nii, .nii.gz, .dcm.gz"
          onChange={handleFileInputSelection}
          />
        </div>
      
        <div id="content" onDragOver={handleDragOver} onDrop={handleFileSelect}>
          <div
          id="cornerstone-element"
          ref={contentRef}
          style={{ width: '500px', height: '500px' }
          }
          ></div>
          <p>Middle Click: Pan. Right Click: Zoom. Mouse Wheel: Stack Scroll.</p>
        </div>
      </div>
  );
}

export default Viewer;