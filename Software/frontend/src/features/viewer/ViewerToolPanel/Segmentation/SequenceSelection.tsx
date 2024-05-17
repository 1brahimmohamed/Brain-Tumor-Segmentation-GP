import { HelpersUtil } from '@/utilities';
import { Select } from '@ui/library';

type TSequenceSelectionProps = {
    sequences: string[];
    onSequenceChange: (sequence: string, newSelect: any, _action: any) => void;
    selectedSequences: { [key: string]: { value: string; label: string } };
    seriesOptions: { value: string; label: string }[];
};

const SequenceSelection = ({
    sequences,
    onSequenceChange,
    selectedSequences,
    seriesOptions
}: TSequenceSelectionProps) => {
    return (
        <div className={'flex flex-col gap-y-4'}>
            {sequences.map((sequence: string) => {
                const sequenceName = HelpersUtil.toProperCase(sequence);
                return (
                    <div key={sequence}>
                        <div className="w-full text-md">{sequenceName} Sequence</div>
                        <Select
                            id={`${sequence}-select`}
                            value={selectedSequences[sequence]}
                            placeholder={`${sequenceName} Series`}
                            onChange={(newSelect: any, _action: any) =>
                                onSequenceChange(sequence, newSelect, _action)
                            }
                            options={seriesOptions}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SequenceSelection;
