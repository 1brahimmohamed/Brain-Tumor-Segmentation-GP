import { useEffect, useCallback, useState, useRef } from 'react';
import classnames from 'classnames';
import Typography from '@mui/material/Typography';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const borderStyle = 'border-b last:border-b-0 border-secondary-main';

type TDropdown = {
    id?: string;
    children: any;
    showDropdownIcon?: boolean;
    list?: {
        id?: string;
        title: string;
        icon?: IconProp;
        onClick: () => void;
    }[];
    itemsClassName?: string;
    titleClassName?: string;
    showBorders?: boolean;
    alignment?: 'left' | 'right';
    maxCharactersPerLine: number;
};

const Dropdown = ({
    id,
    children,
    showDropdownIcon,
    list,
    itemsClassName,
    titleClassName,
    showBorders,
    alignment,
    // By default, the max characters per line is the longest title
    // if you wish to override this, you can pass in a number
    maxCharactersPerLine
}: TDropdown) => {
    const [open, setOpen] = useState(false);
    const element = useRef<HTMLDivElement>(null);

    // choose the max characters per line based on the longest title
    const longestTitle = list?.reduce((acc, item) => {
        if (item.title.length > acc) {
            return item.title.length;
        }
        return acc;
    }, 0);

    maxCharactersPerLine = maxCharactersPerLine ?? longestTitle;

    const DropdownItem = useCallback(
        ({
            id,
            title,
            icon,
            onClick
        }: {
            id: string;
            title: string;
            icon: IconProp | null;
            onClick: () => void;
        }) => {
            // Split the title into lines of length maxCharactersPerLine
            const lines: string[] = [];
            for (let i = 0; i < title.length; i += maxCharactersPerLine) {
                lines.push(title.substring(i, i + maxCharactersPerLine));
            }

            return (
                <div
                    key={title}
                    className={classnames(
                        'hover:bg-AAPrimary flex cursor-pointer items-center px-4 py-2 transition duration-300 ',
                        titleClassName,
                        showBorders && borderStyle
                    )}
                    onClick={() => {
                        setOpen(false);
                        onClick();
                    }}
                    data-cy={id}
                >
                    {!!icon && <FontAwesomeIcon icon={icon} className="mr-2 w-4 text-white" />}
                    <div
                        style={{
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {title.length > maxCharactersPerLine && (
                            <div>
                                {lines.map((line, index) => (
                                    <Typography key={index} className={itemsClassName}>
                                        {line}
                                    </Typography>
                                ))}
                            </div>
                        )}
                        {title.length <= maxCharactersPerLine && (
                            <Typography className={itemsClassName}>{title}</Typography>
                        )}
                    </div>
                </div>
            );
        },
        [maxCharactersPerLine, itemsClassName, titleClassName, showBorders]
    );

    const renderTitleElement = () => {
        return (
            <div className="flex items-center">
                {children}
                {showDropdownIcon && <FontAwesomeIcon icon={faChevronDown} className="ml-1" />}
            </div>
        );
    };

    const toggleList = () => {
        setOpen((s) => !s);
    };

    const handleClick = (e: MouseEvent) => {
        if (element.current && !element.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    const renderList = () => {
        return (
            <div
                className={classnames(
                    'top-100 border-AAPrimary border-opacity-50 absolute z-10 mt-2 transform rounded border-2 bg-AAFirstShade shadow transition duration-300',
                    {
                        'right-0 origin-top-right': alignment === 'right',
                        'left-0 origin-top-left': alignment === 'left',
                        'scale-0': !open,
                        'scale-100': open
                    }
                )}
                data-cy={`${id}-dropdown`}
            >
                {list?.map((item, idx) => (
                    <DropdownItem
                        id={item.id ? item.id : ''}
                        title={item.title}
                        icon={item.icon ? item.icon : null}
                        onClick={item.onClick}
                        key={idx}
                    />
                ))}
            </div>
        );
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        if (!open) {
            document.removeEventListener('click', handleClick);
        }
    }, [open]);

    return (
        <div data-cy="dropdown" ref={element} className="relative">
            <div className="flex cursor-pointer items-center" onClick={toggleList}>
                {renderTitleElement()}
            </div>

            {renderList()}
        </div>
    );
};

export default Dropdown;
