import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledDiv = styled(Box)(({ theme }) => ({
    borderRadius: '0',
    height: '4.1rem',
    width: '4rem',
    display: 'flex',
    marginLeft: '0.2rem',
    // overflow: 'hidden',

    '&:hover': {
        backgroundColor: theme.palette.primary.light
    }
}));
