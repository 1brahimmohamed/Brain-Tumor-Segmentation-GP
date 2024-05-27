import { useState } from 'react';
import { InputRange, InputNumber, CheckBox } from '@ui/library';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
        <div className="flex justify-between px-3 pt-3 text-md">
            <div className="flex flex-col items-start">
                <div className="mb-2 text-white">{'Active'}</div>
                <CheckBox
                    label={'Outline'}
                    checked={config.renderOutline}
                    labelClassName="text-md pl-1 pt-1"
                    className="mb-2"
                    onChange={setRenderOutline}
                />
                <CheckBox
                    label={'Fill'}
                    checked={config.renderFill}
                    labelClassName="text-md pl-1 pt-1"
                    className="mb-2"
                    onChange={setRenderFill}
                />
            </div>

            <div className="col-span-2 flex flex-col items-center text-md">
                <div className="mb-2 text-white">{'Opacity'}</div>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={getRoundedValue(config.outlineOpacity * 100)}
                    onChange={setOutlineOpacityActive}
                    step={1}
                    containerClassName="mt-1 mb-3"
                    inputClassName="w-20"
                    labelClassName="text-white"
                    unit="%"
                />
                <InputRange
                    minValue={4}
                    maxValue={100}
                    value={getRoundedValue(config.fillAlpha * 100)}
                    onChange={setFillAlpha}
                    step={1}
                    containerClassName="mt-1 mb-3"
                    inputClassName="w-20"
                    labelClassName="text-white text-md"
                    unit="%"
                />
            </div>

            <div className="flex flex-col items-center">
                <div className="mb-1 text-md text-gray-400">{'Size'}</div>
                <InputNumber
                    value={config.outlineWidthActive}
                    onChange={setOutlineWidthActive}
                    minValue={0}
                    maxValue={10}
                    className="mt-1"
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
                labelClassName="text-md"
                className="mb-2"
                onChange={setRenderInactiveSegmentations}
            />

            <div className="flex items-center space-x-2 pl-4">
                <span className="text-md text-gray-400">{'Opacity'}</span>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={getRoundedValue(config.fillAlphaInactive * 100)}
                    onChange={setFillAlphaInactive}
                    step={1}
                    containerClassName="mt-1 mb-3"
                    inputClassName="w-20"
                    labelClassName="text-white"
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
    const [isMinimized, setIsMinimized] = useState(true);
    return (
        <div className="bg-primary-dark select-none">
            <div>
                <ActiveSegmentationConfig
                    config={segmentationConfig}
                    setFillAlpha={setFillAlpha}
                    setOutlineWidthActive={setOutlineWidthActive}
                    setOutlineOpacityActive={setOutlineOpacityActive}
                    setRenderFill={setRenderFill}
                    setRenderOutline={setRenderOutline}
                />
                <hr className={'border-AAPrimary m-2'} />
                <div
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="flex cursor-pointer items-center pl-2 pb-2 space-x-2"
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        name="panel-group-open-close"
                        className={classNames(
                            'h-3 w-3 cursor-pointer text-white transition duration-300 -rotate-90 transform',
                            {
                                'rotate-0 transform': !isMinimized
                            }
                        )}
                    />

                    <span className="text-md font-[300] text-gray-300">{'Inactive segmentations'}</span>
                </div>
                {!isMinimized && (
                    <InactiveSegmentationConfig
                        config={segmentationConfig}
                        setRenderInactiveSegmentations={setRenderInactiveSegmentations}
                        setFillAlphaInactive={setFillAlphaInactive}
                    />
                )}
            </div>

            <hr className={'border-AASecondShade border-2 my-2'} />
        </div>
    );
};

export default SegmentationConfig;
