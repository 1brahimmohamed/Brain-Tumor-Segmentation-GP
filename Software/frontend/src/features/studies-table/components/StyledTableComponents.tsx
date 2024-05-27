import { styled } from '@mui/material/styles';
import { TableCell, TableRow, tableCellClasses } from '@mui/material';

// Custom Styled Components
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.lighter,
        border: '1px solid' + theme.palette.primary.dark,
        fontWeight: 'bold'
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid ' + theme.palette.primary.dark
    }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.primary.lighter,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
