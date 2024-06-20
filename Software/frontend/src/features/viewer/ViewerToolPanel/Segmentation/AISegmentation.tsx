import { PanelSection, ServerSelection } from '@ui/library';
import settings from '@assets/settings.json';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import store from '@/redux/store.ts';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { postNewSegmentationRequestThunk } from './segmentation-actions.ts';
import SequenceSelection from '@features/viewer/ViewerToolPanel/Segmentation/SequenceSelection.tsx';

const AISegmentation = () => {
    // dynamically initialize state based on needed sequences
    const initializeState = (sequences: string[]) => {
        const initialState: { [key: string]: { value: string; label: string } } = {};
        sequences.forEach((seq) => {
            initialState[seq] = { value: '', label: '' };
        });
        return initialState;
    };

    const [selectedModel, setSelectedModel] = useState(settings.segmentationModels[0]);
    const [selectedSequences, setSelectedSequences] = useState(
        initializeState(selectedModel.neededSequences)
    );
    const [seriesOptions, setSeriesOptions] = useState<{ value: string; label: string }[]>([]);

    const { studyData } = useSelector((store: IStore) => store.viewer);

    // Update state when neededSequence changes
    useEffect(() => {
        setSelectedSequences(initializeState(selectedModel.neededSequences));
    }, [selectedModel]);

    // Update series options when studyData is fetched
    useEffect(() => {
        if (studyData) {
            const seriesOptions = studyData.map((series) => ({
                value: series.seriesInstanceUid,
                label: series.seriesDescription
            }));
            setSeriesOptions(seriesOptions);
        }
    }, [studyData]);

    const handleSequenceChange = (sequence: string, newSelect: any, _action: any) => {
        setSelectedSequences({
            ...selectedSequences,
            [sequence]: newSelect
        });
    };

    const handleModelChange = (newSelect: any) => {
        setSelectedModel(newSelect);
    };

    const handleButtonClick = () => {
        // check if all sequences are not empty
        if (Object.values(selectedSequences).some((sequence) => sequence.value === '')) {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: 'All sequences are required'
                })
            );
            return;
        }

        const reqBody: any = {};
        for (const key in selectedSequences) {
            reqBody[key] = selectedSequences[key].value;
        }

        if (studyData) {
            store.dispatch(
                postNewSegmentationRequestThunk(selectedModel.url, studyData[0].studyInstanceUid, reqBody)
            );
        }
    };

    return (
        <div>
            <PanelSection title={'AI Based Segmentation'}>
                <ServerSelection
                    defaultModel={selectedModel.name}
                    onModelChange={handleModelChange}
                    options={settings.segmentationModels.map((segmentationModel) => ({
                        value: segmentationModel.name,
                        label: segmentationModel.name,
                        neededSequences: segmentationModel.neededSequences,
                        url: segmentationModel.url
                    }))}
                    onButtonClick={handleButtonClick}
                >
                    <hr className={'py-3 border-black'} />

                    <SequenceSelection
                        sequences={selectedModel.neededSequences}
                        selectedSequences={selectedSequences}
                        onSequenceChange={handleSequenceChange}
                        seriesOptions={seriesOptions}
                    />
                </ServerSelection>
            </PanelSection>
        </div>
    );
};

export default AISegmentation;
