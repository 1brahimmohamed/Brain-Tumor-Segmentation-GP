import { useState } from 'react';
import { InputRange, InputNumber, CheckBox } from '@ui/library';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const getRoundedValue = (value: number) => {
    return Math.round(value * 100) / 100;
};

type TActiveSegmentationConfig = {
    config: any;
    setRenderOutline: (state: boolean) => void;
    setOutlineOpacityActive: (state: number) => void;
    setOutlineWidthActive: (state: number) => void;
    setRenderFill: (state: boolean) => void;
    setFillAlpha: (state: number) => void;
};

const ActiveSegmentationConfig = ({
    config,
    setRenderOutline,
    setOutlineOpacityActive,
    setOutlineWidthActive,
    setRenderFill,
    setFillAlpha
}: TActiveSegmentationConfig) => {
    return (
        <div className="flex justify-between px-3 pt-[13px] text-[12px]">
            <div className="flex flex-col items-start">
                <div className="mb-[12px] text-white">{'Active'}</div>
                <CheckBox
                    label={'Outline'}
                    checked={config.renderOutline}
                    labelClassName="text-[12px] pl-1 pt-1"
                    className="mb-[9px]"
                    onChange={setRenderOutline}
                />
                <CheckBox
                    label={'Fill'}
                    checked={config.renderFill}
                    labelClassName="text-[12px] pl-1 pt-1"
                    className="mb-[9px]"
                    onChange={setRenderFill}
                />
            </div>

            <div className="col-span-2 flex flex-col items-center">
                <div className="mb-[12px] text-[10px] text-[#b3b3b3]">{'Opacity'}</div>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={getRoundedValue(config.outlineOpacity * 100)}
                    onChange={setOutlineOpacityActive}
                    step={1}
                    containerClassName="mt-[4px] mb-[9px]"
                    inputClassName="w-[64px]"
                    labelClassName="text-white text-[12px]"
                    unit="%"
                />
                <InputRange
                    minValue={4}
                    maxValue={100}
                    value={getRoundedValue(config.fillAlpha * 100)}
                    onChange={setFillAlpha}
                    step={1}
                    containerClassName="mt-[4px] mb-[9px]"
                    inputClassName="w-[64px]"
                    labelClassName="text-white text-[12px]"
                    unit="%"
                />
            </div>

            <div className="flex flex-col items-center">
                <div className="mb-[12px] text-[10px] text-[#b3b3b3]">{'Size'}</div>
                <InputNumber
                    value={config.outlineWidthActive}
                    onChange={setOutlineWidthActive}
                    minValue={0}
                    maxValue={10}
                    className="-mt-1"
                />
            </div>
        </div>
    );
};

type TInactiveSegmentationConfig = {
    config: any;
    setRenderInactiveSegmentations: (state: boolean) => void;
    setFillAlphaInactive: (state: number) => void;
};

const InactiveSegmentationConfig = ({
    config,
    setRenderInactiveSegmentations,
    setFillAlphaInactive
}: TInactiveSegmentationConfig) => {
    return (
        <div className="px-3">
            <CheckBox
                label={'Display inactive segmentations'}
                checked={config.renderInactiveSegmentations}
                labelClassName="text-[12px]"
                className="mb-[9px]"
                onChange={setRenderInactiveSegmentations}
            />

            <div className="flex items-center space-x-2 pl-4">
                <span className="text-[10px] text-[#b3b3b3]">{'Opacity'}</span>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={getRoundedValue(config.fillAlphaInactive * 100)}
                    onChange={setFillAlphaInactive}
                    step={1}
                    containerClassName="mt-[4px]"
                    inputClassName="w-[64px]"
                    labelClassName="text-white text-[12px]"
                    unit="%"
                />
            </div>
        </div>
    );
};

type TSegmentationConfig = {
    segmentationConfig: any;
    setFillAlpha: (state: number) => void;
    setFillAlphaInactive: (state: number) => void;
    setOutlineWidthActive: (state: number) => void;
    setOutlineOpacityActive: (state: number) => void;
    setRenderFill: (state: boolean) => void;
    setRenderInactiveSegmentations: (state: boolean) => void;
    setRenderOutline: (state: boolean) => void;
};

const SegmentationConfig = ({
    segmentationConfig,
    setFillAlpha,
    setFillAlphaInactive,
    setOutlineWidthActive,
    setOutlineOpacityActive,
    setRenderFill,
    setRenderInactiveSegmentations,
    setRenderOutline
}: TSegmentationConfig) => {
    const { initialConfig } = segmentationConfig;
    const [isMinimized, setIsMinimized] = useState(true);
    return (
        <div className="bg-primary-dark select-none">
            <div>
                <ActiveSegmentationConfig
                    config={initialConfig}
                    setFillAlpha={setFillAlpha}
                    setOutlineWidthActive={setOutlineWidthActive}
                    setOutlineOpacityActive={setOutlineOpacityActive}
                    setRenderFill={setRenderFill}
                    setRenderOutline={setRenderOutline}
                />
                <div className="mx-1 mb-[8px] h-[1px] bg-[#212456]"></div>
                <div
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="flex cursor-pointer items-center pl-2 pb-[9px]"
                >
                    <FontAwesomeIcon
                        icon={faAdd}
                        name="panel-group-open-close"
                        className={classNames('h-5 w-5 cursor-pointer text-white transition duration-300', {
                            'rotate-90 transform': !isMinimized
                        })}
                    />

                    <span className="text-[12px] font-[300] text-[#d8d8d8]">{'Inactive segmentations'}</span>
                </div>
                {!isMinimized && (
                    <InactiveSegmentationConfig
                        config={initialConfig}
                        setRenderInactiveSegmentations={setRenderInactiveSegmentations}
                        setFillAlphaInactive={setFillAlphaInactive}
                    />
                )}
            </div>
            <div className="h-[6px] bg-black "></div>
        </div>
    );
};

export default SegmentationConfig;
