import { useState } from 'react';
import classnames from 'classnames';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { refreshSelectedViewport } from '@/utilities/uiHelper';

type TMeasurementItem = {
    uid: string;
    index: number;
    label: string;
    displayText: string;
    toolName: string;
    isActive: boolean;
    isLocked: boolean;
    onClick: (data: { uid: string | number; isActive: boolean; event: MouseEvent }) => void;
    onEdit: (data: { uid: string | number; isActive: boolean; event: MouseEvent }) => void;
};

const MeasurementItem = ({
    uid,
    index,
    label,
    displayText,
    toolName,
    isActive,
    isLocked,
    onClick,
    onEdit
}: TMeasurementItem) => {
    const [isHovering, setIsHovering] = useState(false);

    // const onEditHandler = (event: any) => {
    //     event.stopPropagation();
    //     onEdit({ uid, isActive, event });
    // };

    const onDeleteHandler = (event: any) => {
        event.stopPropagation();
        cornerstoneTools.annotation.state.removeAnnotation(uid);
        refreshSelectedViewport();
    };

    const onClickHandler = (event: any) => onClick({ uid, isActive, event });

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    return (
        <div
            className={classnames(
                'group flex cursor-pointer border border-transparent bg-AASecondShade outline-none transition duration-300',
                {
                    'border-primary-light overflow-hidden rounded': isActive
                }
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClickHandler}
            role="button"
            tabIndex={0}
            data-cy={'measurement-item'}
        >
            <div
                className={classnames('w-6 py-1 text-white text-center text-base transition duration-300', {
                    'bg-AAPrimary active': isActive,
                    'bg-AAPrimary bg-opacity-20  group-hover:bg-opacity-60': !isActive
                })}
            >
                {index}
            </div>
            <div className="relative flex flex-1 flex-col px-2 py-1">
                <span className="text-primary-light mb-1 text-base">
                    {label ? label : `${toolName}-${uid.split('-')[0]}`}
                </span>
                {displayText && (
                    <span className="border-primary-light border-l pl-2 text-base text-white">
                        ({displayText})
                    </span>
                )}
                {!isLocked && (
                    <div className="flex gap-1 top-1 right-1 absolute">
                        <DeleteIcon
                            className={classnames(
                                'w-4 cursor-pointer text-white transition duration-300',
                                { 'invisible mr-2 opacity-0': !isActive && !isHovering },
                                { 'opacity-1 visible': !isActive && isHovering }
                            )}
                            style={{
                                transform: isActive || isHovering ? '' : 'translateX(100%)'
                            }}
                            onClick={onDeleteHandler}
                        />
                        {/* <EditIcon
                            className={classnames(
                                'w-4 cursor-pointer text-white transition duration-300',
                                { 'invisible mr-2 opacity-0': !isActive && !isHovering },
                                { 'opacity-1 visible': !isActive && isHovering }
                            )}
                            style={{
                                transform: isActive || isHovering ? '' : 'translateX(100%)'
                            }}
                            onClick={onEditHandler}
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeasurementItem;
