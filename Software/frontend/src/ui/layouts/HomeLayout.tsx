import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { Logo } from '@ui/library';
import HomeTopBar from '@features/top-bars/HomeTopBar/HomeTopBar.tsx';
import FiltersBar from '@/features/top-bars/HomeTopBar/FiltersBar';

const HomeLayout = () => {
    // get the current location
    const { pathname: location } = useLocation();

    // check if the current location is the dicom studies
    const isDisplayingDicomStudies = location === '/';

    return (
        <div>
            <Helmet>
                <title>MMM.AI Home</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segmentation and MRI Motion Artifacts Correction."
                />
            </Helmet>

            <Box className={'flex flex-col p-5'}>
                <Box className={'h-1/2'}>
                    <HomeTopBar />
                </Box>

                {isDisplayingDicomStudies && (
                    <Box className={'h-36 md:h-12 mt-8'}>
                        <FiltersBar />
                    </Box>
                )}

                <Box className={''}>
                    <Outlet />
                </Box>

                <Box className={'h-3/12 mt-5'}>
                    <Box className={'flex h-12 justify-center'}>
                        <Logo />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default HomeLayout;
