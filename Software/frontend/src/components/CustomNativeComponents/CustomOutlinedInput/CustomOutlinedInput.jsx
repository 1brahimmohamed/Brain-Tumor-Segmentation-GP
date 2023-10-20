import React from 'react';

// MUI
import OutlinedInput from '@mui/material/OutlinedInput';
import { withStyles } from '@mui/styles';


// Custom Styled Component
const StyledOutlinedInput  = withStyles({
    root: {
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // Remove the outline
        },
    },
})(OutlinedInput);


const CustomOutlinedInput = (props) => {
    return (
        <StyledOutlinedInput
            label="Input"
            placeholder="Placeholder"
            {...props}
        />
    );
};

export default CustomOutlinedInput;
