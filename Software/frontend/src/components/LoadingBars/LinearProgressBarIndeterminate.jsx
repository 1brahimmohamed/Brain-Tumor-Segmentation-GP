import Box from '@mui/material/Box';
import CustomLinearProgress from "./styles.js";
import { useLoading } from "../../hooks/LoadingProvider.jsx";

const LinearProgressBarIndeterminate = ({variant}) => {

    const {isLoading, setIsLoading} = useLoading();

    return (
        <Box className={"w-full"}>
            { isLoading && <CustomLinearProgress variant={variant} /> }
        </Box>
    );
}

export default LinearProgressBarIndeterminate;
