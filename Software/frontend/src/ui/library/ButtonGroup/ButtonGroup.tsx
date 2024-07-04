import classnames from 'classnames';
import React, { useState } from 'react';
import { ButtonEnums } from '@ui/library';

type TButtonGroupProps = {
    buttons: Array<any>;
    onActiveIndexChange?: (index: number) => void;
    className?: string;
    orientation?: string;
    defaultActiveIndex?: number;
    activeTabColor?: string;
};

const ButtonGroup = ({
    buttons,
    onActiveIndexChange,
    className,
    orientation = ButtonEnums.orientation.horizontal,
    defaultActiveIndex = 0,
    activeTabColor
}: TButtonGroupProps) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const handleButtonClick = (e: React.MouseEvent, index: number) => {
        setActiveIndex(index);
        onActiveIndexChange && onActiveIndexChange(index);
        buttons[index].onClick && buttons[index].onClick(e);
    };

    const orientationClasses: { [key: string]: string } = {
        horizontal: 'flex-row',
        vertical: 'flex-col'
    };

    const wrapperClasses = classnames('inline-flex', orientationClasses[orientation], className);

    return (
        <div
            className={classnames(
                wrapperClasses,
                'ring-2 ring-AAPrimaryLight ring-opacity-50 rounded-md bg-AAFirstShade text-md '
            )}
        >
            {buttons.map((buttonProps, index) => {
                const isActive = index === activeIndex;
                return (
                    <button
                        {...buttonProps}
                        key={index}
                        className={classnames(
                            'rounded-md px-2 py-1 hover:bg-AAPrimaryDark',
                            isActive
                                ? `text-white ${activeTabColor ? activeTabColor : 'bg-AAPrimary'}`
                                : 'text-primary-active bg-AAFirstShade'
                        )}
                        onClick={(e) => handleButtonClick(e, index)}
                    />
                );
            })}
        </div>
    );
};

export default ButtonGroup;
