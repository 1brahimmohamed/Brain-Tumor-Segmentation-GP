import { useEffect, useState } from 'react';
import { PanelSection } from '@ui/library';
import SegmentationConfig from './SegmentationConfig';
import SegmentationDropDownRow from './SegmentationDropDownRow';
import NoSegmentationRow from './NoSegmentationRow';
import AddSegmentRow from './AddSegmentRow';
import SegmentationGroupSegment from './SegmentationGroupSegment';
import { faCog } from '@fortawesome/free-solid-svg-icons';

type SegmentationGroupTableProps = {
    segmentations: {
        volumeId?: string;
        activeSegmentIndex: number;
        id: string;
        isActive: boolean;
        label: string;
        type?: string;
        colorLUTIndex?: number;
        isVisible: boolean;
        segments: {
            opacity: number;
            isActive: boolean;
            segmentIndex: number;
            color: number[];
            label: string;
            isVisible: boolean;
            isLocked: boolean;
        }[];
    }[];
    segmentationConfig: any;
    disableEditing?: boolean;
    showAddSegmentation?: boolean;
    showAddSegment?: boolean;
    showDeleteSegment?: boolean;
    onSegmentationAdd: () => void;
    onSegmentationEdit: () => void;
    onSegmentationClick: (segmentationId: string) => void;
    onSegmentationDelete: (segmentationId: string) => void;
    onSegmentationDownload: () => void;
    onSegmentClick: (segmentationId: string, segmentIndex: number) => void;
    onSegmentAdd: (segmentId: string) => void;
    onSegmentDelete: () => void;
    onSegmentEdit: () => void;
    onToggleSegmentationVisibility: (segmentationId: string) => void;
    onToggleSegmentVisibility: (segmentationId: string, segmentIndex: number) => void;
    onToggleSegmentLock: (segmentationId: string, segmentIndex: number) => void;
    onSegmentColorClick: () => void;
    setFillAlpha: () => void;
    setFillAlphaInactive: () => void;
    setOutlineWidthActive: () => void;
    setOutlineOpacityActive: () => void;
    setRenderFill: () => void;
    setRenderInactiveSegmentations: () => void;
    setRenderOutline: () => void;
};

const SegmentationGroupTable = ({
    segmentations,
    // segmentation initial config
    segmentationConfig,
    // UI show/hide
    disableEditing,
    showAddSegmentation,
    showAddSegment,
    showDeleteSegment,
    // segmentation/segment handlers
    onSegmentationAdd,
    onSegmentationEdit,
    onSegmentationClick,
    onSegmentationDelete,
    onSegmentationDownload,

    // segment handlers
    onSegmentClick,
    onSegmentAdd,
    onSegmentDelete,
    onSegmentEdit,
    onToggleSegmentationVisibility,
    onToggleSegmentVisibility,
    onToggleSegmentLock,
    onSegmentColorClick,
    // segmentation config handlers
    setFillAlpha,
    setFillAlphaInactive,
    setOutlineWidthActive,
    setOutlineOpacityActive,
    setRenderFill,
    setRenderInactiveSegmentations,
    setRenderOutline
}: SegmentationGroupTableProps) => {
    const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
    const [activeSegmentationId, setActiveSegmentationId] = useState<string>('');

    const onActiveSegmentationChange = (segmentationId: string) => {
        onSegmentationClick(segmentationId);
        setActiveSegmentationId(segmentationId);
    };

    useEffect(() => {
        // find the first active segmentation to set
        let activeSegmentationIdToSet = segmentations!.find((segmentation) => segmentation.isActive)?.id;

        // If there is no active segmentation, set the first one to be active
        if (!activeSegmentationIdToSet && segmentations?.length > 0) {
            activeSegmentationIdToSet = segmentations[0].id;
        }

        // If there is no segmentation, set the active segmentation to null
        if (segmentations?.length === 0) {
            activeSegmentationIdToSet = '';
        }

        if (!activeSegmentationIdToSet) return;

        setActiveSegmentationId(activeSegmentationIdToSet);
    }, [segmentations]);

    const activeSegmentation = segmentations?.find(
        (segmentation) => segmentation.id === activeSegmentationId
    );

    return (
        <div className="flex min-h-0 flex-col text-[13px] font-[300]  ">
            <PanelSection
                title={'Segmentation'}
                actionIcons={
                    activeSegmentation && [
                        {
                            name: 'settings-bars',
                            onClick: () => setIsConfigOpen((isOpen) => !isOpen),
                            component: faCog
                        }
                    ]
                }
            >
                {isConfigOpen && (
                    <SegmentationConfig
                        setFillAlpha={setFillAlpha}
                        setFillAlphaInactive={setFillAlphaInactive}
                        setOutlineWidthActive={setOutlineWidthActive}
                        setOutlineOpacityActive={setOutlineOpacityActive}
                        setRenderFill={setRenderFill}
                        setRenderInactiveSegmentations={setRenderInactiveSegmentations}
                        setRenderOutline={setRenderOutline}
                        segmentationConfig={segmentationConfig}
                    />
                )}
                <div className=" bg-opacity-70">
                    {segmentations?.length === 0 ? (
                        <div className="select-none bg-AAPrimary">
                            {showAddSegmentation && !disableEditing && (
                                <NoSegmentationRow onSegmentationAdd={onSegmentationAdd} />
                            )}
                        </div>
                    ) : (
                        <div className="mt-1 select-none">
                            <SegmentationDropDownRow
                                segmentations={segmentations}
                                disableEditing={disableEditing}
                                activeSegmentation={activeSegmentation!}
                                onActiveSegmentationChange={onActiveSegmentationChange}
                                onSegmentationDelete={onSegmentationDelete}
                                onSegmentationEdit={onSegmentationEdit}
                                onSegmentationDownload={onSegmentationDownload}
                                onSegmentationAdd={onSegmentationAdd}
                                onToggleSegmentationVisibility={onToggleSegmentationVisibility}
                            />
                            {!disableEditing && showAddSegment && (
                                <AddSegmentRow onClick={() => onSegmentAdd(activeSegmentationId)} />
                            )}
                        </div>
                    )}
                </div>
                {activeSegmentation && (
                    <div className="ohif-scrollbar pb-5 mt-1.5 flex min-h-0 flex-col overflow-y-hidden bg-AASecondShade bg-opacity-40">
                        {activeSegmentation?.segments?.map((segment) => {
                            if (!segment) {
                                return null;
                            }

                            const { segmentIndex, color, label, isVisible, isLocked } = segment;
                            return (
                                <div className="mb-[1px]" key={segmentIndex}>
                                    <SegmentationGroupSegment
                                        segmentationId={activeSegmentationId}
                                        segmentIndex={segmentIndex}
                                        label={label}
                                        color={color}
                                        isActive={segment.isActive}
                                        disableEditing={disableEditing}
                                        isLocked={isLocked}
                                        isVisible={isVisible}
                                        onClick={onSegmentClick}
                                        onEdit={onSegmentEdit}
                                        onDelete={onSegmentDelete}
                                        showDelete={showDeleteSegment}
                                        onColor={onSegmentColorClick}
                                        onToggleVisibility={onToggleSegmentVisibility}
                                        onToggleLocked={onToggleSegmentLock}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </PanelSection>
        </div>
    );
};

export default SegmentationGroupTable;
