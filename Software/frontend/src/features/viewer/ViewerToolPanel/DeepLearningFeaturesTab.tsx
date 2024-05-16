import settings from "@assets/settings.json";
import {PanelSection, Select, ServerSelection} from "@ui/library";
import {useState} from "react";
import {SequenceSelection} from "@ui/library/AISegmentation/AISegmentation.tsx";

const options = [
    {value: "t1", label: "T1"},
    {value: "t2", label: "T2"},
    {value: "flair", label: "FLAIR"},
    {value: "t1c", label: "T1c"},
]

const DeepLearningFeaturesTab = () => {

    const [sequenceSynthesisSequencesState, setSequenceSynthesisSequencesState] = useState({
        missing: "",
        t1: "",
        t1c: "",
        t2: "",
        flair: "",
    });

    const handleModelChange = (newModel: string) => {
        console.log(newModel);
    }

    const handleButtonClick = () => {
        console.log("Run button clicked")
    }

    const handleSequenceChange = (sequence: string, newSelect: any, _action: any) => {
        setSequenceSynthesisSequencesState((prevState) => ({
            ...prevState,
            [sequence]: newSelect.value
        }));
    }

    const handleSynthesisButtonClick = () => {
        // check if all sequences are not empty expect missing sequence
        if (sequenceSynthesisSequencesState.missing === "") {
            console.log("Missing sequence is required");
            return;
        }

        // t1c is required
        if (sequenceSynthesisSequencesState.t1c === "") {
            console.log("T1c sequence is required");
            return;
        }

        // check if all sequences are not empty
        if (Object.values(sequenceSynthesisSequencesState).some(sequence => sequence === "")) {
            console.log("All sequences are required");
            return;
        }
    }

    // get the values of options array
    const options = [
        {value: "t1", label: "T1"},
        {value: "t2", label: "T2"},
        {value: "flair", label: "FLAIR"},
        {value: "t1c", label: "T1c"},
    ]


    return (
        <div>
            <div className="bg-AAPrimaryLight flex justify-between px-2 py-1">
                <span className="text-base font-bold text-white">AI Features</span>
            </div>

            <div>
                <PanelSection title="Brain Motion Artifacts Correction">

                    <ServerSelection
                        defaultModel={settings.motionArtifactsModels[0].name}
                        onModelChange={handleModelChange}
                        options={settings.motionArtifactsModels.map((motionModel) => ({
                            value: motionModel.name,
                            label: motionModel.name,
                            url: motionModel.url
                        }))}
                        onButtonClick={handleButtonClick}
                    />

                </PanelSection>
            </div>

            <div>
                <PanelSection title="Brain MRI Sequence Synthesis">
                    <ServerSelection
                        defaultModel={settings.synthesisModels[0].name}
                        onModelChange={handleModelChange}
                        options={settings.synthesisModels.map((motionModel) => ({
                            value: motionModel.name,
                            label: motionModel.name,
                            url: motionModel.url
                        }))}
                        onButtonClick={handleSynthesisButtonClick}
                    >

                        <div className={"mb-5"}>
                            <div className="w-full text-md">Missing Sequence</div>
                            <Select
                                id={`missing-select`}
                                value={sequenceSynthesisSequencesState.missing}
                                placeholder={`missing Sequence`}
                                onChange={(newSelect: any, _action: any) => handleSequenceChange("missing", newSelect, _action)}
                                options={options.filter(option => option.value !== "t1c")}
                            />
                        </div>

                        {
                            sequenceSynthesisSequencesState.missing !== "" &&
                            <SequenceSelection
                                sequences={options.filter(option => option.value !== sequenceSynthesisSequencesState.missing).map(option => option.value)}
                                selectedSequences={sequenceSynthesisSequencesState}
                                onSequenceChange={handleSequenceChange}
                            />
                        }


                    </ServerSelection>
                </PanelSection>
            </div>
        </div>
    )
};

export default DeepLearningFeaturesTab;
