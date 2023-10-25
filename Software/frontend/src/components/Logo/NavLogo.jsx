import {useTheme} from "@mui/material/styles";

const NavLogo = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <img
            alt={"Nav logo"}
            src={`${mode === 'dark' ? "/logos/viewer-white-logo.png" : '/logos/viewer-black-logo.png'}`}
        />
    )
};

export default NavLogo;
