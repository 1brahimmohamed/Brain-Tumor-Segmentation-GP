import { TViewerButtonItems } from '../../components/ViewerButtonMenu';
import { IoMdAddCircle } from 'react-icons/io';
import CornerstoneToolManager, {
    SEGMENTATION_TOOLS
} from '@/features/viewer/CornerstoneToolManager/CornerstoneToolManager';

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
        icon: <IoMdAddCircle />
    }
];

export default SegmentationButtonItems;
