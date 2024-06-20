import { annotation as CsAnnotation } from '@cornerstonejs/tools';
import MeasurementItem from './MeasurementItem';
import { Annotation } from '@cornerstonejs/tools/dist/types/types';

type MeasurementTableProps = {
    data: {
        uid: string;
        label: string;
        displayText: string;
        toolName: string;
        isActive: boolean;
    }[];
    title: string;
    onClick: (measurementData: any) => void;
    onEdit: (measurementData: any) => void;
};

const MeasurementTable = ({ data = [], title, onClick, onEdit }: MeasurementTableProps) => {
    const amount = data.length;

    const annotationManager = CsAnnotation.state.getAnnotationManager();
    const { locking } = CsAnnotation;

    return (
        <div>
            <div className="bg-AAPrimaryLight flex justify-between px-2 py-1">
                <span className="text-base font-bold text-white">{title}</span>
                <span className="text-base font-bold text-white">{amount}</span>
            </div>
            <div className="max-h-112 overflow-hidden">
                {data.length !== 0 &&
                    data.map((measurementItem, index) => {
                        const isLocked = locking.isAnnotationLocked(
                            annotationManager.getAnnotation(measurementItem.uid) as Annotation
                        );
                        return (
                            <MeasurementItem
                                key={measurementItem.uid}
                                uid={measurementItem.uid}
                                index={index + 1}
                                label={measurementItem.label}
                                isActive={measurementItem.isActive}
                                isLocked={isLocked}
                                displayText={measurementItem.displayText}
                                toolName={measurementItem.toolName}
                                onClick={onClick}
                                onEdit={onEdit}
                            />
                        );
                    })}
                {data.length === 0 && (
                    <div className="group flex cursor-default border border-transparent bg-AASecondShade transition duration-300">
                        <div className="bg-AAPrimary bg-opacity-30 text-primary-light group-hover:bg-opacity-60 w-6 py-1 text-center text-base transition duration-300"></div>
                        <div className="flex flex-1 items-center justify-between px-2 py-4">
                            <span className="text-white mb-1 flex flex-1 items-center text-base">
                                You have no measurements added
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default MeasurementTable;
