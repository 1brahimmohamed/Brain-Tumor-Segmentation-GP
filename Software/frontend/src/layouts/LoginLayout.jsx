import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const LoginLayout = () => {
    return (
        <div>
            <Helmet>
                <title>MMM.AI Login</title>
                <meta
                    name="description"
                    content="Multimodal Medical Viewer for brain tumor segementaion and MRI squence sythnises" />
            </Helmet>
            <Outlet />
        </div>
    )
};

export default LoginLayout;
