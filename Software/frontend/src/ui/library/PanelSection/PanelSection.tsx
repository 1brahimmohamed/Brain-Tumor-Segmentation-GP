import { ReactNode, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type TPanelSectionProps = {
    title: string;
    children: ReactNode;
    actionIcons?: {
        name: string;
        component: IconProp;
        onClick: () => void;
    }[];
};

const PanelSection = ({ title, children, actionIcons }: TPanelSectionProps) => {
    const [areChildrenVisible, setChildrenVisible] = useState(true);

    const handleHeaderClick = () => {
        setChildrenVisible(!areChildrenVisible);
    };

    return (
        <>
            <div
                className="bg-AAPrimaryLight flex h-7 cursor-pointer select-none items-center justify-between rounded-sm pl-2.5 text-md"
                onClick={handleHeaderClick}
            >
                <div className="text-base font-bold text-white">{title}</div>
                <div className="flex items-center space-x-1">
                    {actionIcons?.map((icon, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={icon.component}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!areChildrenVisible) {
                                    setChildrenVisible(true);
                                }
                                icon.onClick();
                            }}
                        />
                    ))}
                    <div className="grid h-7 w-7 place-items-center">
                        <FontAwesomeIcon icon={areChildrenVisible ? faChevronDown : faChevronLeft} />
                    </div>
                </div>
            </div>
            {areChildrenVisible && (
                <>
                    <div className="rounded-b-xl">{children}</div>
                </>
            )}
        </>
    );
};

export default PanelSection;
