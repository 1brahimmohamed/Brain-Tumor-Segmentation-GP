import {useTheme} from "@mui/material";
import {tokens} from "../../../assets/theme/theme.js";




const DataRangesButtonStyles = (colorMode, colors) => {

    const buttonStyle = {
        textTransform: "none",
        border: "1px solid" + `${colorMode === 'dark' ? colors.primary[600] : colors.primary[800]}`,
        borderRadius: "0",
        backgroundColor: colorMode === 'dark' ? colors.primary[400] : colors.primary[900],
        boxShadow: "none",
        '&:hover': {
            backgroundColor: colorMode === 'dark' ? colors.primary[300] : colors.primary[800],
            boxShadow: "none",
        },
        padding: 0
    };

    const leftSideButtonStyle = {
        ...buttonStyle,
        borderRadius: "0.3rem 0 0 0.3rem",
    };

    const rightSideButtonStyle = {
        ...buttonStyle,
        borderRadius: "0 0.3rem 0.3rem 0",
    };

    const selectedButton ={
        ...buttonStyle,
        backgroundColor: colors.blue[500],
        "&:hover": {
            backgroundColor: colors.blue[700],
            boxShadow: "none",
        },
    }

    const selectedLeftSideButton = {
        ...leftSideButtonStyle,
        backgroundColor: colors.blue[500],
        "&:hover": {
            backgroundColor: colors.blue[700],
            boxShadow: "none",
        },
    }

    const selectedRightSideButton = {
        ...rightSideButtonStyle,
        backgroundColor: colors.blue[500],
        "&:hover": {
            backgroundColor: colors.blue[700],
            boxShadow: "none",
        },
    }

    return (
        {
            buttonStyle,
            leftSideButtonStyle,
            rightSideButtonStyle,
            selectedButton,
            selectedLeftSideButton,
            selectedRightSideButton
        }
    )
};

export default DataRangesButtonStyles;
