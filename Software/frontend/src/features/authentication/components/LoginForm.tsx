import { FormEvent, useRef } from 'react';
import { Button, Theme } from '@mui/material';
import LoginInputField from '@features/authentication/components/LoginInputField.tsx';
import { Person as UsernameIcon, Lock as PasswordIcon } from '@mui/icons-material';

const LoginForm = ({ theme }: { theme: Theme }) => {
    // const navigate = useNavigate();
    const loginFormRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loginFormRef.current) {
            const formData = new FormData(loginFormRef.current);
            const username = formData.get('username');
            const password = formData.get('password');
            console.log('Username:', username, 'Password:', password);
        }
    };

    return (
        <form ref={loginFormRef} onSubmit={handleSubmit}>
            <LoginInputField
                theme={theme}
                name={'username'}
                autoComplete={'username'}
                placeholder={'Username'}
                Icon={UsernameIcon}
            />

            <LoginInputField
                theme={theme}
                name={'password'}
                autoComplete={'current-password'}
                placeholder={'Password'}
                Icon={PasswordIcon}
            />

            <Button
                type={'submit'}
                fullWidth
                size="large"
                color="primary"
                className={'h-12 text-2'}
                style={{ backgroundColor: theme.palette.secondary.main }}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
