import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ViewerTopBar from '@features/viewer/ViewerTopBar/ViewerTopBar.tsx';
import ViewerSidebar from '@features/viewer/StudySidebar/ViewerSidebar.tsx';
import ViewerToolPanel from '@features/viewer/ViewerToolPanel/ViewerToolPanel.tsx';

const ViewerLayout = () => {
    // window.addEventListener(
    //     'contextmenu',
    //     function (event) {
    //         event.preventDefault(); // Prevent the default context menu from appearing
    //     },
    //     false
    // );

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
                <div className={'h-[93vh] w-2/12 max-w-52'}>
                    <ViewerSidebar className={'h-full'} />
                </div>
                <div className={'h-auto flex-grow w-11/12'} onContextMenu={(e) => e.preventDefault()}>
                    <Outlet />
                </div>
                <div onContextMenu={(e) => e.preventDefault()}>
                    <ViewerToolPanel />
                </div>
            </div>
        </div>
    );
};

export default ViewerLayout;
