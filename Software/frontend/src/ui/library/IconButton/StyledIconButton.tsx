import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '0.2rem',
    border: '1px solid' + `${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.lighter,
    padding: '0.5rem'
}));
