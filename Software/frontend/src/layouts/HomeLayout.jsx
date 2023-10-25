import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";

// components
import HomeTopbar from "../components/Topbars/HomeTopbar";
import LinearProgressBarIndeterminate from "../components/LoadingBars/LinearProgressBarIndeterminate.jsx";
import LinearProgressBarDeterminate from "../components/LoadingBars/LinearProgressBarDeterminate.jsx";


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
            {/*<LinearIndeterminate />*/}
            <LinearProgressBarDeterminate />
            <div className={"p-4"}>
                <HomeTopbar />
                <Outlet />
            </div>
        </div>
    )
};

export default HomeLayout;
