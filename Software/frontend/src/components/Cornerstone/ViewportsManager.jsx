import React, {useEffect, useRef} from 'react';
import * as cornerstoneHelpers from '../../cornerstone/helpers';
import * as cornerstoneTools from '@cornerstonejs/tools';
import * as cornerstone from '@cornerstonejs/core';
import VIEWPORTS_COLORS from "../../assets/definations/viewportsColors.js";
import {createImageIdsAndCacheMetaData} from "../../cornerstone/helpers";



const initialState = {
    viewports: ['AXIAL', 'CORONAL', 'SAGITTAL', '3D'],
    activeViewportIndex: 0,
    imageIds: [],
    renderingEngine: null,
    volumeId: null,
};

const ViewportsManager = () => {
    const [state, setState] = React.useState(initialState);

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

    const { MouseBinding } = csToolsEnums;
    const volumeName = 'VOLUME';
    const volumeLoaderScheme = 'cornerstoneStreamingImageVolume';
    state.volumeId = `${volumeLoaderScheme}:${volumeName}`;

    const renderingEngineId = 'myRenderingEngine';
    const toolGroupIds = 'VIEWPORT_TOOL_GROUP';

    const viewportColors = {};
    const viewportReferenceLineControllable = [];
    const viewportReferenceLineDraggableRotatable = [];
    const viewportReferenceLineSlabThicknessControlsOn = [];
    const refsArray = Array.from({length: state.viewports.length}, () => useRef(null));

    state.viewports.forEach((viewportId, index) => {
        viewportColors[viewportId] = VIEWPORTS_COLORS[index];
        viewportReferenceLineControllable.push(viewportId);
        viewportReferenceLineDraggableRotatable.push(viewportId);
        viewportReferenceLineSlabThicknessControlsOn.push(viewportId);
    });

    const getReferenceLineColor = (viewportId) => {
        return viewportColors[viewportId];
    }

    const getReferenceLineControllable = (viewportId) => {
        const index = viewportReferenceLineControllable.indexOf(viewportId);
        return index !== -1;
    }

    const getReferenceLineDraggableRotatable = (viewportId) => {
        const index = viewportReferenceLineDraggableRotatable.indexOf(viewportId);
        return index !== -1;
    }

    const getReferenceLineSlabThicknessControlsOn = (viewportId) => {
        const index = viewportReferenceLineSlabThicknessControlsOn.indexOf(viewportId);
        return index !== -1;
    }

    const run = async () => {
        await cornerstoneHelpers.initCornerstone();

        const imageIds = await cornerstoneHelpers.createImageIdsAndCacheMetaData(
            {
                StudyInstanceUID:
                    '1.2.840.4892943.343.20220204232928.585770',
                SeriesInstanceUID:
                    '1.2.840.113619.2.312.6945.3553526.11449.1643962392.770',
                wadoRsRoot: 'http://localhost:4000/proxy/?target=http://orthanc:8042/dicom-web',
            }
        );

        // Define a volume in memory
        const volume = await cornerstone.volumeLoader.createAndCacheVolume(state.volumeId, {
            imageIds,
        });

        state.renderingEngine= new cornerstone.RenderingEngine(renderingEngineId);

        const viewportInputArray = [];

        state.viewports.forEach((viewportId, index) => {
            viewportInputArray.push({
                viewportId,
                type: cornerstone.Enums.ViewportType.ORTHOGRAPHIC,
                element: refsArray[index].current,
                defaultOptions: {
                    backgroundColor: [0, 0, 0],
                    invert: false,
                    flip: false,
                    scale: 1,
                    label: viewportId,
                },
            });
        });

        state.renderingEngine.setViewports(viewportInputArray);

        volume.load();

        await cornerstone.setVolumesForViewports(
            state.renderingEngine,
            [{volume}],
            state.viewports
        );
    };

    run();

    return (
        <div className="viewports-manager">
            {state.viewports.map((viewportId, index) => (
                <div
                    key={viewportId}
                    className="viewport-container"
                    ref={refsArray[index]}
                />
            ))}
        </div>
    )
};

export default ViewportsManager;
