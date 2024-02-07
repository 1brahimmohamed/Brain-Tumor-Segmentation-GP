import { createBrowserRouter } from 'react-router-dom';

// layouts
import LoginLayout from '@/ui/layouts/LoginLayout';

// pages
import Login from '@pages/Login';
import NotFound404 from '@pages/404';
import HomeLayout from '@ui/layouts/HomeLayout.tsx';
import DicomStudies from '@features/studies-table/dicom-studies-table/DicomStudies.tsx';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <DicomStudies />,
            },
            {
                path: 'nifti',
                element: <h1>NIFTI</h1>,
            }
        ],
    },
    {
        path: '/login',
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound404 />,
    },
]);

export default AppRouter;
