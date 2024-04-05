import {AdvancedToolBox} from "@ui/library";
import SegmentationGroupTable from "@ui/library/SegmentationGroupTable/SegmentationGroupTable.tsx";
import advancedToolConfig from "@features/viewer/ViewerToolPanel/segmentation-config.ts";
import {CornerstoneToolManager} from "../CornerstoneToolManager";
import * as cornerstoneTools from '@cornerstonejs/tools';

const SegmentationTab = () => {


    return (
        <div>
            <AdvancedToolBox
                title={"Segmentation Tools"}
                items={advancedToolConfig}
            />
            <SegmentationGroupTable
                segmentations={[
                    {
                        "id": "4be5-b9b2-ed33-fa86970568e7",
                        "volumeId": "a3b0f15f-4be5-b9b2-ed33-fa86970568e7",
                        "activeSegmentIndex": 2,
                        "label": "Segmentation 1",
                        "type": "LABELMAP",
                        "segments": [
                            {
                                "label": "Seg 1",
                                "segmentIndex": 1,
                                "color": [
                                    128,
                                    174,
                                    128
                                ],
                                "opacity": 255,
                                "isVisible": false,
                                "isLocked": true,
                                isActive: true
                            },
                            {
                                "label": "Segment 2",
                                "segmentIndex": 2,
                                "color": [
                                    241,
                                    214,
                                    145
                                ],
                                "opacity": 255,
                                "isVisible": true,
                                "isLocked": false,
                                isActive: false

                            },
                            {
                                "label": "Segment 3",
                                "segmentIndex": 3,
                                "color": [
                                    141,
                                    114,
                                    145
                                ],
                                "opacity": 255,
                                "isVisible": false,
                                "isLocked": false,
                                isActive: false

                            }
                        ],
                        "isActive": false,
                        "colorLUTIndex": 1,
                        "isVisible": true
                    },
                    {
                        "id": "a3b0f15f-4be5-b9b2-ed33-fa86970568e7",
                        "volumeId": "a3b0f15f-4be5-b9b2-ed33-fa86970568e7",
                        "activeSegmentIndex": 1,
                        "label": "Segmentation 2",
                        "type": "LABELMAP",
                        "segments": [
                            {
                                "label": "Segment 1",
                                "segmentIndex": 1,
                                "color": [
                                    228,
                                    174,
                                    128
                                ],
                                "opacity": 255,
                                "isVisible": true,
                                "isLocked": false,
                                "isActive": false,
                            }
                        ],
                        "isActive": true,
                        "colorLUTIndex": 1,
                        "isVisible": true
                    }
                ]}
                showAddSegmentation={true}
                showAddSegment={true}
                segmentationConfig={{
                    "fillAlpha": 0.5,
                    "fillAlphaInactive": 0.5,
                    "outlineWidthActive": 2,
                    "outlineOpacityActive": 1,
                    "renderFill": true,
                    "renderInactiveSegmentations": true,
                    "renderOutline": true
                }}
                setFillAlpha={() => {
                }}
                setFillAlphaInactive={() => {
                }}
                setOutlineWidthActive={() => {
                }}
                setOutlineOpacityActive={() => {
                }}
                setRenderFill={() => {
                }}
                onSegmentAdd={() => {
                    CornerstoneToolManager.addSegmentToSegmentation();
                }}
                onSegmentClick={() => {
                }}
                onSegmentationAdd={async () => {
                    await CornerstoneToolManager.addSegmentation();
                }}
                onSegmentationClick={() => {
                }}
                onSegmentationDelete={() => {
                }}
                onSegmentationDownload={() => {
                    console.log(cornerstoneTools.segmentation.state.getSegmentations())
                }}
                onSegmentationEdit={() => {
                }}
                onSegmentDelete={() => {
                }}
                onSegmentEdit={() => {
                }}
                onToggleSegmentationVisibility={() => {
                }}
                onSegmentColorClick={() => {
                }}
                onToggleSegmentLock={() => {
                }}
                onToggleSegmentVisibility={() => {
                }}
                setRenderInactiveSegmentations={() => {
                }}
                setRenderOutline={() => {
                }}
            />

        </div>
    )

}

export default SegmentationTab;
