import { useState } from 'react';
import { Select } from '@ui/library';
import { Button } from '@mui/material';

type TServerSelectionProps = {
    defaultModel: string;
    onModelChange: (model: string) => void;
    options: { value: string; label: string }[];
    onButtonClick: () => void;
    label?: string;
    buttonText?: string;
    buttonIcon?: string;
    children?: any;
};
const ServerSelection = ({
    defaultModel,
    onModelChange,
    options = [],
    label = 'Servers',
    buttonText = 'Run',
    buttonIcon,
    onButtonClick,
    children
}: TServerSelectionProps) => {
    const [selectedModel, setSelectedModel] = useState(defaultModel);
    const handleModelChange = (newSelect: any, _action: any) => {
        setSelectedModel(newSelect);
        onModelChange(newSelect);
    };

    return (
        <div className="mx-4 gap-y-3 mt-3 flex flex-col">
            <div className="w-full text-md">{label}</div>

            <div className="w-full">
                <Select
                    id="demo-simple-select"
                    value={selectedModel}
                    placeholder={selectedModel}
                    onChange={handleModelChange}
                    options={options}
                />
            </div>

            <div>{children}</div>

            <div className="w-full mb-5">
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    style={{ color: 'white' }}
                    endIcon={buttonIcon}
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default ServerSelection;
