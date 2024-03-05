import { createBrowserRouter } from 'react-router-dom';

// layouts
import { HomeLayout, ViewerLayout, LoginLayout } from '@ui/layouts';

// pages
import { Login, NotFound404 } from '@/pages';

import DicomStudies from '@features/studies-table/dicom-studies-table/DicomStudies.tsx';
import MainViewer from '@/features/viewer/MainViewer';

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
                element: <h1>NIFTI</h1>
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
        path: '*',
        element: <NotFound404 />
    }
]);

export default AppRouter;
