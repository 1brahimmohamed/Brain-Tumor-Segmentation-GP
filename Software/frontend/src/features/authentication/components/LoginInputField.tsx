import { InputAdornment, OutlinedInput, SvgIcon, Theme } from '@mui/material';

interface ILoginInputFieldProps {
    name: string;
    autoComplete: string;
    placeholder: string;
    Icon: typeof SvgIcon;
    theme: Theme;
}

const LoginInputField = ({ name, autoComplete, placeholder, Icon, theme }: ILoginInputFieldProps) => {
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
