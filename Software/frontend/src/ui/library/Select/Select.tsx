import classnames from 'classnames';
import ReactSelect, { components, OptionProps } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import './Select.scss';

type TOptionType = {
    value: string;
    label: string;
};

type TSelectProps = {
    id: string;
    className?: string;
    closeMenuOnSelect?: boolean;
    hideSelectedOptions?: boolean;
    isClearable?: boolean;
    isDisabled?: boolean;
    isMulti?: false | undefined;
    isSearchable?: boolean;
    onChange: (value: string | string[], action: any) => void;
    options: TOptionType[];
    placeholder?: string;
    noIcons?: boolean;
    menuPlacement?: 'auto' | 'bottom' | 'top';
    components?: any;
    value: any;
};

const MultiValue = ({ selectProps, data }: any) => {
    const values = selectProps.value;
    const lastValue = values[values.length - 1];
    let label = data.label;
    if (lastValue.label !== label) {
        label += ', ';
    }

    return <span>{label}</span>;
};

const Option = (props: OptionProps<TOptionType, false>) => {
    return (
        <components.Option {...props}>
            <div className="flex items-center">
                <div className="h-2 w-2">
                    {props.isSelected ? (
                        <FontAwesomeIcon icon={faSquareCheck} />
                    ) : (
                        <FontAwesomeIcon icon={faSquare} />
                    )}
                </div>
                <label id={props.data.value} className="ml-3 mt-1">
                    <span>{props.data.value}</span>
                </label>
            </div>
        </components.Option>
    );
};

const Select = ({
    id,
    className,
    closeMenuOnSelect,
    hideSelectedOptions,
    isClearable,
    isDisabled,
    isMulti,
    isSearchable,
    onChange,
    options,
    placeholder,
    noIcons,
    menuPlacement,
    components,
    value
}: TSelectProps) => {
    const noIconComponents = {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
    };

    let _components = isMulti ? { Option, MultiValue } : {};
    _components = noIcons ? { ..._components, ...noIconComponents } : { ..._components, ...components };

    let selectedOptions: TOptionType[] = [];

    // Map array of values to an array of selected options
    if (value && Array.isArray(value)) {
        value.forEach((val) => {
            const found = options.find((opt) => opt.value === val);
            if (found) {
                selectedOptions.push({ ...found });
            }
        });
    }

    const handleChange = (selectedOptions: any, { action }: { action: any }) => {
        const newSelection = !selectedOptions?.length
            ? selectedOptions
            : selectedOptions.reduce((acc: any, curr: any) => acc.concat([curr.value]), []);
        onChange(newSelection, action);
    };

    return (
        <ReactSelect
            inputId={`input-${id}`}
            className={classnames(className, 'mmmai-select customSelect__wrapper flex flex-1 flex-col')}
            data-cy={`input-${id}`}
            classNamePrefix="customSelect"
            isDisabled={isDisabled}
            isClearable={isClearable}
            isMulti={isMulti}
            isSearchable={isSearchable}
            menuPlacement={menuPlacement}
            closeMenuOnSelect={closeMenuOnSelect}
            hideSelectedOptions={hideSelectedOptions}
            components={_components}
            placeholder={value ? value : placeholder}
            options={options}
            value={value && Array.isArray(value) ? selectedOptions : value}
            onChange={handleChange}
        />
    );
};

export default Select;
