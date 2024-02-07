import { useTheme } from "@mui/material/styles";

import whiteLogo from "@assets/images/logos/logo-white.png";
import blackLogo from "@assets/images/logos/logo-black.png";

const Logo = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <img
            alt={"logo"}
            title={"MMM.AI is a medical imaging platform"}
            src={`${ mode === 'dark' ? whiteLogo : blackLogo }`}
        />
    )
};

export default Logo;
