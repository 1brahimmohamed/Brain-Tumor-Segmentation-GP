import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Box } from '@mui/material';
import HomeTopBar from '@features/top-bars/HomeTopBar/HomeTopBar.tsx';
import FiltersBar from '@/features/top-bars/HomeTopBar/FiltersBar';
import UploadDicomModal from '@/features/studies-table/dicom-studies-table/UploadDicomModal';
import { useState } from 'react';
import ReportHeader from '@/features/report/components/ReportHeader';
import StudiesTabs from '@/features/studies-table/components/StudiesTabs';

const HomeLayout = () => {
    // get the current location
    const { pathname: location } = useLocation();

    // check if the current location is the dicom studies
    const isDisplayingDicomStudies = location === '/';

    const [isAddingDicom, setIsAddingDicom] = useState(false);

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

                {location.startsWith('/report') ? <ReportHeader /> : <StudiesTabs />}

                {isDisplayingDicomStudies && (
                    <Box className={'flex flex-col gap-2 md:flex-row md:items-center justify-between mt-4'}>
                        <Box className={'flex'}>
                            <Button
                                className={'md:h-12'}
                                variant={'contained'}
                                color={'secondary'}
                                onClick={() => setIsAddingDicom(true)}
                            >
                                New Dicom
                            </Button>
                        </Box>

                        <Box className={'h-36 md:h-12'}>
                            <FiltersBar />
                        </Box>
                    </Box>
                )}

                <Box className={''}>
                    <Outlet />
                </Box>
            </Box>

            {isAddingDicom && (
                <UploadDicomModal isOpen={isAddingDicom} onClose={() => setIsAddingDicom(false)} />
            )}
        </div>
    );
};

export default HomeLayout;
