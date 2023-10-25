import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";

// components
import ViewerTopbar from "../components/Topbars/ViewerTopBar.jsx";


const ViewerLayout = () => {
    return (
        <div className={'w-full'}>
            <Helmet>
                <title>MMM.AI Viewer</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segmentation and MRI sequence synthesis"
                />
            </Helmet>

            {/* Topbar */}
            <ViewerTopbar/>
            <Outlet/>
        </div>
    )
};

export default ViewerLayout;
