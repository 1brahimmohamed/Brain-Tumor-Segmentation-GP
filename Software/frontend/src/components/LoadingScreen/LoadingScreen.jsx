import {Box} from "@mui/material";
import Logo from "../Logo/Logo.jsx";
import LinearProgressBarIndeterminate from "../LoadingBars/LinearProgressBarIndeterminate.jsx";


const LoadingScreen = () => {
    return (
        <Box className="flex h-screen justify-center items-center">
            <Box className={"flex flex-col w-1/3 justify-center items-center p-2"}>
                <Box className={"w-5/12 mb-4"}>
                    <Logo />
                </Box>

                <Box className={"w-2/3"}>
                    <LinearProgressBarIndeterminate variant={"query"} />
                </Box>
            </Box>
        </Box>
    );
};

export default LoadingScreen;
