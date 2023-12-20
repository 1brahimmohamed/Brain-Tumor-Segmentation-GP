const DataRangesButtonStyles = (theme) => {

    const buttonStyle = {
        textTransform: "none",
        border: "0.5px solid" + `${theme.palette.primary.dark}`,
        borderRight: 0,
        borderRadius: 0,
        backgroundColor: theme.palette.primary.lighter,
        boxShadow: "none",
        '&:hover': {
            backgroundColor: theme.palette.primary.lighter,
            boxShadow: "none",
        },
        padding: 0
    };

    const leftSideButtonStyle = {
        ...buttonStyle,
        borderRight: 0,
        borderRadius: "0.3rem 0 0 0.3rem",
    };

    const rightSideButtonStyle = {
        ...buttonStyle,
        borderRadius: "0 0.3rem 0.3rem 0",
        borderRight: "1px solid" + `${theme.palette.primary.dark}`,
    };

    const selectedButton ={
        ...buttonStyle,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: "none",
        },
    }

    const selectedLeftSideButton = {
        ...leftSideButtonStyle,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            boxShadow: "none",
        },
    }

    const selectedRightSideButton = {
        ...rightSideButtonStyle,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
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
