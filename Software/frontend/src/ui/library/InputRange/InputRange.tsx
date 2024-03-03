import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { InputNumber } from '@ui/library';
import getMaxDigits from '@utilities/helpers/getMaxDigits';
import './InputRange.scss';

type TInputRangeProps = {
    value: number;
    onChange: (value: number) => void;
    minValue: number;
    maxValue: number;
    step: number;
    unit?: string;
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    labelVariant?: string;
    showLabel?: boolean;
    labelPosition?: string;
    trackColor?: string;
    allowNumberEdit?: boolean;
    showAdjustmentArrows?: boolean;
};

const InputRange: React.FC<TInputRangeProps> = ({
    value,
    onChange,
    minValue,
    maxValue,
    step = 1,
    unit = '',
    containerClassName,
    inputClassName,
    labelClassName,
    showLabel = true,
    labelPosition = 'right',
    allowNumberEdit = false,
    showAdjustmentArrows = true
}) => {
    const [rangeValue, setRangeValue] = useState(value);

    const maxDigits = getMaxDigits(maxValue, step);
    const labelWidth = `${maxDigits * 10}px`;

    useEffect(() => setRangeValue(value), [value]);

    const handleChange = useCallback(
        (e: any) => {
            const val = Number(e.target.value);
            const roundedVal = Math.round(val / step) * step;
            setRangeValue(roundedVal);
            onChange(roundedVal);
        },
        [onChange, step]
    );

    const rangeValuePercentage = ((rangeValue - minValue) / (maxValue - minValue)) * 100;

    const LabelOrEditableNumber = allowNumberEdit ? (
        <InputNumber
            minValue={minValue}
            maxValue={maxValue}
            value={rangeValue}
            onChange={(val) => {
                setRangeValue(val);
                onChange(val);
            }}
            step={step}
            showAdjustmentArrows={showAdjustmentArrows}
        />
    ) : (
        <span className={classNames(labelClassName ?? 'text-white ')}>
            {rangeValue}
            {unit}
        </span>
    );

    return (
        <div
            className={`flex cursor-pointer  items-center ${containerClassName ?? ''}`}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div className="relative flex w-full items-center space-x-2">
                {showLabel && labelPosition === 'left' && (
                    <div style={{ width: labelWidth }}>{LabelOrEditableNumber}</div>
                )}
                <div className="range-track"></div>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={rangeValue}
                    className={`h-[3px] appearance-none rounded-md ${inputClassName ?? ''}`}
                    style={{
                        background: `linear-gradient(to right, #0b769e 0%, #10a9e2 ${rangeValuePercentage}%, #27272b ${rangeValuePercentage}%, #27272b 100%)`
                    }}
                    onChange={handleChange}
                    id="myRange"
                    step={step}
                />
                {showLabel && labelPosition === 'right' && (
                    <div style={{ width: labelWidth }}>{LabelOrEditableNumber}</div>
                )}
            </div>
        </div>
    );
};

export default InputRange;
