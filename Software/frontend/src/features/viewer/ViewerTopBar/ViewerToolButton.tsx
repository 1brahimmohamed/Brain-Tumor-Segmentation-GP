import { ReactNode, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledDiv } from '@features/top-bars/components/StyledDiv.tsx';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material';
import { StyledMenu } from '@ui/library';
import { Box } from '@mui/material';

interface ICustomButtonProps {
    title: string;
    onClick?: (title: string, e: any) => void;
    menuComponent?: ReactNode;
    icon: ReactNode;
    sx?: any;
}

const ViewerToolButton = ({ title, onClick, menuComponent, icon, sx }: ICustomButtonProps) => {
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    const handleDropdownClick = (event: any) => {
        if (menuComponent) {
            setAnchorElement(event.target?.parentElement.parentElement);
            return;
        }
        return;
    };

    const handleClick = (e: any) => {
        if (onClick) {
            onClick(title, e);
        }
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
                    onMouseUp={handleClick}
                    title={title}
                >
                    <div className={'text-2xl'}>
                        <SvgIcon fontSize={'inherit'}>{icon}</SvgIcon>
                    </div>
                    <div className={'truncate text-xs'}>{title}</div>
                </div>

                <Box
                    onClick={handleDropdownClick}
                    className={'cursor-pointer'}
                    sx={{ color: theme.palette.secondary.main }}
                >
                    {menuComponent && <ArrowDropDownIcon />}
                </Box>
            </StyledDiv>

            {menuComponent && (
                <StyledMenu
                    anchorEl={anchorElement}
                    open={Boolean(anchorElement)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                >
                    {menuComponent}
                </StyledMenu>
            )}
        </>
    );
};

export default ViewerToolButton;
