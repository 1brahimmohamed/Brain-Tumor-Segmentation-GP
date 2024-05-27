import React, { ReactNode, useState } from 'react';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledIconButton, StyledMenu } from '@ui/library';
import { useTheme } from '@mui/material';

interface ICustomButtonProps {
    onClick: (item?: any) => void;
    menuItems?: string[];
    icon: ReactNode;
    sx?: any;
    menuComponent?: ReactNode;
}

const CustomButton = ({ onClick, menuItems, icon, sx, menuComponent }: ICustomButtonProps) => {
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (menuItems || menuComponent) {
            setAnchorElement(event.currentTarget);
            return;
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
            backgroundColor: theme.palette.secondary.main
        },
        marginTop: '0'
    };

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
                {(menuItems || menuComponent) && <ArrowDropDownIcon />}
            </StyledIconButton>

            {/*if menuItems or menuComponent is not null, then render the Menu component*/}
            {/*check which one is not null and render it*/}
            {(menuItems || menuComponent) && (
                <StyledMenu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleCloseMenu}>
                    {menuItems &&
                        menuItems.map((item: string, index: number) => (
                            <MenuItem sx={popDownStyle} key={index} onClick={() => handleMenuItemClick(item)}>
                                {item}
                            </MenuItem>
                        ))}
                    {menuComponent}
                </StyledMenu>
            )}
        </>
    );
};

export default CustomButton;
