import React, { useState, useEffect } from 'react'
import cornerstone from 'cornerstone-core'
import dicomParser from 'dicom-parser'
import CornerstoneViewport from 'react-cornerstone-viewport'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

import './App.css'

let initalConfig = {
    activeViewportIndex: 0,
    viewports: [0, 1, 2, 3],
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      'Length',
      'Angle',
      'Bidirectional',
      'FreehandRoi',
      'Eraser',
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: [
      
    ],
    // FORM
    activeTool: 'Wwwc',
    imageIdIndex: 0,
    isPlaying: false,
    frameRate: 1,
  }


  const createImageIDs = () => {

    let MyImageIds = [];

    for(let i = 0; i < 20; i++) {
        MyImageIds.push(`wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT00000${i}.dcm`);
    }

    return MyImageIds;
  };



function App() {

    let myIDs = createImageIDs();
    
    initalConfig.imageIds = myIDs;

    const [config, setConfig] = useState(initalConfig);
  
    console.log(config);

    const handleFileInputChange = (event) => {
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    
        setConfig((prevconfig) => ({
            ...prevconfig,
            imageIds: [... prevconfig.imageIds, imageId],
        }));
    
          const imageIds = [imageId];
          setConfig((prevconfig) => ({
            ...prevconfig,
            imageIds,
            imageIdIndex: 0,
          }));
        
        fileReader.readAsArrayBuffer(file);
    }

    const [isImageIDs, setIsImageIDs] = useState(false);


    useEffect(() => {
        if (config.imageIds.length > 0) {
          setIsImageIDs(true);
        }
    }, [config.imageIds]);

  return (
    <div style={{backgroundColor: "black", height: "100vh", width:"100%"}} >

        <div style={{ display: 'flex', flexWrap: 'wrap',width:"100%", height:"512px" }}>


            <input
                type="file"
                accept=".dcm"
                onChange={handleFileInputChange} />
    
            {isImageIDs && config.imageIds && config.viewports.map(viewportIndex => (
               <div key={viewportIndex} style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
                 <CornerstoneViewport
                    style={{flex: '1', minWidth: '720px', height: '470px'}}
                    tools={config.tools}
                    imageIds={config.imageIds}
                    imageIdIndex={config.imageIdIndex}
                    isPlaying={config.isPlaying}
                    frameRate={config.frameRate}
                    className={config.activeViewportIndex === viewportIndex ? 'active' : ''}
                    activeTool={config.activeTool}
                    setViewportActive={() => {
                        setConfig((prevconfig) => ({
                        ...prevconfig,
                        activeViewportIndex: viewportIndex,
                    }));
                    }}
                />
               </div>
            ))}
        </div>

    </div>
  )
}

export default App
