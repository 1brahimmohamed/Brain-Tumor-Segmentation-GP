import {useState} from "react";
import {Button, useTheme} from "@mui/material";

import DateRangesButtonStyles from "../ButtonGroupStyles.js";


const timeIntervals = [
    "1d",
    "3d",
    "1w",
    "1m",
    "1y",
    "Any",
];

const DateRangesButtonsGroup = () => {
    const theme = useTheme();

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(timeIntervals.length - 1);

    const {
        buttonStyle,
        leftSideButtonStyle,
        rightSideButtonStyle,
        selectedButton,
        selectedLeftSideButton,
        selectedRightSideButton
    } = DateRangesButtonStyles(theme);


    return (
        <div
            className={"flex"}
            style={{
                borderRadius: "0.3rem",
        }}
        >
            {
                timeIntervals.map((interval, index) => {
                    return (
                        <Button
                            variant="contained"
                            sx={
                            index === 0 ? (index === selectedButtonIndex ? selectedLeftSideButton : leftSideButtonStyle) :
                            index === timeIntervals.length - 1 ? (index === selectedButtonIndex ? selectedRightSideButton : rightSideButtonStyle) :
                            index === selectedButtonIndex? selectedButton : buttonStyle
                            }
                            key={index}
                            onClick={() => setSelectedButtonIndex(index)}
                        >
                            {interval}
                        </Button>
                    )
                })
            }


        </div>
    )
};

export default DateRangesButtonsGroup;
