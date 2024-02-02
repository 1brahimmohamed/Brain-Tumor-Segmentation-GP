import Box from '@mui/material/Box';
import CustomLinearProgress from "./styles.js";
import { useLoading } from "../../hooks/LoadingProvider.jsx";
import {useSelector} from "react-redux";

const LinearProgressBarIndeterminate = ({variant}) => {

    const { isDataLoading } = useSelector((store)=> store.homepage)

    return (
        <Box className={"w-full"}>
            { isDataLoading && <CustomLinearProgress variant={variant} /> }
        </Box>
    );
}

export default LinearProgressBarIndeterminate;
