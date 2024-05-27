import { ButtonGroup, InputRange } from '@ui/library';
import { TOption } from '@ui/library/AdvancedToolBox/AdvancedToolBox.tsx';

const SETTING_TYPES = {
    RANGE: 'range',
    RADIO: 'radio',
    CUSTOM: 'custom'
};

type TToolSettingsProps = {
    options: TOption[];
};

type TButton = {
    children: string;
    onClick: () => void;
    key: string;
};

function ToolSettings({ options }: TToolSettingsProps) {
    if (!options) {
        return null;
    }

    const getButtons = (option: TOption) => {
        const buttons: TButton[] = [];

        option.values?.map(({ label, value: optionValue }, index) => {
            buttons.push({
                children: label,
                onClick: () => option.onChange?.(optionValue),
                key: `button-${option.id}-${index}` // A unique key
            });
        });

        return buttons;
    };

    return (
        <div className="space-y-2 py-2 text-white">
            {options?.map((option) => {
                if (option.type === SETTING_TYPES.RANGE) {
                    return (
                        <div className="flex items-center" key={option.id}>
                            <div className="w-1/3 text-md">{option.name}</div>
                            <div className="mr-2 w-2/3">
                                <InputRange
                                    minValue={option.min!}
                                    maxValue={option.max!}
                                    step={option.step!}
                                    value={parseFloat(option.value as string)}
                                    onChange={(e) => option.onChange!(e)}
                                    allowNumberEdit={true}
                                    showAdjustmentArrows={false}
                                    inputClassName="w-full cursor-pointer"
                                />
                            </div>
                        </div>
                    );
                }

                if (option.type === SETTING_TYPES.RADIO) {
                    return (
                        <div className="flex items-center justify-between text-[13px]" key={option.id}>
                            <span>{option.name}</span>
                            <div className="max-w-1/2">
                                <ButtonGroup
                                    buttons={getButtons(option)}
                                    defaultActiveIndex={option.defaultActiveIndex}
                                />
                            </div>
                        </div>
                    );
                }
                if (option.type === SETTING_TYPES.CUSTOM) {
                    return (
                        <div key={option.id}>
                            {typeof option.children === 'function' ? option.children() : option.children}
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default ToolSettings;
