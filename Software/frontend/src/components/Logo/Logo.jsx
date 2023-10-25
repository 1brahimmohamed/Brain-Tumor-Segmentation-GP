import {useTheme} from "@mui/material/styles";

const Logo = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <img
            alt={"logo"}
            src={`${mode === 'dark' ? "/logos/logo-white.png" : '/logos/logo-black.png'}`}
        />
    )
};

export default Logo;
