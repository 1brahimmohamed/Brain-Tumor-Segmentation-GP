import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import { IoMdAddCircle } from 'react-icons/io';
import { CornerstoneToolManager } from '@/features/viewer/CornerstoneToolManager/';

import { Download as DownloadIcon, Upload as UploadIcon } from '@mui/icons-material';

const SegmentationButtonItems: TViewerButtonItems[] = [
    {
        label: 'Download Segmentation Mask',
        onClick: () => {
            CornerstoneToolManager.downloadSegmentation();
        },
        icon: <DownloadIcon />
    },
    {
        label: 'Upload Segmentation Mask',
        onClick: () => {
            CornerstoneToolManager.uploadSegmentation();
        },
        icon: <UploadIcon />
    }
];

export default SegmentationButtonItems;
