import React, { useState, useCallback, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Label } from '@ui/library';
import { twMerge } from 'tailwind-merge';
import getMaxDigits from '@utilities/helpers/getMaxDigits.ts';
import './InputNumber.scss';

const sizesClasses = {
    sm: 'w-[45px] h-[28px]',
    lg: 'w-[206px] h-[35px]'
};

type TInputNumberProps = {
    value: number;
    onChange: (value: number) => void;
    step?: number;
    className?: string;
    size?: 'sm' | 'lg';
    minValue?: number;
    maxValue?: number;
    labelClassName?: string;
    label?: string;
    showAdjustmentArrows?: boolean;
};

const InputNumber = (props: TInputNumberProps) => {
    const {
        value,
        onChange,
        step = 1,
        className,
        size = 'sm',
        minValue = -Infinity,
        maxValue = Infinity,
        labelClassName,
        label,
        showAdjustmentArrows = true
    } = props;

    const [numberValue, setNumberValue] = useState<number>(value);
    const [isFocused, setIsFocused] = useState(false);

    const maxDigits = getMaxDigits(maxValue, step);
    const inputWidth = Math.max(maxDigits * 10, showAdjustmentArrows ? 20 : 28);
    const arrowWidth = showAdjustmentArrows ? 20 : 0;
    const containerWidth = `${inputWidth + arrowWidth}px`;
    const decimalPlaces = Number.isInteger(step) ? 0 : step.toString().split('.')[1].length;

    useEffect(() => {
        setNumberValue(value);
    }, [value]);

    const handleMinMax = useCallback(
        (val: number) => Math.min(Math.max(val, minValue), maxValue),
        [maxValue, minValue]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // // Allow negative sign, empty string, or single decimal point for user flexibility
        // if (inputValue === '-' || inputValue === '' || inputValue === '.') {
        //     setNumberValue(inputValue);
        //     return;
        // }

        const number = Number(inputValue);

        // Filter out invalid inputs like 'NaN'
        if (!isNaN(number)) {
            updateValue(number);
        }
    };

    const updateValue = (val: number) => {
        const newValue = handleMinMax(val);
        setNumberValue(newValue);
        onChange(newValue);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setNumberValue(numberValue);
    };

    const increment = () => updateValue(numberValue + step);
    const decrement = () => updateValue(numberValue - step);

    return (
        <div className="flex flex-1 flex-col">
            {label && <Label className={labelClassName} text={label} />}
            <div
                className={twMerge(
                    'flex items-center justify-center overflow-hidden rounded-sm ring-1 ring-opacity-50 ring-AAPrimaryLight bg-AASecondShade px-1 ',
                    sizesClasses[size],
                    className
                )}
                style={{ width: containerWidth }}
            >
                <div className="flex">
                    <input
                        type="number"
                        value={isFocused ? numberValue : numberValue.toFixed(decimalPlaces)}
                        step={step}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={
                            'input-number w-full bg-AASecondShade text-center text-md text-white focus'
                        }
                        style={{ width: inputWidth }}
                    />
                    {showAdjustmentArrows && (
                        <div className="up-arrowsize flex flex-col items-center justify-around">
                            <ArrowButton onClick={increment} rotate />
                            <ArrowButton onClick={decrement} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ArrowButton = ({ onClick, rotate = false }: { onClick: () => void; rotate?: boolean }) => (
    <ArrowDropDownIcon
        onClick={onClick}
        className={`text-[#726f7e] ${rotate ? 'rotate-180 transform' : ''}`}
    />
);

export default InputNumber;
