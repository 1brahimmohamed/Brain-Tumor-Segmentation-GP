import {ColorModeContext, useMode} from "../assets/theme/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";

const ColorModeProvider = ({ children }) => {

    const [theme, colorMode] = useMode();

    return(
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
};

export default ColorModeProvider;
