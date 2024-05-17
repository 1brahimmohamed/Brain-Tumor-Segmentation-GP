import { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash, faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
type TSegmentItemProps = {
    segmentIndex: number;
    segmentationId: string;
    label?: string;
    disableEditing?: boolean;
    color: number[];
    isActive: boolean;
    isVisible: boolean;
    isLocked?: boolean;
    showDelete?: boolean;
    onColor: any;
    onClick: (segmentationId: string, segmentIndex: number) => void;
    onEdit: (segmentationId: string, segmentIndex: number) => void;
    onDelete: (segmentationId: string, segmentIndex: number) => void;
    onToggleVisibility: (segmentationId: string, segmentIndex: number) => void;
    onToggleLocked?: (segmentationId: string, segmentIndex: number) => void;
};

type THoveringIconsProps = {
    disableEditing: boolean;
    onEdit: (segmentationId: string, segmentIndex: number) => void;
    isLocked: boolean;
    isVisible: boolean;
    onToggleLocked: (segmentationId: string, segmentIndex: number) => void;
    onToggleVisibility: (segmentationId: string, segmentIndex: number) => void;
    segmentationId: string;
    segmentIndex: number;
};

const SegmentItem = ({
    segmentIndex,
    segmentationId,
    label,
    isActive,
    isVisible,
    color,
    showDelete,
    disableEditing,
    isLocked = false,
    onClick,
    onEdit,
    onDelete,
    onColor,
    onToggleVisibility,
    onToggleLocked
}: TSegmentItemProps) => {
    const [isNumberBoxHovering, setIsNumberBoxHovering] = useState(false);

    const cssColor = `rgb(${color[0]},${color[1]},${color[2]})`;

    return (
        <div
            className={classnames('text-white group/row flex min-h-[28px] px-1')}
            onClick={(e) => {
                e.stopPropagation();
                onClick(segmentationId, segmentIndex);
            }}
            tabIndex={0}
            data-cy={'segment-item'}
        >
            <div
                className={classnames(
                    'bg-AAFirstShade rounded-l group/number grid w-[32px] p-2 place-items-center',
                    {
                        'bg-AAPrimary border border-AAPrimary rounded-l-[4px] border-r-0 text-black':
                            isActive,
                        'bg-AASecondShade': !isActive
                    }
                )}
                onMouseEnter={() => setIsNumberBoxHovering(true)}
                onMouseLeave={() => setIsNumberBoxHovering(false)}
            >
                {isNumberBoxHovering && showDelete ? (
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={classnames('h-[8px] w-[8px]', {
                            'hover:cursor-pointer hover:opacity-60': !disableEditing
                        })}
                        onClick={(e) => {
                            if (disableEditing) {
                                return;
                            }
                            e.stopPropagation();
                            onDelete(segmentationId, segmentIndex);
                        }}
                    />
                ) : (
                    <div>{segmentIndex}</div>
                )}
            </div>
            <div
                className={classnames('relative flex w-full', {
                    'bg-AASecondShade  rounded-r-2 rounded-r-[4px]  border border-l-0  border-AAPrimary':
                        isActive,
                    'border-transparent': !isActive
                })}
            >
                <div className="group-hover/row:bg-primary-dark flex h-full w-full flex-grow items-center">
                    <div className="pl-2 pr-1.5">
                        <div
                            className={classnames('h-[8px] w-[8px] grow-0 rounded-full', {
                                'hover:cursor-pointer hover:opacity-60': !disableEditing
                            })}
                            style={{ backgroundColor: cssColor }}
                            onClick={(e) => {
                                if (disableEditing) {
                                    return;
                                }
                                e.stopPropagation();
                                onColor(segmentationId, segmentIndex);
                            }}
                        />
                    </div>
                    <div className="flex items-center py-1 hover:cursor-pointer">{label}</div>
                </div>
                <div
                    className={classnames(
                        'absolute right-3 top-0 flex flex-row-reverse rounded-lg pt-[3px]',
                        {}
                    )}
                >
                    <div className="group-hover/row:hidden">
                        {!isVisible && (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                className="h-4 w-4 text-gray-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleVisibility(segmentationId, segmentIndex);
                                }}
                            />
                        )}
                    </div>

                    {/* Icon for 'row-lock' that shows when NOT hovering and 'isLocked' is true */}
                    <div className="group-hover/row:hidden">
                        {isLocked && (
                            <div className="flex">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="h-4 w-4 text-gray-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onToggleLocked) onToggleLocked(segmentationId, segmentIndex);
                                    }}
                                />

                                {/* This icon is visible when 'isVisible' is true */}
                                {isVisible && (
                                    <FontAwesomeIcon icon={faEyeSlash} className="h-4 w-4 opacity" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Icons that show only when hovering */}
                    <div className="hidden group-hover/row:flex">
                        <HoveringIcons
                            disableEditing={disableEditing ?? true}
                            onEdit={onEdit}
                            isLocked={isLocked}
                            isVisible={isVisible}
                            onToggleLocked={onToggleLocked ?? (() => {})}
                            onToggleVisibility={onToggleVisibility}
                            segmentationId={segmentationId}
                            segmentIndex={segmentIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const HoveringIcons = ({
    disableEditing,
    onEdit,
    isLocked,
    isVisible,
    onToggleLocked,
    onToggleVisibility,
    segmentationId,
    segmentIndex
}: THoveringIconsProps) => {
    const iconClass = 'hover:cursor-pointer hover:text-AAPrimaryLight';

    const handleIconClick = (e: any, action: (segId: string, segIdx: number) => void) => {
        e.stopPropagation();
        action(segmentationId, segmentIndex);
    };

    const createIcon = (
        icon: IconProp,
        action: (segId: string, segIdx: number) => void,
        color: string | null = null
    ) => (
        <FontAwesomeIcon
            icon={icon}
            className={classnames(iconClass, color ?? 'text-white')}
            onClick={(e) => handleIconClick(e, action)}
        />
    );

    return (
        <div className="flex items-center">
            {!disableEditing && createIcon(faPen, onEdit)}
            {!disableEditing &&
                createIcon(
                    isLocked ? faLock : faLockOpen,
                    onToggleLocked,
                    isLocked ? 'text-white text-opacity-50' : null
                )}
            {createIcon(
                isVisible ? faEye : faEyeSlash,
                onToggleVisibility,
                !isVisible ? 'text-white text-opacity-50' : null
            )}
        </div>
    );
};

export default SegmentItem;
