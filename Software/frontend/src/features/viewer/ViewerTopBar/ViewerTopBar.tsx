import { useTheme, Box } from '@mui/material';
import { Logo } from '@ui/library';
import { Link } from 'react-router-dom';
import {
    VIEWER_TOOLS_BUTTONS,
    VIEWER_OPTION_BUTTONS
} from '@features/viewer/ViewerTopBar/viewer-buttons.tsx';
import ViewerToolButton from '@features/viewer/ViewerTopBar/ViewerToolButton.tsx';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
const ViewerTopBar = () => {
    const theme = useTheme();

    return (
        <Box
            className={'flex justify-between w-full'}
            sx={{
                backgroundColor: theme.palette.primary.dark,
                height: '4.1rem'
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Box className={'ml-9 flex'}>
                <Box className={'w-44 bg-transparent p-2'}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </Box>

                <Box className={'ml-6 flex'}>
                    {VIEWER_TOOLS_BUTTONS.map((button, index) => (
                        <ViewerToolButton
                            key={index}
                            title={button.title}
                            onClick={button.onClick}
                            icon={button.icon}
                            menuComponent={button.menuComponent}
                        />
                    ))}
                </Box>
            </Box>

            <Box className={'flex items-center mr-4'}>
                <Box className={'space-x-2'}>
                    {VIEWER_OPTION_BUTTONS.map((button, index) => (
                        <CustomButton
                            key={index}
                            onClick={button.onClick}
                            icon={button.icon}
                            menuItems={button.menuItems}
                            menuComponent={button.menuComponent}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ViewerTopBar;
