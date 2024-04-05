import React, { useState } from 'react';
import classnames from 'classnames';
import './tooltip.scss';

const arrowPositionStyle = {
    bottom: {
        top: -15,
        left: '50%',
        transform: 'translateX(-50%)'
    },
    'bottom-left': { top: -15, left: 5 },
    'bottom-right': { top: -15, right: 5 },
    right: {
        top: 'calc(50% - 8px)',
        left: -15,
        transform: 'rotate(270deg)'
    },
    left: {
        top: 'calc(50% - 8px)',
        right: -15,
        transform: 'rotate(-270deg)'
    },
    top: {
        bottom: -15,
        left: '50%',
        transform: 'translateX(-50%) rotate(180deg)'
    }
};

type TTooltipProps = {
    content: React.ReactNode;
    isSticky?: boolean;
    position: 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'left' | 'top';
    className?: string;
    tight?: boolean;
    children: React.ReactNode;
    isDisabled?: boolean;
};

const Tooltip = ({ content, isSticky, position, className, tight, children, isDisabled }: TTooltipProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleMouseOver = () => {
        if (!isActive) {
            setIsActive(true);
        }
    };

    const handleMouseOut = () => {
        if (isActive) {
            setIsActive(false);
        }
    };

    const isOpen = (isSticky || isActive) && !isDisabled;

    return (
        <div
            className={classnames('relative', className)}
            onMouseOver={handleMouseOver}
            onFocus={handleMouseOver}
            onMouseOut={handleMouseOut}
            onBlur={handleMouseOut}
            role="tooltip"
        >
            {children}
            <div
                className={classnames(`tooltip tooltip-${position}`, {
                    block: isOpen,
                    hidden: !isOpen
                })}
            >
                <div
                    className={classnames(
                        'tooltip-box bg-AASecondShade ring-2 ring-AAPrimaryLight w-max-content relative inset-x-auto top-full rounded-md text-base text-white',
                        {
                            'py-1 px-4': !tight
                        }
                    )}
                >
                    {content}
                    <svg
                        className="text-AASecondShade stroke-2 stroke-AAPrimaryLight absolute h-4"
                        style={arrowPositionStyle[position]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="currentColor" d="M24 22l-12-20l-12 20" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
