import { Menu, styled, MenuProps } from '@mui/material';

const StyledBarMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 5,
        marginTop: theme.spacing(1),
        minWidth: 80,
        backgroundColor: theme.palette.primary.light
    }
}));

export default StyledBarMenu;
