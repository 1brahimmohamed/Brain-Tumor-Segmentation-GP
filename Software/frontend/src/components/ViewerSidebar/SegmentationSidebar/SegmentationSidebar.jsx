import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
import "../../../helpers/getMetadata.js"
import SegmentationSidebarHeader from "./SegmentationSidebarHeader";
import SegmentationToolsTab from "./SegmentationToolsTab";
import SegmentationDataTab from "./SegmentationDataTab";
import {useSelector} from "react-redux";

const SegmentationSidebar = ({className}) => {
    const theme = useTheme();

    const {
        isSegmentationTabOpen
    } = useSelector((store)=> store.viewerpage)


    return (
        <Box
            className={`${className}`}
            sx={{
                backgroundColor: theme.palette.primary.dark,
            }}
        >
            <SegmentationSidebarHeader/>
            {
                isSegmentationTabOpen&&
                <>
                    <SegmentationToolsTab />
                    <SegmentationDataTab />
                </>
            }

        </Box>
    )
};

export default SegmentationSidebar;
