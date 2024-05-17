import { Select, Dropdown } from '@ui/library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faEye, faEyeSlash, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type TSegmentationDropDownRow = {
    segmentations: {
        id: string;
        isActive: boolean;
        label: string;
        segments: {
            segmentIndex: number;
            color: number[];
            label: string;
            isVisible: boolean;
            isLocked: boolean;
        }[];
    }[];
    activeSegmentation: {
        id: string;
        isActive: boolean;
        label: string;
        segments: {
            segmentIndex: number;
            color: number[];
            label: string;
            isVisible: boolean;
            isLocked: boolean;
        }[];
    };
    onActiveSegmentationChange: (state: any) => void;
    disableEditing?: boolean;
    onToggleSegmentationVisibility?: (segmentationId: string) => void;
    onSegmentationEdit?: (state: any) => void;
    onSegmentationDownload?: (state: any) => void;
    onSegmentationDownloadRTSS?: (state: any) => void;
    storeSegmentation?: (state: any) => void;
    onSegmentationDelete?: (state: any) => void;
    onSegmentationAdd?: () => void;
};

function SegmentationDropDownRow({
    segmentations = [],
    activeSegmentation,
    onActiveSegmentationChange,
    disableEditing,
    onToggleSegmentationVisibility,
    onSegmentationEdit,
    onSegmentationDownload,
    onSegmentationDelete,
    onSegmentationAdd
}: TSegmentationDropDownRow) {
    const handleChange = (option: any) => {
        onActiveSegmentationChange(option.value); // Notify the parent
    };

    const selectOptions = segmentations.map((segmentation) => ({
        value: segmentation.id,
        label: segmentation.label
    }));

    if (!activeSegmentation) {
        return null;
    }

    return (
        <div className="group mx-0.5 mt-3 flex items-center">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Dropdown
                    id="segmentation-dropdown"
                    showDropdownIcon={false}
                    alignment="left"
                    itemsClassName="text-white"
                    showBorders={false}
                    maxCharactersPerLine={30}
                    list={[
                        ...(!disableEditing
                            ? [
                                  {
                                      title: 'Add new segmentation',
                                      onClick: () => {
                                          if (onSegmentationAdd) onSegmentationAdd();
                                      }
                                  }
                              ]
                            : []),
                        ...(!disableEditing
                            ? [
                                  {
                                      title: 'Rename',
                                      onClick: () => {
                                          if (activeSegmentation && onSegmentationEdit)
                                              onSegmentationEdit(activeSegmentation.id);
                                      }
                                  }
                              ]
                            : []),
                        {
                            title: 'Delete',
                            onClick: () => {
                                if (activeSegmentation && onSegmentationDelete)
                                    onSegmentationDelete(activeSegmentation.id);
                            }
                        },
                        ...[
                            {
                                title: 'Download DICOM SEG',
                                onClick: () => {
                                    if (onSegmentationDownload) onSegmentationDownload(activeSegmentation.id);
                                }
                            }
                        ]
                    ]}
                >
                    <div className="hover:bg-AAPrimaryDark hover:bg-opacity-15 mx-1 grid h-[28px] w-[28px]  cursor-pointer place-items-center rounded-[4px]">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Dropdown>
            </div>
            {selectOptions?.length && (
                <Select
                    id="segmentation-select"
                    isClearable={false}
                    onChange={handleChange}
                    components={{
                        DropdownIndicator: () => <FontAwesomeIcon icon={faChevronDown} className="mr-2" />
                    }}
                    isSearchable={false}
                    options={selectOptions}
                    value={selectOptions?.find((o) => o.value === activeSegmentation.id)}
                    className="h-[26px]  w-1/2 text-[13px]"
                />
            )}
            <div className="flex items-center">
                <div
                    className="hover:bg-AAPrimaryDark hover:bg-opacity-15 ml-3 mr-1 grid h-[28px] w-[28px] cursor-pointer place-items-center rounded-[4px]"
                    onClick={() =>
                        onToggleSegmentationVisibility
                            ? onToggleSegmentationVisibility(activeSegmentation.id)
                            : null
                    }
                >
                    {activeSegmentation.segments[0].isVisible ? (
                        <FontAwesomeIcon icon={faEye} className="text-white" />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} className="text-white text-opacity-50" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SegmentationDropDownRow;
