import {Outlet} from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import {Helmet} from "react-helmet-async";


const ViewerLayout = () => {
    return(
        <div className={'w-full'} >
            <Helmet>
                <title>MMM.AI Viewer</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segementaion and MRI squence sythnises" />
            </Helmet>
                <Topbar/>
                <Outlet />
        </div>
    )
};

export default ViewerLayout;
