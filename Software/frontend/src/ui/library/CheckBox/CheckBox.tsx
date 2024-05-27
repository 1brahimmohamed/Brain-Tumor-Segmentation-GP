import { useState, useCallback } from 'react';
import { Typography, TypographyTypeMap } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

type ICheckBoxProps = {
    checked: boolean;
    onChange: (state: boolean) => void;
    className?: string;
    label: string;
    labelClassName?: string;
    labelVariant?: TypographyTypeMap['props']['variant'];
};

const CheckBox = ({
    checked,
    onChange,
    label,
    labelClassName,
    labelVariant = 'body1',
    className
}: ICheckBoxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = useCallback(() => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    }, [isChecked, onChange]);

    return (
        <div
            className={`flex cursor-pointer items-center space-x-1 ${className ? className : ''}`}
            onClick={handleClick}
        >
            {isChecked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}

            <Typography variant={labelVariant} component="p" className={labelClassName ?? 'text-white '}>
                {label}
            </Typography>
        </div>
    );
};

export default CheckBox;
