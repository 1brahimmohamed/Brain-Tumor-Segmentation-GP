import {useState} from "react";
import {Button, useTheme} from "@mui/material";

import DateRangesButtonStyles from "../ButtonGroupStyles.js";
import {useDispatch, useSelector} from "react-redux";
import {addFilterModality, removeFilterModality} from "../../../../redux/reducers/homepageReducer.js"


const modalities = [
    "CT",
    "MR",
    "US",
    "PET",
    "XA",
];

const ModalityButtonsGroup = () => {

    const theme = useTheme();

    const [selectedButtonsIndices, setSelectedButtonsIndices] = useState([]);

    const {selectedModalities} = useSelector((store) => store.homepage)
    const dispatch = useDispatch();

    const {
        buttonStyle,
        leftSideButtonStyle,
        rightSideButtonStyle,
        selectedButton,
        selectedLeftSideButton,
        selectedRightSideButton
    } = DateRangesButtonStyles(theme);


    const handleButtonClick = (index) => {
        if (selectedButtonsIndices.includes(index)) {
            // If the button is already selected, remove it from the selection
            setSelectedButtonsIndices((prevSelectedIndices) =>
                prevSelectedIndices.filter((selectedIndex) => selectedIndex !== index)
            );
            dispatch(removeFilterModality(modalities[index]))
        } else {
            // If the button is not selected, add it to the selection
            dispatch(addFilterModality(modalities[index]))
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
