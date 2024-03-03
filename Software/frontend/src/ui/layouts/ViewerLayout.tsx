import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ViewerTopBar from '@features/viewer/ViewerTopBar/ViewerTopBar.tsx';
import ViewerSidebar from '@features/viewer/StudySidebar/ViewerSidebar.tsx';

const ViewerLayout = () => {
    return (
        <div className={'w-full'}>
            <Helmet>
                <title>MMM.AI Viewer</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segmentation and MRI Motion Artifacts Correction."
                />
            </Helmet>

            <ViewerTopBar />
            <div className={'flex'}>
                <div className={'h-[100vh] w-52'}>
                    <ViewerSidebar className={'h-full'} />
                </div>
                <div className={'h-[100vh] w-10/12'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ViewerLayout;
