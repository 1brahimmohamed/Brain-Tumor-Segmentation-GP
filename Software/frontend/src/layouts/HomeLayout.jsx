import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";


const HomeLayout = () => {
    return (
        <div>
            <Helmet>
                <title>MMM.AI Home</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segementaion and MRI squence sythnises" />
            </Helmet>
            HOME
            <Outlet />
        </div>
    )
};

export default HomeLayout;
