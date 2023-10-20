import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";

// components
import HomeTopbar from "../components/Topbars/HomeTopbar";


const HomeLayout = () => {
    return (
        <div>
            <Helmet>
                <title>MMM.AI Home</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segmentation and MRI sequence synthesis"
                />
            </Helmet>
            <div className={"p-4"}>
                <HomeTopbar />
                <Outlet />
            </div>
        </div>
    )
};

export default HomeLayout;
