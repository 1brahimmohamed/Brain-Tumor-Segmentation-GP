import { InputAdornment, OutlinedInput, SvgIcon, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface LoginInputFieldProps {
    name: string;
    autoComplete: string;
    placeholder: string;
    Icon: (props: any) => ReactNode;
    theme: Theme;
}

const LoginInputField = ({ name, autoComplete, placeholder, Icon, theme }: LoginInputFieldProps) => {
    return (
        <OutlinedInput
            defaultValue=""
            name={name}
            fullWidth
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={'my-2'}
            startAdornment={
                <InputAdornment position="start">
                    <SvgIcon color="inherit" fontSize="large">
                        <Icon />
                    </SvgIcon>
                </InputAdornment>
            }
            sx={{
                backgroundColor: theme.palette.primary.dark,
                fontSize: 'medium',
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none' // Remove the outline
                }
            }}
        />
    );
};

export default LoginInputField;
