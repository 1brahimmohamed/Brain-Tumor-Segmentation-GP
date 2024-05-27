import { useTheme } from '@mui/material';
import { Logo } from '@ui/library';
import LoginFooter from '@features/authentication/components/LoginFooter';
import LoginForm from '@features/authentication/components/LoginForm.tsx';

const Login = () => {
    const theme = useTheme();

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="w-96 text-white p-7 text-center">
                <div className={'w-4/5 mx-auto'}>
                    <Logo />
                </div>

                <div className={'w-full mt-8'}>
                    <LoginForm theme={theme} />
                </div>
            </div>

            <div>
                <LoginFooter />
            </div>
        </div>
    );
};

export default Login;
