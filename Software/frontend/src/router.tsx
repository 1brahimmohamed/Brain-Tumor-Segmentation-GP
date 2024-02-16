import { createBrowserRouter } from 'react-router-dom';

// layouts
import Layouts from '@ui/layouts/index.tsx';

// pages
import Login from '@pages/Login';
import NotFound404 from '@pages/404';
import DicomStudies from '@features/studies-table/dicom-studies-table/DicomStudies.tsx';
import Testing from '@features/Testing.tsx';
import MainViewer from '@/features/viewer/components/MainViewer';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layouts.HomeLayout />,
        children: [
            {
                index: true,
                element: <DicomStudies />,
            },
            {
                path: 'nifti',
                element: <h1>NIFTI</h1>,
            },
        ],
    },
    {
        path: '/login',
        element: <Layouts.LoginLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: 'viewer',
        element: <Layouts.ViewerLayout />,
        children: [
            {
                index: true,
                element: <MainViewer />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound404 />,
    },
]);

export default AppRouter;
