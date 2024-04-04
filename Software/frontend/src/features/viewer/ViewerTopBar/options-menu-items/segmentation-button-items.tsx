import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import { IoMdAddCircle } from 'react-icons/io';
import {
    CornerstoneToolManager,
} from '@/features/viewer/CornerstoneToolManager/';

import { Download as DownloadIcon } from '@mui/icons-material';

const SegmentationButtonItems: TViewerButtonItems[] = [
    {
        label: 'Add Segmentation',
        onClick: () => {
            CornerstoneToolManager.addSegmentation();
        },
        icon: <IoMdAddCircle />
    },
    {
        label: 'Add Segment',
        onClick: () => {
            CornerstoneToolManager.addSegmentToSegmentation();
        },
        icon: <IoMdAddCircle />,
        divider: true
    },
    {
        label: 'Download Segmentation Mask',
        onClick: () => {
            CornerstoneToolManager.downloadSegmentation();
        },
        icon: <DownloadIcon />
    }
];

export default SegmentationButtonItems;
