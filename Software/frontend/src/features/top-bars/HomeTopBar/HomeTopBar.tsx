import { Box, Button, Typography } from '@mui/material';
import CustomButton from '@features/top-bars/components/CustomButton.tsx';
import { OPTIONS } from '@features/top-bars/HomeTopBar/home-buttons.tsx';
import '@styles/DateRange.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeTopBar = () => {
    const navigate = useNavigate();

    // get the current location
    const { pathname: location } = useLocation();

    // check if the current location is the dicom studies
    const isDisplayingDicomStudies = location === '/';

    return (
        <Box
            className={
                'flex flex-col-reverse gap-4 md:flex-row justify-between md:items-center w-full h-full'
            }
        >
            {/* Left Side */}
            <Box className={'flex items-center space-x-2 h-1/12'}>
                <Typography variant={'h4'}>Studies List</Typography>

                <Button
                    variant={isDisplayingDicomStudies ? 'contained' : 'outlined'}
                    color={'secondary'}
                    onClick={() => navigate('/')}
                >
                    DICOM
                </Button>
                <Button
                    variant={isDisplayingDicomStudies ? 'outlined' : 'contained'}
                    color={'secondary'}
                    onClick={() => navigate('/nifti')}
                >
                    NIFTI
                </Button>
            </Box>

            {/* Right Side */}
            <Box className={'flex flex-wrap gap-1'}>
                {OPTIONS.map((option, index) => (
                    <CustomButton
                        key={index}
                        onClick={option.onClick}
                        icon={option.icon}
                        menuItems={option?.menuItems}
                        menuComponent={option?.menuComponent}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HomeTopBar;
