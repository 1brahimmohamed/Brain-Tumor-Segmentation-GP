import Box from '@mui/material/Box';
import CustomLinearProgress from "./styles.js";

const LinearProgressBarIndeterminate = ({variant}) => {
    return (
        <Box className={"w-full"}>
            <CustomLinearProgress/>
        </Box>
    );
}

export default LinearProgressBarIndeterminate;
