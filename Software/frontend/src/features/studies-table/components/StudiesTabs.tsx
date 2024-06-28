import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const StudiesTabs = () => {
    // get the current location
    const { pathname: location } = useLocation();

    const navigate = useNavigate();

    // check if the current location is the dicom studies
    const isDisplayingDicomStudies = location === '/';

    return (
        <Box className={'flex items-center space-x-2 h-1/12 mt-6'}>
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
    );
};

export default StudiesTabs;
