import { createBrowserRouter } from 'react-router-dom';

// layouts
import { HomeLayout, ViewerLayout, LoginLayout } from '@ui/layouts';

// pages
import { Login, NotFound404 } from '@/pages';

import DicomStudies from '@features/studies-table/dicom-studies-table/DicomStudies.tsx';
import MainViewer from '@features/viewer/MainViewer';
import Settings from '@ui/layouts/SettingsLayout.tsx';
import General from '@features/settings/pages/General.tsx';
import SegmentationModels from '@features/settings/pages/SegmentationModels.tsx';
import MotionArtifactsModels from '@features/settings/pages/MotionArtifactsModels.tsx';
import SynthesisModels from '@features/settings/pages/SynthesisModels.tsx';
import NiftiStudies from './features/studies-table/nifti-studies-table/NiftiStudies';
import Report from './features/report/Report';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <DicomStudies />
            },
            {
                path: 'nifti',
                element: <NiftiStudies />
            },
            {
                path: 'report/:reportId/study/:studyId',
                element: <Report />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    },
    {
        path: 'viewer',
        element: <ViewerLayout />,
        children: [
            {
                index: true,
                element: <MainViewer />
            }
        ]
    },
    {
        path: 'settings',
        element: <Settings />,
        children: [
            {
                index: true,
                element: <General />
            },
            {
                path: 'segmentation-models',
                element: <SegmentationModels />
            },
            {
                path: 'motion-artifacts-models',
                element: <MotionArtifactsModels />
            },
            {
                path: 'synthesis-models',
                element: <SynthesisModels />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound404 />
    }
]);

export default AppRouter;
