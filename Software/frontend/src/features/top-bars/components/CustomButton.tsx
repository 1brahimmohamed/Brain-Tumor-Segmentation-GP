import React, { ReactNode, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledIconButton } from '@ui/library';
import { useTheme } from '@mui/material';

interface ICustomButtonProps {
    onClick: (item?: any) => void;
    menuItems?: string[];
    icon: ReactNode;
    sx?: any;
}

const CustomButton = ({ onClick, menuItems, icon, sx }: ICustomButtonProps) => {

    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menuItems) {
            setAnchorElement(event.currentTarget);
            return
        }

        onClick();
    };

    const handleCloseMenu = () => {
        setAnchorElement(null);
    };

    const handleMenuItemClick = (item: string) => {
        handleCloseMenu();
        onClick(item);
    };


    const popDownStyle = {
        backgroundColor: theme.palette.primary.lighter,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    }

    return (
        <>
            <StyledIconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                sx={sx}
            >
                {icon}
                {menuItems && <ArrowDropDownIcon />}

            </StyledIconButton>

            {
                menuItems && (
                    <Menu
                        anchorEl={anchorElement}
                        open={Boolean(anchorElement)}
                        onClose={handleCloseMenu}
                    >
                        {menuItems.map((item: string, index: number) => (
                            <MenuItem sx={popDownStyle} key={index} onClick={() => handleMenuItemClick(item)}>
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>)
            }
        </>
    );
};

export default CustomButton;
