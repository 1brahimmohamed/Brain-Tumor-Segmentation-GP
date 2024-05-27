import { styled } from '@mui/material/styles';
import { Button, Theme } from '@mui/material';

export const StyledButton = styled(Button)(
    ({
        theme,
        selected,
        btnId,
        lastBtnIndex
    }: {
        theme: Theme;
        selected: boolean;
        btnId: number;
        lastBtnIndex: number;
    }) => ({
        // general
        padding: 0,
        textTransform: 'none',
        border: '0.5px solid' + `${theme.palette.primary.dark}`,
        color: theme.palette.neutral.light,
        borderRight: btnId === lastBtnIndex ? '0.5px solid' + `${theme.palette.primary.dark}` : 'none',

        // corner styling
        borderBottomRightRadius: btnId === lastBtnIndex ? '5px' : '0',
        borderTopRightRadius: btnId === lastBtnIndex ? '5px' : '0',
        borderBottomLeftRadius: btnId === 0 ? '5px' : '0',
        borderTopLeftRadius: btnId === 0 ? '5px' : '0',

        // color and shadow
        backgroundColor: selected ? theme.palette.secondary.main : theme.palette.primary.lighter,
        boxShadow: 'none',

        // hover
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: 'none'
        }
    })
);
