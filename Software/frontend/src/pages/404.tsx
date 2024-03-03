import { useNavigate } from 'react-router-dom';

// MUI
import { Container, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Custom
import Illustration from '@ui/Illustration404';

const NotFound404 = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box>
            <Container className={'py-36'}>
                <div className={'flex relative justify-center'}>
                    {/* 404 Illustration */}
                    <Illustration
                        className={'absolute inset-0 opacity-75'}
                        style={{ color: theme.palette.primary.lighter }}
                    />

                    {/* 404 Text */}
                    <div className={'flex flex-col pt-56 relative z-10 justify-center'}>
                        <h1 className={'text-center mb-10 font-bold text-5xl'}>Nothing to see here</h1>

                        <Typography variant={'h5'} className={'mt-20 mb-28 text-center'}>
                            The Page you are trying to open does not exist. You may have mistyped the address,
                            <br /> or the page has been moved to another URL. If you think this is an error
                            contact support.
                        </Typography>

                        <Box className={'mt-6 flex justify-center'}>
                            <Button
                                variant={'contained'}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: theme.palette.secondary.main,
                                    boxShadow: 'none',

                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.dark,
                                        boxShadow: 'none'
                                    }
                                }}
                                onClick={() => navigate('/')}
                            >
                                Take me back to home page
                            </Button>
                        </Box>
                    </div>
                </div>
            </Container>
        </Box>
    );
};

export default NotFound404;
