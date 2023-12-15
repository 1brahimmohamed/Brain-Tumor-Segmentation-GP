import React, { useEffect, useRef, useState } from "react";
import * as cornerstoneTools from "@cornerstonejs/tools";
import * as cornerstone from "@cornerstonejs/core";

const toolGroupId = "SegmentationTools";
const segmentationIds = [];
const segmentationRepresentationUIDs = [];
let segmentationCounter = 0;

const {
    SegmentationDisplayTool,
    ToolGroupManager,
    Enums: csToolsEnums,
    segmentation,
    RectangleScissorsTool,
    SphereScissorsTool,
    CircleScissorsTool,
    BrushTool,
    PaintFillTool,
    PanTool,
    ZoomTool,
    StackScrollTool,
    StackScrollMouseWheelTool,
    utilities: cstUtils,
} = cornerstoneTools;

const { MouseBindings, KeyboardBindings } = csToolsEnums;
const { segmentation: segmentationUtils } = cstUtils;



const brushInstanceNames = {
    CircularBrush: "CircularBrush",
    CircularEraser: "CircularEraser",
    SphereBrush: "SphereBrush",
    SphereEraser: "SphereEraser",
    ThresholdCircle: "ThresholdCircle",
    ScissorsEraser: "ScissorsEraser",
};

const brushStrategies = {
    [brushInstanceNames.CircularBrush]: "FILL_INSIDE_CIRCLE",
    [brushInstanceNames.CircularEraser]: "ERASE_INSIDE_CIRCLE",
    [brushInstanceNames.SphereBrush]: "FILL_INSIDE_SPHERE",
    [brushInstanceNames.SphereEraser]: "ERASE_INSIDE_SPHERE",
    [brushInstanceNames.ThresholdCircle]: "THRESHOLD_INSIDE_CIRCLE",
    [brushInstanceNames.ScissorsEraser]: "ERASE_INSIDE",
};

const brushValues = [
    brushInstanceNames.CircularBrush,
    brushInstanceNames.CircularEraser,
    brushInstanceNames.SphereBrush,
    brushInstanceNames.SphereEraser,
    brushInstanceNames.ThresholdCircle,
];

const segmentationToolsNames = [
    ...brushValues,
    RectangleScissorsTool.toolName,
    CircleScissorsTool.toolName,
    SphereScissorsTool.toolName,
    brushInstanceNames.ScissorsEraser,
    PaintFillTool.toolName,
];

// Add tools to Cornerstone3D
cornerstoneTools.addTool(SegmentationDisplayTool);
cornerstoneTools.addTool(RectangleScissorsTool);
cornerstoneTools.addTool(CircleScissorsTool);
cornerstoneTools.addTool(SphereScissorsTool);
cornerstoneTools.addTool(PaintFillTool);
cornerstoneTools.addTool(BrushTool);

// Define tool groups to add the segmentation display tool to
const segmentationToolGroup = ToolGroupManager.createToolGroup(toolGroupId);

// Manipulation Tools
segmentationToolGroup.addTool(PanTool.toolName);
segmentationToolGroup.addTool(ZoomTool.toolName);
segmentationToolGroup.addTool(StackScrollMouseWheelTool.toolName);

