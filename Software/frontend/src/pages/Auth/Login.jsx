import {useContext, useState} from 'react';

// MUI imports
import {
    InputAdornment,
    OutlinedInput,
    SvgIcon,
    Button,
    useTheme,
} from "@mui/material";

// icons
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

// theme colors
import {ColorModeContext, tokens} from "../../assets/theme/theme";
import Logo from "../../components/Logo/Logo";
import LoginFooter from "../../components/Footers/LoginFooter.jsx";


const Login = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [signInError, setSignInError] = useState(false);

    return (

        <div className="flex flex-col h-screen justify-center items-center">

            {/* Body */}
            <div className="w-96 text-white p-7 text-center">

                {/* Logo */}
                <div className={"w-50 mx-auto"}>
                    <Logo mode={theme.palette.mode}/>
                </div>

                {/* Form */}
                <div className={"w-full mt-8"}>
                    <form>
                        <OutlinedInput
                            defaultValue=""
                            fullWidth
                            placeholder="Username"
                            className={"my-2"}
                            startAdornment={(
                                <InputAdornment position="start">
                                    <SvgIcon
                                        color="inherit"
                                        fontSize="large"
                                    >
                                        <PersonIcon/>
                                    </SvgIcon>
                                </InputAdornment>
                            )}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : colors.primary[900],
                                fontSize: "medium",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none', // Remove the outline
                                },
                            }}
                            onChange={(e) => console.log(e.target.value)}
                        />

                        <OutlinedInput
                            defaultValue=""
                            fullWidth
                            placeholder="Password"
                            className={"mt-2 mb-4 max-w-full"}
                            type={"password"}
                            startAdornment={(
                                <InputAdornment position="start">
                                    <SvgIcon
                                        color="inherit"
                                        fontSize="large"
                                    >
                                        <LockIcon/>
                                    </SvgIcon>
                                </InputAdornment>
                            )}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : colors.primary[900],
                                fontSize: "medium",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none', // Remove the outline
                                },
                            }}
                            onChange={(e) => console.log(e.target.value)}
                        />

                        <div className={""}>
                            {
                                signInError &&
                                <h6
                                    className={"mb-2 text-red-600"}>
                                    The username or password is incorrect.
                                </h6>
                            }
                        </div>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            className={"h-12 text-2"}
                            style={{backgroundColor: colors.blue[500]}}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>

            <div>
                <LoginFooter />
            </div>

        </div>
    );
};

export default Login;
