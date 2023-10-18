// MUI imports
import {
    InputAdornment,
    OutlinedInput,
    SvgIcon,
    Button,
    useTheme
} from "@mui/material";

// theme colors
import {tokens} from "../../assets/theme/theme";

// icons
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

import Logo from "../../components/Logo/Logo";

const Login = () => {

    // theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <div className="flex h-screen justify-center items-center">

            <div className="w-96 text-white p-7 text-center">

                {/* Logo */}
                <div className={"w-50 mx-auto"}>
                    <Logo mode={theme.palette.mode} />
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
                                        <PersonIcon />
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
                            onChange={(e)=> console.log(e.target.value)}
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
                                        <LockIcon />
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
                            onChange={(e)=> console.log(e.target.value)}
                        />

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
        </div>
    );
};

export default Login;
