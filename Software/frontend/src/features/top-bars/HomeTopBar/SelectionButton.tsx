import { useTheme } from '@mui/material';
import { StyledButton } from '@features/top-bars/components/StyledButton.tsx';
interface IButtonProps {
    id: number;
    label: string;
    onClick: (id: number) => void;
    selected: boolean;
    lastBtnIndex: number;
}

const SelectionButton = ({ id, label, onClick, selected, lastBtnIndex }: IButtonProps) => {
    const handleClick = () => {
        onClick(id);
    };

    const theme = useTheme();

    return (
        <StyledButton
            theme={theme}
            selected={selected}
            onClick={handleClick}
            btnId={id}
            lastBtnIndex={lastBtnIndex}
        >
            {label}
        </StyledButton>
    );
};

export default SelectionButton;
