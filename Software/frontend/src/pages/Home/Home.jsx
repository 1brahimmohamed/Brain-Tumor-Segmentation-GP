
// MUI
import {Box, useTheme} from "@mui/material";

// Components
import CustomDataTable from "../../components/CustomNativeComponents/CustomDataTable/CustomDataTable";

// Theme
import {tokens} from "../../assets/theme/theme";

import Logo from "../../components/Logo/Logo";
import LoadingBar from "../../components/LoadingBars/LinearProgressBarIndeterminate.jsx";

const Home = () => {

    const theme = useTheme();

    return (
        <div className={"mt-4"}>

            <Box>
                <CustomDataTable />
            </Box>

            <Box className={"flex mt-5 h-14 justify-center"}>
                <Logo/>
            </Box>
        </div>
    );
};

export default Home;
