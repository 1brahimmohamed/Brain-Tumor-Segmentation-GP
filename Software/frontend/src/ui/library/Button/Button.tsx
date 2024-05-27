import classnames from 'classnames';
import React, { useRef } from 'react';
import * as ButtonEnums from './ButtonEnums';

const sizeClasses = {
    [ButtonEnums.size.small]: 'h-[26px] text-[13px]',
    [ButtonEnums.size.medium]: 'h-[32px] text-[14px]'
};

const layoutClasses =
    'box-content inline-flex flex-row items-center justify-center gap-[5px] justify center px-[10px] outline-none rounded';

const baseFontTextClasses = 'leading-[1.2] font-sans text-center whitespace-nowrap';

const fontTextClasses = {
    [ButtonEnums.type.primary]: classnames(baseFontTextClasses, 'font-semibold'),
    [ButtonEnums.type.secondary]: classnames(baseFontTextClasses, 'font-400')
};

const baseEnabledEffectClasses = 'transition duration-300 ease-in-out focus:outline-none';

const enabledEffectClasses = {
    [ButtonEnums.type.primary]: classnames(
        baseEnabledEffectClasses,
        'hover:bg-customblue-80 active:bg-customblue-40'
    ),
    [ButtonEnums.type.secondary]: classnames(
        baseEnabledEffectClasses,
        'hover:bg-customblue-50 active:bg-customblue-20'
    )
};

const baseEnabledClasses = 'text-white';

const enabledClasses = {
    [ButtonEnums.type.primary]: classnames(
        'bg-primary-main',
        baseEnabledClasses,
        enabledEffectClasses[ButtonEnums.type.primary]
    ),
    [ButtonEnums.type.secondary]: classnames(
        'bg-customblue-30',
        baseEnabledClasses,
        enabledEffectClasses[ButtonEnums.type.secondary]
    )
};

const disabledClasses = 'bg-inputfield-placeholder text-common-light cursor-default';

const defaults = {
    color: 'default',
    disabled: false,
    rounded: 'small',
    size: ButtonEnums.size.medium,
    type: ButtonEnums.type.primary
};

type TButtonProps = {
    children?: React.ReactNode;
    size?: ButtonEnums.size;
    disabled?: boolean;
    type?: ButtonEnums.type;
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
    name: string;
    className?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
    children,
    size = defaults.size,
    disabled = defaults.disabled,
    type = defaults.type,
    startIcon: startIconProp,
    endIcon: endIconProp,
    name,
    className,
    onClick
}: TButtonProps) => {
    const startIcon = startIconProp && (
        <>
            {React.cloneElement(startIconProp, {
                className: classnames('w-4 h-4 fill-current')
            })}
        </>
    );

    const endIcon = endIconProp && (
        <>
            {React.cloneElement(endIconProp, {
                className: classnames('w-4 h-4 fill-current')
            })}
        </>
    );
    const buttonElement = useRef<HTMLButtonElement>(null);

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (buttonElement.current) {
            buttonElement.current.blur();
        }

        if (!disabled) {
            onClick(e);
        }
    };

    const finalClassName = classnames(
        layoutClasses,
        fontTextClasses[type],
        disabled ? disabledClasses : enabledClasses[type],
        sizeClasses[size],
        children ? 'min-w-[32px]' : '', // minimum width for buttons with text; icon only button does NOT get a minimum width
        className
    );

    return (
        <button
            className={finalClassName}
            disabled={disabled}
            ref={buttonElement}
            onClick={handleOnClick}
            data-cy={`${name}-btn`}
        >
            {startIcon}
            {children}
            {endIcon}
        </button>
    );
};

export default Button;
