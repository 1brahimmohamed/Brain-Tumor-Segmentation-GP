import {useState} from "react";
import {Button, useTheme} from "@mui/material";

import {tokens} from "../../../../assets/theme/theme.js";
import DateRangesButtonStyles from "../ButtonGroupStyles.js";


const modalities = [
    "CT",
    "MR",
    "US",
    "PET",
    "XA",
];

const ModalityButtonsGroup = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedButtonsIndices, setSelectedButtonsIndices] = useState([]);

    const {
        buttonStyle,
        leftSideButtonStyle,
        rightSideButtonStyle,
        selectedButton,
        selectedLeftSideButton,
        selectedRightSideButton
    } = DateRangesButtonStyles(theme.palette.mode, colors);


    const handleButtonClick = (index) => {
        if (selectedButtonsIndices.includes(index)) {
            // If the button is already selected, remove it from the selection
            setSelectedButtonsIndices((prevSelectedIndices) =>
                prevSelectedIndices.filter((selectedIndex) => selectedIndex !== index)
            );
        } else {
            // If the button is not selected, add it to the selection
            setSelectedButtonsIndices((prevSelectedIndices) => [...prevSelectedIndices, index]);
        }
    };

    return (
        <div
            className={"flex"}
            style={{
                borderRadius: "0.3rem",
            }}
        >
            {
                modalities.map((interval, index) => {
                    return (
                        <Button
                            variant="contained"
                            sx={
                                index === 0
                                    ? selectedButtonsIndices.includes(index)
                                        ? selectedLeftSideButton
                                        : leftSideButtonStyle
                                    : index === modalities.length - 1
                                        ? selectedButtonsIndices.includes(index)
                                            ? selectedRightSideButton
                                            : rightSideButtonStyle
                                        : selectedButtonsIndices.includes(index)
                                            ? selectedButton
                                            : buttonStyle
                            }
                            key={index}
                            onClick={() => handleButtonClick(index)}
                        >
                            {interval}
                        </Button>
                    )
                })
            }


        </div>
    )
};

export default ModalityButtonsGroup;
