import { ReactElement, ReactNode, useState } from 'react';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TSidePanelProps = {
    children: ReactNode;
    title: string;
    side?: 'left' | 'right';
    tabs?: any[];
    headerComponent?: ReactElement;
};

const SidePanel = ({ children, title, headerComponent }: TSidePanelProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`h-full bg-AAFirstShade transition-all duration-300  ${isOpen ? 'w-72' : 'w-8'}`}>
            <div className={'bg-AAPrimary flex text-center justify-between'}>
                <div>
                    {/*Open & Close Button*/}
                    <button className="px-2 py-1 text-white" onClick={togglePanel}>
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className={`${isOpen ? '' : 'rotate-180'}`}
                        />
                    </button>
                </div>
                {/* Conditional Rendering: if the header is text or component*/}
                {headerComponent ? (
                    <div className={'p-2'}>{headerComponent}</div>
                ) : (
                    <div className={'text-base'}>{title}</div>
                )}
                <div className={'opacity-0'}>hidd</div>
            </div>
            <div>{isOpen && children}</div>
        </div>
    );
};

export default SidePanel;
