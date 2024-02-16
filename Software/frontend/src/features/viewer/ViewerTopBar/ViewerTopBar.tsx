import { useContext } from 'react';

// MUI
import { Box, IconButton, useTheme } from '@mui/material';

// Icons
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationImportantOutlined from '@mui/icons-material/NotificationImportantOutlined';

import { ColorModeContext } from '../../../assets/theme/theme.js';

const ViewerTopBar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            className={'flex justify-between w-full'}
            sx={{
                backgroundColor: theme.palette.primary.dark,
                height: '4.1rem',
            }}
        >
            <Box className={'ml-9 flex'}>
                {/*/!* Logo *!/*/}
                {/*<Box className={"w-44 bg-transparent p-2"}>*/}
                {/*    <Link to={"/"}>*/}
                {/*        <NavLogo  />*/}
                {/*    </Link>*/}
                {/*</Box>*/}

                {/* Options Div */}
                <Box className={'ml-6 flex '}>
                    {/* {annotationToolsNames.map(tool => (
                        <button className ={"m-3"} key={tool.key} value={tool.value}>
                            {tool.value}
                        </button>
                    ))} */}
                </Box>
            </Box>

            {/* Icons */}

            <Box className={'flex items-center mr-4'}>
                <Box>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </IconButton>
                    <IconButton>
                        <NotificationImportantOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ViewerTopBar;
