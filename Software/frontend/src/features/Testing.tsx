import { Label, InputNumber, InputRange, InputFilterText, Input, AdvancedToolBox, Select, SegmentationGroupTable } from '@ui/library';
import DicomTagsBrowser from '@features/viewer/DicomTagsBrowser/DicomTagsBrowser.tsx';
import { faPaintBrush, faEraser, faSliders } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const items = [
    {
        name: 'Brush',
        icon: faPaintBrush,
        active: false,
        options: [
            {
                id: 'radius',
                name: 'Radius (mm)',
                type: 'range',
                min: 1,
                max: 10,
                value: 5,
                step: 1
            },
            {
                id: 'mode',
                name: 'Mode',
                type: 'radio',
                value: 'Circle',
                values: [
                    {
                        value: 'Circle',
                        label: 'Circle'
                    },
                    {
                        value: 'Sphere',
                        label: 'Sphere'
                    },
                    {
                        value: 'Rectangle',
                        label: 'Rectangle'
                    }
                ]
            }
        ]
    },
    {
        name: 'Eraser',
        icon: faEraser,
        options: [
            {
                id: 'radius',
                name: 'Mode',
                type: 'radio',
                value: 'EraserSphere',
                values: [
                    {
                        value: 'EraserCircle',
                        label: 'Circle'
                    },
                    {
                        value: 'EraserSphere',
                        label: 'Sphere'
                    }
                ]
            }
        ]
    },
    {
        name: 'Threshold',
        icon: faSliders,
        active: true,
        options: [
            {
                id: 'threshold',
                name: 'Radius (mm)',
                type: 'range',
                min: 1,
                max: 10,
                value: 5,
                step: 1
            },
            {
                id: 'mode',
                name: 'Mode',
                type: 'radio',
                value: 'Circle',
                values: [
                    {
                        value: 'Circle',
                        label: 'Circle'
                    },
                    {
                        value: 'Sphere',
                        label: 'Sphere'
                    },
                    {
                        value: 'Rectangle',
                        label: 'Rectangle'
                    }
                ]
            },
            {
                name: 'custom',
                type: 'custom'
            }
        ]
    }
];

const Testing = () => {
    return (
        <div className={'p-20'}>
            {/*<InputRange*/}
            {/*    value={20}*/}
            {/*    onChange={(value: number) => console.log(value)}*/}
            {/*    minValue={0}*/}
            {/*    maxValue={100}*/}
            {/*    step={1}*/}
            {/*    unit={"%"}*/}
            {/*    inputClassName={"w-[300px]"}*/}
            {/*    showLabel={true}*/}
            {/*    labelPosition={"right"}*/}
            {/*    allowNumberEdit={false}*/}
            {/*    showAdjustmentArrows={true}*/}
            {/*/>*/}

            <AdvancedToolBox title={'Segmentation'} items={items}/>

            {/*<Input*/}
            {/*    id={'test'}*/}
            {/*    label={'Hima'}*/}
            {/*    labelClassName={'text-lg'}*/}
            {/*    transparent={false}*/}
            {/*    smallInput={false}*/}
            {/*/>*/}

            <SegmentationGroupTable
                segmentations={[]}
                onSegmentationDelete={() => console.log("test")}
                onSegmentationEdit={() => console.log("test")}
                onSegmentationDownload={() => console.log("test")}
                onSegmentationDownloadRTSS={() => console.log("test")}
                storeSegmentation={() => console.log("test")}
                onSegmentationAdd={() => console.log("test")}
                onToggleSegmentationVisibility={() => console.log("test")}
                onSegmentAdd={() => console.log("test")}
                disableEditing={false}
                showAddSegmentation={false}
                showAddSegment={false}
            />

            <Input
                id={'test'}
                label={'Hima'}
                labelClassName={'text-lg'}
                transparent={false}
                smallInput={false}
                placeholder={"Enter your name"}
            />
            <br />


            <Select
                id={'test'}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                isClearable={false}
                isDisabled={false}
                isMulti={false}
                isSearchable={true}
                onChange={(value: string | string[], action: any) => console.log(value)}
                options={[
                    {
                        value: '1',
                        label: '1'
                    },
                    {
                        value: '2',
                        label: '2'
                    },
                    {
                        value: '3',
                        label: '3'
                    },
                ]}
                placeholder={'Select'}
                noIcons={false}
                menuPlacement={'auto'}
                components={null}
                value={'1'}
            />

            <br />

            <InputFilterText
                value={'test'}
                placeholder={'Search...'}
                onDebounceChange={(value: string) => console.log(value)}
                onChange={(value: string) => console.log(value)}
                debounceTime={300}
                disabled={false}
            />

        </div>
    );
};

export default Testing;
