import { Outlet, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet-async";
import { Box, Button, Typography } from '@mui/material';
import { Logo } from '@ui/library';
import HomeTopBar from '@features/top-bars/HomeTopBar/HomeTopBar.tsx';


const HomeLayout = () => {

    const navigate = useNavigate();

    // get the current location
    const location = window.location.pathname;

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

            <Box className={"flex flex-col p-5"}>

                <Box className={"h-1/2"}>
                    <HomeTopBar />
                </Box>

                <Box className={"flex items-center space-x-2 h-1/12 mt-4"}>
                    <Typography variant={"h4"}>Studies List</Typography>

                    <Button variant={isDisplayingDicomStudies? "contained": "outlined"} color={"secondary"} onClick={() => navigate("/")}>
                        DICOM
                    </Button>
                    <Button variant={isDisplayingDicomStudies? "outlined" :"contained"} color={"secondary"} onClick={() => navigate("/nifti")}>
                        NIFTI
                    </Button>
                </Box>

                <Box className={""}>
                    <Outlet />
                </Box>

                <Box className={"h-3/12 mt-5"}>
                    <Box className={"flex h-12 justify-center"}>
                        <Logo/>
                    </Box>
                </Box>

            </Box>
        </div>
    )
};

export default HomeLayout;