// Segmentation Tools
segmentationToolGroup.addTool(SegmentationDisplayTool.toolName);
segmentationToolGroup.addTool(RectangleScissorsTool.toolName);
segmentationToolGroup.addTool(CircleScissorsTool.toolName);
segmentationToolGroup.addTool(SphereScissorsTool.toolName);
segmentationToolGroup.addToolInstance(
    brushInstanceNames.ScissorsEraser,
    SphereScissorsTool.toolName,
    {
        activeStrategy: brushStrategies.ScissorsEraser,
    }
);
segmentationToolGroup.addTool(PaintFillTool.toolName);
segmentationToolGroup.addToolInstance(
    brushInstanceNames.CircularBrush,
    BrushTool.toolName,
    {
        activeStrategy: brushStrategies.CircularBrush,
    }
);
segmentationToolGroup.addToolInstance(
    brushInstanceNames.CircularEraser,
    BrushTool.toolName,
    {
        activeStrategy: brushStrategies.CircularEraser,
    }
);
segmentationToolGroup.addToolInstance(
    brushInstanceNames.SphereBrush,
    BrushTool.toolName,
    {
        activeStrategy: brushStrategies.SphereBrush,
    }
);
segmentationToolGroup.addToolInstance(
    brushInstanceNames.SphereEraser,
    BrushTool.toolName,
    {
        activeStrategy: brushStrategies.SphereEraser,
    }
);
segmentationToolGroup.setToolActive(StackScrollTool.toolName, {
    bindings: [
        {
            mouseButton: MouseBindings.Primary, // Left Click
            modifierKey: KeyboardBindings.Alt,
        },
        {
            numTouchPoints: 1,
            modifierKey: KeyboardBindings.Meta,
        },
    ],
});
segmentationToolGroup.addToolInstance(
    brushInstanceNames.ThresholdCircle,
    BrushTool.toolName,
    {
        activeStrategy: brushStrategies.ThresholdCircle,
    }
);
segmentationToolGroup.setToolEnabled(SegmentationDisplayTool.toolName);

segmentationToolGroup.setToolActive(brushInstanceNames.CircularBrush, {
    bindings: [{ mouseButton: MouseBindings.Primary }],
});

segmentationToolGroup.setToolActive(ZoomTool.toolName, {
    bindings: [
        {
            mouseButton: MouseBindings.Primary, // Shift Left Click
            modifierKey: KeyboardBindings.Shift,
        },
    ],
});

segmentationToolGroup.setToolActive(PanTool.toolName, {
    bindings: [
        {
            mouseButton: MouseBindings.Auxiliary, // Middle Click
        },
        {
            mouseButton: MouseBindings.Primary,
            modifierKey: KeyboardBindings.Ctrl,
        },
    ],
});
segmentationToolGroup.setToolActive(ZoomTool.toolName, {
    bindings: [
        {
            mouseButton: MouseBindings.Secondary, // Right Click
        },
    ],
});
// As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
// hook instead of mouse buttons, it does not need to assign any mouse button.
segmentationToolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

// Add new Segmentation to the state of the volume viewer
async function addSegmentationsToState(volumeId) {
    const newSegmentationId = `SEGMENTATION_${segmentationCounter}`;
    segmentationIds.push(newSegmentationId);

    // Create a segmentation of the same resolution as the source data
    // using volumeLoader.createAndCacheDerivedVolume.
    await cornerstone.volumeLoader.createAndCacheDerivedVolume(volumeId, {
        volumeId: segmentationIds[segmentationCounter],
    });

    // Add the segmentations to state
    segmentation.addSegmentations([
        {
            segmentationId: newSegmentationId,
            representation: {
                type: csToolsEnums.SegmentationRepresentations.Labelmap,
                data: {
                    volumeId: segmentationIds[segmentationCounter],
                },
            },
        },
    ]);

    // Add the segmentation representation to the toolgroup
    const [uid] = await segmentation.addSegmentationRepresentations(
        toolGroupId,
        [
            {
                segmentationId: newSegmentationId,
                type: csToolsEnums.SegmentationRepresentations.Labelmap,
            },
        ]
    );

    segmentationRepresentationUIDs.push(uid);

    segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        toolGroupId,
        uid
    );

    // Set the color of the active segmentation according to its index
    segmentation.segmentIndex.setActiveSegmentIndex(
        newSegmentationId,
        segmentationCounter + 1
    );

    segmentationCounter = segmentationCounter + 1;
}

export {
    addSegmentationsToState,
    segmentationToolGroup,
    segmentationToolsNames,
    segmentationIds,
    segmentationRepresentationUIDs,
};
