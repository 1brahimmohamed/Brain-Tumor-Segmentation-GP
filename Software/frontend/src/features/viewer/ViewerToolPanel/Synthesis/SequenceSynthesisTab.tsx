import settings from '@assets/settings.json';
import { Select, ServerSelection } from '@ui/library';
import { useEffect, useState } from 'react';
import SequenceSelection from '../Segmentation/SequenceSelection.tsx';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import store from '@/redux/store.ts';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { postNewSynthesisRequestThunk } from './sequence-synthesis-actions.ts';

const options = [
    { value: 't1', label: 'T1' },
    { value: 't2', label: 'T2' },
    { value: 'flair', label: 'FLAIR' },
    { value: 't1c', label: 'T1c' }
];
export type TNeededSeriesData = {
    value: string;
    label: string;
};

const SequenceSynthesisTab = () => {
    const [sequenceSynthesisSequencesState, setSequenceSynthesisSequencesState] = useState<{
        [key: string]: { value: string; label: string };
    }>({
        missing: { value: '', label: '' },
        t1: { value: '', label: '' },
        t1c: { value: '', label: '' },
        t2: { value: '', label: '' },
        flair: { value: '', label: '' }
    });

    const [selectedModel, setSelectedModel] = useState(settings.synthesisModels[0]);
    const [seriesOptions, setSeriesOptions] = useState<TNeededSeriesData[]>([]);
    const { studyData } = useSelector((store: IStore) => store.viewer);

    useEffect(() => {
        if (studyData) {
            const series = studyData.map((series) => ({
                value: series.seriesInstanceUid,
                label: series.seriesDescription
            }));
            setSeriesOptions(series);
        }
    }, [studyData]);

    const handleModelChange = (newModel: any) => {
        setSelectedModel(newModel);
    };

    const handleSequenceChange = (sequence: string, newSelect: any, _action: any) => {
        setSequenceSynthesisSequencesState((prevState) => ({
            ...prevState,
            [sequence]: newSelect
        }));
    };

    const handleSynthesisButtonClick = () => {
        // check if all sequences are not empty expect missing sequence
        if (sequenceSynthesisSequencesState.missing.value === '') {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: 'Please assign missing sequence'
                })
            );
            return;
        }

        // remove the missing sequence from the list of sequences
        const sequencesKeys = Object.keys(sequenceSynthesisSequencesState).filter(
            (seq) => seq !== sequenceSynthesisSequencesState.missing.value
        );
        const reqBody: any = {};
        for (const sequenceKey of sequencesKeys) {
            if (sequenceSynthesisSequencesState[sequenceKey].value === '') {
                store.dispatch(
                    uiSliceActions.setNotification({
                        type: 'error',
                        content: 'Please assign all sequences'
                    })
                );
                return;
            }
            reqBody[sequenceKey] = sequenceSynthesisSequencesState[sequenceKey].value;
        }

        if (studyData) {
            store.dispatch(
                postNewSynthesisRequestThunk(selectedModel.url, studyData[0].studyInstanceUid, reqBody)
            );
        }
    };

    return (
        <div>
            <div className="bg-AAPrimaryLight flex justify-between px-2 py-1">
                <span className="text-base font-bold text-white">Brain MRI Sequence Synthesis</span>
            </div>

            <div>
                <ServerSelection
                    defaultModel={selectedModel.name}
                    onModelChange={handleModelChange}
                    options={settings.synthesisModels.map((motionModel) => ({
                        value: motionModel.name,
                        label: motionModel.name,
                        url: motionModel.url
                    }))}
                    onButtonClick={handleSynthesisButtonClick}
                >
                    <div className={'mb-5'}>
                        <div className="w-full text-md">Missing Sequence</div>
                        <Select
                            id={`missing-select`}
                            value={sequenceSynthesisSequencesState.missing}
                            placeholder={`Missing Sequence`}
                            onChange={(newSelect: any, _action: any) =>
                                handleSequenceChange('missing', newSelect, _action)
                            }
                            options={options.filter((option) => option.value !== 't1c')}
                        />
                    </div>

                    {sequenceSynthesisSequencesState.missing.value !== '' && (
                        <SequenceSelection
                            sequences={options
                                .filter(
                                    (option) => option.value !== sequenceSynthesisSequencesState.missing.value
                                )
                                .map((option) => option.value)}
                            selectedSequences={sequenceSynthesisSequencesState}
                            onSequenceChange={handleSequenceChange}
                            seriesOptions={seriesOptions}
                        />
                    )}
                </ServerSelection>
            </div>
        </div>
    );
};

export default SequenceSynthesisTab;
