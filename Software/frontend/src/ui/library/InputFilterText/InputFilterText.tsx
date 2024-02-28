import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

type InputFilterTextProps = {
    className?: string;
    value?: string;
    placeholder?: string;
    onDebounceChange?: (value: string) => void;
    onChange?: (value: string) => void;
    debounceTime?: number;

}

const InputFilterText = (props: InputFilterTextProps): ReactElement => {

    const {
        className,
        value = '',
        placeholder = 'Search...',
        onDebounceChange,
        onChange,
        debounceTime = 300,
    } = props;

    const [filterValue, setFilterValue] = useState<string>(value);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const debouncedOnChange = useMemo(() => {
        return debounce(onDebounceChange || (() => {
        }), debounceTime);
    }, []);

    // This allows for the filter value to be updated via the props.
    useEffect(() => setFilterValue(value), [value]);

    useEffect(() => {
        return debouncedOnChange?.cancel();
    });

    const handleFilterTextChanged = useCallback((value: string) => {
        setFilterValue(value);

        if (onChange) {
            onChange(value);
        }

        if (onDebounceChange) {
            debouncedOnChange(value);
        }
    }, []);

    return (
        <label className={classNames('relative', className)}>

            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon name="icon-search" />
            </span>

            <input
                ref={searchInputRef}
                type="text"
                className="disabled: placeholder:text-inputfield-placeholder block w-full appearance-none rounded-md  bg-AAFirstShade py-2 px-9 text-base leading-tight shadow transition duration-300 focus:outline-none"
                placeholder={placeholder}
                onChange={event => handleFilterTextChanged(event.target.value)}
                autoComplete="off"
                value={filterValue}
            />

            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <IconButton
                    className={classNames('cursor-pointer', filterValue ? '' : 'hidden')}
                    onClick={() => {
                        if (searchInputRef.current) {
                            searchInputRef.current.value = '';
                        }
                        handleFilterTextChanged('');
                    }}>
                    <CancelIcon />
                </IconButton>
          </span>
        </label>
    );
};

export default InputFilterText;
