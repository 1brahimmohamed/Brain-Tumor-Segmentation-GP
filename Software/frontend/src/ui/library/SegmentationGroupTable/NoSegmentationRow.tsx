import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function NoSegmentationRow({ onSegmentationAdd }: { onSegmentationAdd: () => void }) {
    return (
        <div className="group" onClick={onSegmentationAdd}>
            <div className="text-base group-hover:bg-AAPrimaryDark flex items-center group-hover:cursor-pointer">
                <div className="grid h-[28px] w-[28px] place-items-center">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <span className="text-sm">{'Add segmentation'}</span>
            </div>
        </div>
    );
}

export default NoSegmentationRow;
