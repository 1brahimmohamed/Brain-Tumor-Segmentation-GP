import { Select, ServerSelection } from '@ui/library';
import settings from '@assets/settings.json';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '@/models';
import store from '@/redux/store.ts';
import { uiSliceActions } from '@ui/ui-slice.ts';
import { postNewMotionCorrectionRequestThunk } from './motion-artifacts-correction-actions.ts';

const MotionArtifactsCorrectionTab = () => {
    const [selectedModel, setSelectedModel] = useState(settings.motionArtifactsModels[0]);
    const [selectedSeries, setSelectedSeries] = useState<{ value: string; label: string }>();
    const [seriesOptions, setSeriesOptions] = useState<{ value: string; label: string }[]>([]);
    const { studyData } = useSelector((store: IStore) => store.viewer);

    // set the series options when the study data is loaded
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

    const handleSeriesChange = (newSelect: any, _action: any) => {
        setSelectedSeries(newSelect);
    };

    // submit the motion correction request
    const handleButtonClick = () => {
        // check if the selected series is not empty
        if (selectedSeries?.value === '') {
            store.dispatch(
                uiSliceActions.setNotification({
                    type: 'error',
                    content: 'Please select a series to be corrected'
                })
            );
            return;
        }

        if (studyData && selectedSeries) {
            store.dispatch(
                postNewMotionCorrectionRequestThunk(
                    selectedModel.url,
                    studyData[0].studyInstanceUid,
                    selectedSeries.value
                )
            );
        }
    };

    return (
        <div>
            <div className="bg-AAPrimaryLight flex justify-between px-2 py-1">
                <span className="text-base font-bold text-white">Brain Motion Artifacts Correction</span>
            </div>

            <div>
                <ServerSelection
                    defaultModel={selectedModel.name}
                    onModelChange={handleModelChange}
                    options={settings.motionArtifactsModels.map((motionModel) => ({
                        value: motionModel.name,
                        label: motionModel.name,
                        url: motionModel.url
                    }))}
                    onButtonClick={handleButtonClick}
                >
                    <div className={'mb-5'}>
                        <div className="w-full text-md">Series to be corrected</div>
                        <Select
                            id={`missing-select`}
                            value={selectedSeries}
                            placeholder={'Series to be corrected'}
                            onChange={handleSeriesChange}
                            options={seriesOptions}
                        />
                    </div>
                </ServerSelection>
            </div>
        </div>
    );
};

export default MotionArtifactsCorrectionTab;
