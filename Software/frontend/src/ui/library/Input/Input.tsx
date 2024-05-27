import React, { useState } from 'react';
import Label from '../Label/Label.tsx';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

const baseInputClasses = twMerge(
    'block w-full appearance-none rounded-sm bg-AASecondShade py-2 px-2 text-base leading-tight shadow transition duration-300',
    'focus:outline-none focus:ring-2 focus:ring-AAPrimaryLight focus:ring-opacity-50',
    'disabled:bg-AAFirstShade disabled:cursor-not-allowed disabled:opacity-50'
);

const transparentClasses: { [key: string]: string } = {
    true: 'bg-transparent',
    false: ''
};

const smallInputClasses: { [key: string]: string } = {
    true: 'input-small',
    false: ''
};

type TInputProps = {
    id: string;
    label?: string;
    containerClassName?: string;
    labelClassName?: string;
    className?: string;
    transparent?: boolean;
    smallInput?: boolean;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

const Input = ({
    id,
    label,
    containerClassName = '',
    labelClassName = '',
    className = '',
    transparent = false,
    smallInput = false,
    type = 'text',
    value,
    onChange,
    onFocus,
    autoFocus,
    onKeyPress,
    onKeyDown,
    readOnly,
    disabled,
    ...otherProps
}: TInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value || '');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={classnames('flex flex-1 flex-col', containerClassName)}>
            {label && <Label className={labelClassName} text={label} />}
            <input
                data-cy={`input-${id}`}
                className={classnames(
                    label && 'mt-2',
                    className,
                    baseInputClasses,
                    transparentClasses[transparent.toString()],
                    smallInputClasses[smallInput.toString()],
                    { 'cursor-not-allowed': disabled }
                )}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                type={type}
                value={inputValue}
                onChange={handleOnChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                placeholder={otherProps.placeholder}
                {...otherProps}
            />
        </div>
    );
};

export default Input;
