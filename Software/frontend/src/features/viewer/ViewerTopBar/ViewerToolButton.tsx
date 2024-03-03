import { ReactNode, useState } from 'react';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledDiv } from '@features/top-bars/components/StyledDiv.tsx';
import SvgIcon from '@mui/material/SvgIcon';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

interface ICustomButtonProps {
    title: string;
    onClick?: () => void;
    menuComponent?: ReactNode;
    icon: ReactNode;
    sx?: any;
}

const ViewerToolButton = ({ title, onClick, menuComponent, icon, sx }: ICustomButtonProps) => {
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    const handleClick = (event: any) => {
        if (menuComponent) {
            setAnchorElement(event.target?.parentElement.parentElement);
            return;
        }
        return;
    };

    const handleCloseMenu = () => {
        setAnchorElement(null);
    };

    return (
        <>
            <StyledDiv aria-haspopup="true" className={'flex items-center justify-center p-1'} sx={sx}>
                <div
                    className={
                        'flex flex-col items-center justify-center cursor-pointer w-4/5 overflow-hidden'
                    }
                    onClick={onClick}
                    title={title}
                >
                    <div className={'text-2xl'}>
                        <SvgIcon fontSize={'inherit'}>{icon}</SvgIcon>
                    </div>
                    <div className={'truncate text-xs'}>{title}</div>
                </div>

                <Box
                    onClick={handleClick}
                    className={'cursor-pointer'}
                    sx={{ color: theme.palette.secondary.main }}
                >
                    {menuComponent && <ArrowDropDownIcon />}
                </Box>
            </StyledDiv>

            {menuComponent && (
                <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleCloseMenu}>
                    {menuComponent}
                </Menu>
            )}
        </>
    );
};

export default ViewerToolButton;
