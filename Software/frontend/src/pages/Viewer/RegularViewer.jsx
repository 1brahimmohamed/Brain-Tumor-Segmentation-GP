import {Box, useTheme} from '@mui/material';
import {tokens} from "../../assets/theme/theme.js";

const RegularViewer= () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        // left Sidebar Layout
        <Box className={"flex w-full"}>
            {/* Sidebar*/}
            <Box className={"w-60 h-[94vh]"}
                 sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
                 }}
            >
                SIDEBAR
            </Box>

            {/* Body*/}
            <Box className={"flex-1 bg-black h-[94vh]"}>
                BODY
            </Box>
        </Box>

        // right Sidebar Layout
        // <Box className={"flex w-full"}>
        //     {/* Body*/}
        //     <Box className={"flex-1 bg-black h-[94vh]"}>
        //         BODY
        //     </Box>
        //
        //     {/* Sidebar*/}
        //     <Box className={"w-60 h-[94vh]"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         SIDEBAR
        //     </Box>
        // </Box>

        // top Sidebar Layout
        // <Box className={"flex flex-col w-full"}>
        //
        //     {/* Sidebar*/}
        //     <Box className={"h-64"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         TOP BAR
        //     </Box>
        //
        //     {/* Body*/}
        //     <Box className={"flex-2 bg-black h-[94vh]"}>
        //         BODY
        //     </Box>
        // </Box>

        // Bottom Sidebar Layout
        // <Box className={"flex flex-col w-full h-screen"}>
        //
        //     {/* Body*/}
        //     <Box className={"flex-1 bg-black"}>
        //         BODY
        //     </Box>
        //
        //     {/* Sidebar*/}
        //     <Box className={"h-64"}
        //          sx={{
        //              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : colors.primary[900],
        //          }}
        //     >
        //         BOTTOM BAR
        //     </Box>
        // </Box>

    );
};

export default RegularViewer;
