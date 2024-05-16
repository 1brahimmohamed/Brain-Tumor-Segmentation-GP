import {PanelSection, Select, ServerSelection} from "@ui/library";
import settings from "@assets/settings.json";
import {useEffect, useState} from "react";
import {HelpersUtil} from "@/utilities";

const options = [
    {value: "t1", label: "T1"},
    {value: "t2", label: "T2"},
    {value: "flair", label: "FLAIR"},
    {value: "adc", label: "ADC"},
]


type TSequenceSelectionProps = {
    sequences: string[],
    onSequenceChange: (sequence: string, newSelect: any, _action: any) => void,
    selectedSequences: { [key: string]: string }
}

export const SequenceSelection = ({
                               sequences,
                               onSequenceChange,
                               selectedSequences
                           }: TSequenceSelectionProps
) => {

    return (
        <div className={"flex flex-col gap-y-4"}>
            {
                sequences.map((sequence: string) => {
                    const sequenceName = HelpersUtil.toProperCase(sequence);
                    return (
                        <div key={sequence}>
                            <div className="w-full text-md">{sequenceName} Sequence</div>
                            <Select
                                id={`${sequence}-select`}
                                value={selectedSequences[sequence]}
                                placeholder={`${sequenceName} Series`}
                                onChange={(newSelect: any, _action: any) => onSequenceChange(sequence, newSelect, _action)}
                                options={options}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}


const AISegmentation = () => {

    // dynamically initialize state based on needed sequences
    const initializeState = (sequences: string[]) => {
        const initialState: { [key: string]: string } = {};
        sequences.forEach(seq => {
            initialState[seq] = "";
        });
        return initialState;
    };

    const [selectedModel, setSelectedModel] = useState(settings.segmentationModels[0]);
    const [selectedSequences, setSelectedSequences] = useState(initializeState(selectedModel.neededSequences));


    // Update state when neededSequence changes
    useEffect(() => {
        setSelectedSequences(initializeState(selectedModel.neededSequences));
    }, [selectedModel]);

    const handleSequenceChange = (sequence: string, newSelect: any, _action: any) => {
        setSelectedSequences({
            ...selectedSequences,
            [sequence]: newSelect.value
        })
    }

    const handleModelChange = (newSelect: any) => {
        setSelectedModel(newSelect);
    }

    const handleButtonClick = () => {
        console.log("Run button clicked")
    }


    return (
        <div>
            <PanelSection title={"AI Based Segmentation"}>
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
                    <hr className={"py-3 border-black"}/>

                    <SequenceSelection
                        sequences={selectedModel.neededSequences}
                        selectedSequences={selectedSequences}
                        onSequenceChange={handleSequenceChange}
                    />

                </ServerSelection>
            </PanelSection>
        </div>
    )
}

export default AISegmentation
