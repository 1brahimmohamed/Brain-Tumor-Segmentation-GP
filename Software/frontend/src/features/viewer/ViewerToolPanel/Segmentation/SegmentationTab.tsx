import { AdvancedToolBox, SegmentationGroupTable } from '@ui/library';
import advancedToolConfig from '../AdvancedToolConfig.ts';
import {
    handleSegmentationDelete,
    handleSegmentationVisibilityToggle,
    handleSegmentClick,
    handleSegmentLockToggle,
    handleSegmentVisibilityToggle,
    onSegmentationClick
} from './SegmentationTableFunctions.ts';
import AISegmentation from './AISegmentation.tsx';
import ActiveLearning from './ActiveLearning.tsx';
import { CornerstoneToolManager } from '@features/viewer/CornerstoneToolManager';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';

const SegmentationTab = () => {
    const segmentations = useSelector((store: IStore) => store.viewer.segmentations);
    return (
        <div>
            <AdvancedToolBox title={'Segmentation Tools'} items={advancedToolConfig} />
            <ActiveLearning />
            <AISegmentation />
            <SegmentationGroupTable
                segmentations={segmentations}
                showAddSegmentation={true}
                showAddSegment={true}
                segmentationConfig={{
                    fillAlpha: 0.5,
                    fillAlphaInactive: 0.5,
                    outlineWidthActive: 2,
                    outlineOpacityActive: 1,
                    renderFill: true,
                    renderInactiveSegmentations: true,
                    renderOutline: false
                }}
                setFillAlpha={() => {}}
                setFillAlphaInactive={() => {}}
                setOutlineWidthActive={() => {}}
                setOutlineOpacityActive={() => {}}
                setRenderFill={() => {}}
                onSegmentAdd={() => CornerstoneToolManager.addSegmentToSegmentation(1)}
                onSegmentClick={handleSegmentClick}
                onSegmentationAdd={async () => await CornerstoneToolManager.addSegmentation()}
                onSegmentationClick={onSegmentationClick}
                onSegmentationDelete={handleSegmentationDelete}
                onSegmentationDownload={() => {
                    CornerstoneToolManager.downloadSegmentation();
                }}
                onSegmentationEdit={() => {}}
                onSegmentDelete={() => {}}
                onSegmentEdit={() => {}}
                onToggleSegmentationVisibility={handleSegmentationVisibilityToggle}
                onSegmentColorClick={() => {}}
                onToggleSegmentLock={handleSegmentLockToggle}
                onToggleSegmentVisibility={handleSegmentVisibilityToggle}
                setRenderInactiveSegmentations={() => {}}
                setRenderOutline={() => {}}
            />
        </div>
    );
};

export default SegmentationTab;
